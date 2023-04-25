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
              >Settings</router-link
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
import router from "../router";
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { addVideo } from "../collections/videos";

const isLoggedIn = ref(false);

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
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
      addVideo(1);
      // Tutaj kod obsługujący nagrywanie filmiku
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
