const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cron = require("node-cron");
// const app = require('./app');
const express = require('express');
const router = express();
const cors = require("cors");

router.use(cors());

admin.initializeApp();

// Ustawienia harmonogramu powiadomień
const notificationTimes = ["0 8 * * *", "0 11 * * *"];

// Treść powiadomienia
const payload = {
  notification: {
    title: "Nagrywanie wideo",
    body: "Nie zapomnij nagrać swojego dzisiejszego wideo!",
  },
  android: {
    notification: {
      vibrate_timings: [200000000],
    },
  },
  apns: {
    payload: {
      aps: {
        alert: {
          title: "Nagrywanie wideo",
          body: "Nie zapomnij nagrać swojego dzisiejszego wideo!",
        },
        sound: "default",
        badge: 1,
      },
    },
  },
  webpush: {
    notification: {
      vibrate: [200],
    },
  },
};

// Funkcja wysyłająca powiadomienia do wszystkich użytkowników
async function sendNotificationsToAllUsers() {
  const usersSnap = await admin.firestore().collection("users").get();
  for (const userDoc of usersSnap.docs) {
    const user = userDoc.data();
    if (user.fcmToken) {
      await admin.messaging().sendToDevice(user.fcmToken, payload);
      console.log(user.fcmToken)
    }
  }
}

// Rejestracja harmonogramu powiadomień
notificationTimes.forEach((time) => {
  cron.schedule(time, () => {
    sendNotificationsToAllUsers();
  });
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
      const userRecord = await admin.auth().createUser({
          email,
          password,
          displayName: `${firstName} ${lastName}`
      });

      const userDoc = admin.firestore().doc(`users/${userRecord.uid}`);

      const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      await userDoc.set(userData);

      res.status(201).json({ message: 'Użytkownik został pomyślnie zarejestrowany', userID: userRecord.uid});
  } catch (error) {
      res.status(400).json({ message: 'Błąd podczas rejestracji użytkownika', error });
  }
});

// Endpoint do zapisu tokenu rejestracji dla konkretnego użytkownika
router.post('/token', async (req, res) => {
  try {
  const { registrationToken, userId } = req.body;
  const db = admin.firestore();

  const userDocRef = db.collection('users').doc(userId);

  await userDocRef.update({
      fcmToken: registrationToken
  });

  console.log('Pomyślnie dodano token: ' + registrationToken + ' dla użytkownika o ID: ' + userId)

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/test', (req, res) => {
  console.log('GET /test ok');
  res.send('Test SERVER')
})

exports.api = functions.https.onRequest(router);


// Eksport funkcji, jeśli chciałbyś ją wywołać ręcznie
// exports.sendNotifications = functions.https.onRequest(async (req, res) => {
//   await sendNotificationsToAllUsers();
//   res.send("Powiadomienia wysłane :)");
// });