<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/video-list">Lista wideo</router-link></li>
            <li><router-link to="/record-video">Nagraj wideo</router-link></li>
            <li><router-link to="/app-settings">Ustawienia</router-link></li>
            <li><router-link to="/login">Zaloguj się</router-link></li>
            <li><router-link to="/register">Zarejestruj się</router-link></li>
            <button @click="handleSignOut" v-if="isLoggedIn">Wyloguj</button>
        </ul>
    </nav>
    <button id="btn-vibrate" @click="vibrate()">Wibracja</button>
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
</script>


<script>
export default {
    name: "app-menu",
    methods: {
        vibrate() {
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200]);
            } else {
                alert("Twoja przeglądarka nie obsługuje wibracji.");
            }
        },
    },
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
