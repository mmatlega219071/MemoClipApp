const functions = require("firebase-functions");

const memoClipApi = require("./lib/memoClipApi");
const { sendNotificationsToAllUsers } = require("./lib/memoClipNotifications");

exports.api = functions.https.onRequest(memoClipApi);
exports.sendNotifications = functions.https.onRequest(async (req, res) => {
  await sendNotificationsToAllUsers();
  res.send("Powiadomienia wysłane :)");
});
