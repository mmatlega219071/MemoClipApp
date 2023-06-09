<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"
        ><img
          src="../../public/img/icons/AppIcon.png"
          alt="AppIcon"
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
          <li class="nav-item" v-if="isLoggedIn">
            <router-link to="/users-ranking" class="nav-link"
              >Users ranking
            </router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link to="/welcome" class="nav-link">Welcome</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/app-settings" class="nav-link"
              >Credits</router-link
            >
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Log in</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/register">Sign up</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/welcome" @click="handleSignOut"
              >Sign out</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="video-container">
    <video ref="videoPlayer" muted playsinline></video>
  </div>
  <div class="footer">
    <button class="record-button" @click="startRecording"></button>
  </div>
  <div class="record-buttons-container" v-if="isRecorded">
    <button class="btn btn-danger" @click="deleteVideo">Delete video</button>
    <button class="btn btn-primary" @click="saveVideo">Save video</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import {
  onAuthStateChanged,
  saveVideoWithLocation,
  signOut,
} from "../lib/memoClipApiClient";
import router from "../router";

axios.defaults.baseURL =
  "https://us-central1-memoclip-e3cdb.cloudfunctions.net/api";
const isLoggedIn = ref(false);

onMounted(async () => {
  onAuthStateChanged((user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      router.push("/welcome");
    }
  });

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
});

const handleSignOut = async () => {
  try {
    await signOut();
    console.log("Logged out");
    router.push("/welcome");
  } catch (err) {
    console.error(err);
  }
};
</script>

<script>
const isRecorded = ref(false);
export default {
  name: "HomeScreen",
  data() {
    return {
      recording: false,
      recordedChunks: [],
      mediaRecorder: null,
      videoURL: null,
      error: null,
      isRecorded: false,
    };
  },
  methods: {
    async initVideoContainer() {
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
    },
    async startRecording() {
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

        this.recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener("dataavailable", (e) => {
          if (e.data.size > 0) {
            this.recordedChunks.push(e.data);
          }
        });

        mediaRecorder.addEventListener("stop", () => {
          const recordedBlob = new Blob(this.recordedChunks, {
            type: "video/mp4",
          });
          const recordedURL = window.URL.createObjectURL(recordedBlob);
          video.src = recordedURL;
          video.controls = true;
          video.play();
        });

        setTimeout(() => {
          mediaRecorder.stop();
          video.srcObject = null;
          isRecorded.value = true;
        }, 2000);

        mediaRecorder.start();
      } catch (error) {
        console.error(error);
      }
    },

    async saveVideo() {
      try {
        const result = await saveVideoWithLocation(
          this.recordedChunks,
          await this.getLocation()
        );
        console.log("Video saved", result);
        alert("video saved");
        location.reload();
      } catch (err) {
        console.error(err);
        alert("Video saving error");
      }
    },

    async deleteVideo() {
      isRecorded.value = false;
      this.initVideoContainer();
      alert("video deleted, try another one");
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
  max-height: 45px;
  max-width: 45px;
}
.video-container {
  width: 100%;
  height: calc(100vh - 216px);
  justify-content: center;
  align-items: center;
  background-color: #000;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.navbar {
  position: absolute;
  z-index: 1; /* navbar hover over screen content */
  width: 100%;
  display: flex;
}
.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 50px 0;
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

.record-buttons-container {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.record-buttons-container button {
  margin: 0 10px;
}
.record-buttons-container {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px;
}

.logo {
  width: 35px;
  height: 35px;
}
</style>
