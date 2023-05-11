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
const notificationTimes = ["0 11 * * *"];

// Treść powiadomienia
const payload = {
  notification: {
    title: "Nagrywanie wideo",
    body: "Nie zapomnij nagrać swojego dzisiejszego wideo!",
  },
  data: {
    vibration: "200",
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

const { getFirestore, serverTimestamp, getStorage, ref, uploadBytes } = require('firebase/storage');

router.post('/save-video', async (req, res) => {
  try {
    const recordedChunks = req.body.recordedChunks;
    const location = req.body.location;
    const storage = getStorage();
    const db = getFirestore();

    const dateFormatted = new Date()
      .toISOString()
      .split(".")
      .at(0)
      .replace(/:/g, "");
    const { currentUser } = getAuth();
    const uniqueVideoName = currentUser.uid + "-" + dateFormatted + ".mp4";
    const videosRef = ref(storage, uniqueVideoName);
    const videoBlob = new Blob(recordedChunks, { type: "video/mp4" });
    await uploadBytes(videosRef, videoBlob);
    const videosCollectionRef = collection(db, "videos");
    const videoData = {
      name: uniqueVideoName,
      user: currentUser.uid,
      location,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const result = await addDoc(videosCollectionRef, videoData);
    res.send({ success: true, message: 'Video saved successfully.', videoData: videoData, result: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Error saving video.' });
  }
});

// Endpoint do usuwania wideo użytkownika
router.delete('/delete/:videoId', async (req, res) => {
  const { videoId } = req.params;
  try {
    await admin.firestore().collection('videos').doc(videoId).delete();
    res.status(200).json({ message: `Wideo o ID ${videoId} został usunięty.` });
  } catch (error) {
    res.status(500).json({ message: 'Błąd podczas usuwania wideo.', error });
  }
});

router.get('/test', (req, res) => {
  console.log('GET /test ok');
  res.send('Test SERVER')
})

exports.api = functions.https.onRequest(router);


// Eksport funkcji, jeśli chcielibyśmy ją wywołać ręcznie
exports.sendNotifications = functions.https.onRequest(async (req, res) => {
  await sendNotificationsToAllUsers();
  res.send("Powiadomienia wysłane :)");
});
