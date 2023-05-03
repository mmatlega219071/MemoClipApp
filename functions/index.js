const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cron = require("node-cron");
const app = require('./app');
admin.initializeApp();

exports.api = functions.https.onRequest(app);

// Ustawienia harmonogramu powiadomień
const notificationTimes = ["0 8 * * *", "0 11 * * *"];

// Treść powiadomienia
const payload = {
  notification: {
    title: "Nagrywanie wideo",
    body: "Nie zapomnij nagrać swojego dzisiejszego wideo!",
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

// Eksport funkcji, jeśli chciałbyś ją wywołać ręcznie
exports.sendNotifications = functions.https.onRequest(async (req, res) => {
  await sendNotificationsToAllUsers();
  res.send("Powiadomienia wysłane :)");
});