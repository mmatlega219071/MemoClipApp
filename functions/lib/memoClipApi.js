const express = require("express");
const router = express();
const cors = require("cors");
const {
  createUserWithEmailAndPassword,
  createUserToken,
  saveVideoWithLocation,
  deleteVideo,
} = require("./firebaseClient");

router.use(cors());

// TODO: remove test endpoint
router.get("/test", (req, res) => {
  console.log("GET /test ok");
  res.send("Test SERVER");
});

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const response = await createUserWithEmailAndPassword(
      email,
      password,
      firstName,
      lastName
    );
    res.status(201).json({
      message: "Użytkownik został pomyślnie zarejestrowany",
      response,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Błąd podczas rejestracji użytkownika", error });
  }
});

router.post("/token", async (req, res) => {
  try {
    const { registrationToken, userId } = req.body;
    await createUserToken(userId, registrationToken);
    console.log(
      "Pomyślnie dodano token: " +
        registrationToken +
        " dla użytkownika o ID: " +
        userId
    );
    res.sendStatus(200).json({ userId, registrationToken });
  } catch (error) {
    console.error(error);
    res
      .sendStatus(500)
      .json({ message: "Błąd podczas rejestracji tokenu", error });
  }
});

router.post("/videos", async (req, res) => {
  try {
    const { recordedChunks, location } = req.body;
    const { videoData, result } = await saveVideoWithLocation(
      recordedChunks,
      location
    );
    res.sendStatus(200).json({
      success: true,
      message: "Video saved successfully.",
      videoData,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error saving video." });
  }
});

router.delete("/videos/:videoId", async (req, res) => {
  const { videoId } = req.params;
  try {
    await deleteVideo(videoId);
    res.status(200).json({ message: `Wideo o ID ${videoId} został usunięty.` });
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas usuwania wideo.", error });
  }
});

router.get("/videos", async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas listowania wideo.", error });
  }
});

// listUserVideos
// getAllVideos

// TODO:
// signInWithEmailAndPassword
// signOut

module.exports = router;
