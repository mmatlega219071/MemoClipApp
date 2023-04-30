<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
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
          <li class="nav-item">
            <router-link class="nav-link" to="/record-video"
              >Record Video</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/app-settings"
              >Settings</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-3">
    <h2 class="text-center">Zaloguj się</h2>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Hasło</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
            />
          </div>
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-primary" @click="register">
              Zaloguj
            </button>
            <router-link to="/register">
              <button type="button" class="btn btn-secondary">
                Nie masz konta? Zarejestruj się już teraz!
              </button>
            </router-link>
          </div>
          <p class="text-danger">{{ errMsg }}</p>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "../lib/memoClipApiClient";

const email = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();

const register = async () => {
  try {
    await signInWithEmailAndPassword(email.value, password.value);
    console.log("Zalogowano pomyślnie");
    router.push("/");
  } catch (error) {
    console.log(error.code);
    switch (error.code) {
      case "auth/invalid-email":
        errMsg.value = "Niepoprawny email";
        break;
      case "auth/user-not-found":
        errMsg.value = "Nie znaleziono użytkownika o podanym adresie email";
        break;
      default:
        errMsg.value = "Email lub hasło jest niepoprawne";
        break;
    }
  }
};
</script>
<style scoped>
/* brak stylów */
</style>
