const admin = require("firebase-admin");
const cron = require("node-cron");
const serviceAccountCert = require("../secrets/memoclip-e3cdb-firebase-adminsdk-d5kj5-c5c6fb1c23.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCert),
  databaseURL: "https://memoclip-e3cdb.firebaseio.com",
});
// admin.initializeApp();

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
      console.log(user.fcmToken);
    }
  }
}

// Rejestracja harmonogramu powiadomień
notificationTimes.forEach((time) => {
  cron.schedule(time, () => {
    sendNotificationsToAllUsers();
  });
});

module.exports = { sendNotificationsToAllUsers };
