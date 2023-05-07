const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require('../../secrets/memoclip-e3cdb-firebase-adminsdk-d5kj5-c5c6fb1c23.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://memoclip-e3cdb.firebaseio.com'
});

// API
// Endpoint do rejestracji użytkownika 
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

module.exports = router;

