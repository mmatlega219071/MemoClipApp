<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"
        ><img
          src="../../public/img/icons/MemoClip-128x128.png"
          alt="App Logo"
          class="logo"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="isLoggedIn">
            <router-link to="/video-list" class="nav-link"
              >Video list</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/app-settings" class="nav-link"
              >Settings App - test</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/welcome"
              >Welcome Site</router-link
            >
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Log in</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/register">Sign up</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link btn btn-link" @click="handleSignOut">Wyloguj</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="video-container">
    <video ref="videoPlayer" autoplay muted playsinline></video>
  </div>
  <div class="footer">
    <button class="record-button" @click="startRecording"></button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  onAuthStateChanged,
  saveVideoWithLocation,
  signOut,
} from "../lib/memoClipApiClient";
import router from "../router";

const isLoggedIn = ref(false);

onMounted(() => {
  onAuthStateChanged((user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = async () => {
  try {
    await signOut();
    console.log("Wylogowano");
    router.push("/");
  } catch (err) {
    console.error(err);
  }
};
</script>

<script>
export default {
  name: "HomeScreen",
  data() {
    return {
      recording: false,
      chunks: [],
      mediaRecorder: null,
      videoURL: null,
      error: null,
    };
  },
  methods: {
    async startRecording() {
      alert("Rozpoczynam nagrywanie :)");
      // Tutaj kod obsługujący nagrywanie filmiku

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        const video = document.querySelector("video");
        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          video.src = window.URL.createObjectURL(stream);
        }
        await video.play();

        const recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener("dataavailable", (e) => {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        });

        mediaRecorder.addEventListener("stop", () => {
          const recordedBlob = new Blob(recordedChunks, { type: "video/mp4" });
          const recordedURL = window.URL.createObjectURL(recordedBlob);
          video.src = recordedURL;
          video.controls = true;
          video.play();

          // Dodaj przyciski Zapisz i Odrzuć
          const saveButton = document.createElement("button");
          saveButton.textContent = "Zapisz";
          saveButton.addEventListener("click", async () => {
            try {
              const result = await saveVideoWithLocation(
                recordedChunks,
                await this.getLocation()
              );
              console.log("zapisano nagranie", result);
            } catch (err) {
              console.error(err);
              alert("Błąd przy zapisywaniu nagrania");
            }
          });

          const discardButton = document.createElement("button");
          discardButton.textContent = "Odrzuć";
          discardButton.addEventListener("click", function () {
            // Kod obsługujący odrzucanie nagrania
            console.log("Odrzucam nagranie...");
          });

          const buttonContainer = document.createElement("div");
          buttonContainer.appendChild(saveButton);
          buttonContainer.appendChild(discardButton);
          video.parentElement.appendChild(buttonContainer);
        });

        setTimeout(() => {
          mediaRecorder.stop();
          video.srcObject = null;
        }, 2000);

        mediaRecorder.start();
      } catch (error) {
        console.error(error);
      }
    },

    async getLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coordinates = [
              position.coords.latitude,
              position.coords.longitude,
            ];
            resolve(coordinates);
          },
          (error) => reject(error)
        );
      });
    },
  },
};
</script>

<style scoped>
.container-fluid img {
  max-height: 40px;
}
.video-container {
  width: 100%;
  height: calc(100vh - 216px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0 50px 0;
  background-color: #000;
}

.record-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: transparent;
  border: 5px solid #fff;
  color: #fff;
}
</style>
