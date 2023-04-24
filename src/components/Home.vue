<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">MemoClip</router-link>
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
            <router-link to="/video-list" class="nav-link">Lista wideo</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/app-settings" class="nav-link">Ustawienia</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Zaloguj się</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/register">Zarejestruj się</router-link>
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
      <button class="record-button" @click="startRecording">
        
      </button>
    </div>
</template>

<script setup>
import router from '../router'
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const isLoggedIn = ref(false);

let auth;

onMounted (() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");    
  })
}

const startRecording = () => {
  alert("Rozpoczynam nagrywanie :)");
}
</script>

<script>
export default {
  name: 'HomeScreen'
}
</script>

<style scoped>
.welcome-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
}

.header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 40px;
  margin-right: 20px;
}

.menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.menu li {
  margin: 0 10px;
}

.menu a {
  text-decoration: none;
  color: #333;
}

.video-container {
  width: 100%;
  height: calc(100vh - 176px);
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: transparent;
  border: 3px solid #fff;
  color: #fff;
}

</style>
