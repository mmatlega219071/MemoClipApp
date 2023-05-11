<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/welcome"><img
          src="../../public/img/icons/return.png"
          alt="ReturnButton"
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
          <li class="nav-item"><router-link class="nav-link" to="/app-settings">Settings</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-3">
    <h2 class="text-center login">Log in</h2>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form>
          <div class="mb-3">
            <input
              type="email"
              placeholder="Email adress"
              class="form-control"
              id="email"
              v-model="email"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              placeholder="Password"
              class="form-control"
              id="password"
              v-model="password"
            />
          </div>
          <div class="d-grid gap-2 text-center">
            <button type="button" class="btn btn-primary" @click="register">Log in</button>
            <router-link to="/register">
              <button type="button" class="btn btn-secondary"> You do not have an account? Click here to register </button>
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
    console.log("Log in succesfull");
    router.push("/");
  } catch (error) {
    console.log(error.code);
    switch (error.code) {
      case "auth/invalid-email":
        errMsg.value = "Wrong email";
        break;
      case "auth/user-not-found":
        errMsg.value = "User with given email address not found";
        break;
      default:
        errMsg.value = "Email or password is incorrect";
        break;
    }
  }
};
</script>

<style scoped>
.logo{
  max-height: 30px;
  max-width: 30px;
}


</style>
