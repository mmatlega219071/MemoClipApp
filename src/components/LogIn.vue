<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/video-list">Video List</router-link></li>
            <li><router-link to="/record-video">Record Video</router-link></li>
            <li><router-link to="/app-settings">Settings</router-link></li>
        </ul>
    </nav>
    <h2>Zaloguj się</h2>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="text" placeholder="Hasło" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="register">Zaloguj</button></p>
    <p>
        <button @click="registerWithGoogle">
            Zarejestruj się za pomocą konta Google
        </button>
    </p>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref("")
const router = useRouter();

const register = () => {
    const auth = getAuth();
    console.log(auth);

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Zalogowano pomyślnie");
            console.log(auth.currentUser);

            router.push('/feed')
        })
        .catch((error) => {
            console.log(error.code);

            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Niepoprawny email";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "Nie znaleziono użytkownika o podanym adresie email";
                    break;
                default:
                    errMsg.value ="Email lub hasło jest niepoprawne";
                    break;
            }
        });
};

const registerWithGoogle = () => {};
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
