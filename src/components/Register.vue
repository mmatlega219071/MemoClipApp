<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- kontener przy zmniejszeniu lista -->
      <router-link class="navbar-brand" to="/welcome">Back </router-link>
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
            <router-link class="nav-link" to="/video-list">Video List</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Log in</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="mb-3"></div>
  <h2>Sign on</h2>
    <p><input type="text" placeholder="Name" v-model="firstName" />
    </p>
    <p><input type="text" placeholder="Surname" v-model="lastName" />
    </p>
    <p><input type="text" placeholder="Email" v-model="email" />
    </p>
    <p><input type="password" placeholder="Password" v-model="password" />
    </p>
    <p><button type="button" class="btn btn-primary" @click="register">Sign on</button>
    </p>
    <p><button type="button" class="btn btn-secondary" @click="registerWithGoogle">Sign on using Google account</button>
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

axios.defaults.baseURL = 'https://us-central1-memoclip-e3cdb.cloudfunctions.net/api';

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
    try {
        console.log("User registrations");

        const response = await axios.post("/register", {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
        });
        handleRegistration(response.data.userID)
        console.log("User added");
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
  await axios.post('/api/token', { registrationToken, userId });
}

const isLoggedIn = false;

const registerWithGoogle = async () => {
  try {
    await createUserWithGoogleProvider();
    router.push("/");
    console.log("User added");
  } catch (err) {
    console.error(err);
    alert("User adding error");
  }
};
</script>

<script>
export default {
    name: "RegisterForm",
};
</script>

<style scoped>

</style>
