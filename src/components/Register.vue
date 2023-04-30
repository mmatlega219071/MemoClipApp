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
                        <router-link class="nav-link" to="/login"
                            >Log in</router-link
                        >
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
import { getFirestore, collection, doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { ref } from "vue";
import { getMessaging, getToken } from "firebase/messaging";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const errMsg = ref("");

const db = getFirestore();

const saveFcmToken = async (uid) => {
    try {
      const messaging = getMessaging();

      await getToken(messaging, { vapidKey: 'BEDx7wtlLuCEEUsfDz2DrsKMW4FYzmZg4o2p6mjHHt8cgkXl85gJnk8ktEDxv_fTh9tmLoMZZMlINFMA-ntEumM' })
        .then((token) => {
          if (token) {
            console.log("FCM token:", token);
            const usersCollection = collection(db, "users");
            const userDoc = doc(usersCollection, uid);
            updateDoc(userDoc, { fcmToken: token });
          } else {
            console.log('Brak dostępnego tokenu rejestracji');
          } })
        .catch((error) => {
          console.log('Błąd przetwarzania tokenu rejestracyjnego:', error);
        });
    } catch (error) {
        console.log("Błąd przetwarzania tokenu rejestracyjnego:", error);
    }
};

const register = () => {
    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (user) => {
            console.log("Pomyślnie dodano użytkownika: ", user.user.uid);

            const usersCollection = collection(db, "users");
            const userDoc = doc(usersCollection, user.user.uid);

            const userData = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            await setDoc(userDoc, userData);
            await saveFcmToken(user.user.uid);

            router.push("/");
            console.log("Użytkownik dodany");
        })
        .catch((error) => {
            console.log(error);
        });
};

const registerWithGoogle = () => {
    const db = getFirestore();
    const provider = new GoogleAuthProvider();

    signInWithPopup(getAuth(), provider)
        .then(async (result) => {
            const usersCollection = collection(db, "users");
            const userDoc = doc(usersCollection, result.user.uid);

            const user = result.user;
            const [firstName, lastName] = user.displayName.split(" ");
            const email = user.email;

            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            await setDoc(userDoc, userData);
            await saveFcmToken(result.user.uid);

            router.push("/");
        })
        .catch((error) => {
            console.log(error);
        });
};
</script>

<script>
export default {
    name: "RegisterForm",
};
</script>

<style scoped></style>
