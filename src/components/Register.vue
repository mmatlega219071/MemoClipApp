<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <!-- kontener przy zmniejszeniu lista -->
      <router-link class="navbar-brand" to="/">Home</router-link>
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
          <li class="nav-item">
            <router-link class="nav-link" to="/video-list"
              >Video List</router-link
            >
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Log in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/record-video"
              >Record Video</router-link
            >
          </li>
        </ul>
      </div>
      <div>Settings</div>
    </div>
  </nav>
  <h2>Zarejestruj się</h2>
  <p><input type="text" placeholder="Imię" v-model="firstName" /></p>
  <p><input type="text" placeholder="Nazwisko" v-model="lastName" /></p>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Hasło" v-model="password" /></p>
  <p><button @click="register">Zarejestruj</button></p>
  <p>
    <button @click="registerWithGoogle">
      Zarejestruj się za pomocą konta Google
    </button>
  </p>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import router from "@/router";
import axios from "axios";
import { ref } from "vue";
import { getMessaging, getToken } from "firebase/messaging";
import {
  createUserWithEmailAndPassword,
  createUserWithGoogleProvider,
  messaging,
  firebaseConfig
} from "../lib/memoClipApiClient";

axios.defaults.baseURL = 'https://us-central1-memoclip-e3cdb.cloudfunctions.net';

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
    try {
        console.log("rejestracja użytkownika");

        const response = await axios.post("/register", {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
        });
        handleRegistration(response.data.userID)
        console.log("Użytkownik dodany");
        console.log(response);

        router.push("/");
    } catch (error) {
        console.log(error);
    }
};

async function handleRegistration(userId) {
  console.log(userId);
  console.log('testowe działanie')
  // Pobranie tokena rejestracji
  const registrationToken = await getToken(messaging, {
    vapidKey: firebaseConfig.vapidKey,
  });

  // Wysłanie tokenu do serwera
  await axios.post('/token', { registrationToken, userId });
}

const isLoggedIn = false;

const registerWithGoogle = async () => {
  try {
    await createUserWithGoogleProvider();
    router.push("/");
    console.log("Użytkownik dodany");
  } catch (err) {
    console.error(err);
    alert("Błąd dodawania użytkownika");
  }
};
</script>

<script>
export default {
    name: "RegisterForm",
};
</script>

<style scoped></style>
