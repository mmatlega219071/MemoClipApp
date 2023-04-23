<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/video-list">Video List</router-link></li>
            <li><router-link to="/record-video">Record Video</router-link></li>
            <li><router-link to="/app-settings">Settings</router-link></li>
        </ul>
    </nav>
    <h2>Zarejestruj się</h2>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="text" placeholder="Hasło" v-model="password" /></p>
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
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref } from "vue";

const email = ref("");
const password = ref("");

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Pomyślnie dodano użytkownika");
            router.push("/");
        })
        .catch((error) => {
            console.log(error.code);
        });
};

const registerWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/");
        })
        .catch((error) => {
            console.log(error);
        })
};
</script>

<script>
export default {
  name: "RegisterForm",
};
</script>

<style scoped>
nav {
    background-color: #2d2d2d;
    color: #fff;
    display: flex;
}

ul {
    list-style: none;
    display: flex;
}

li {
    margin: 0 10px;
}

a {
    color: #fff;
    text-decoration: none;
}
</style>
