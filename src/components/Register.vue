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
import { getFirestore, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref } from "vue";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const errMsg = ref("");

const register = () => {
  const auth = getAuth();
  const db = getFirestore();
  
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((user) => {
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
      
      setDoc(userDoc, userData)
        .then(() => {
          router.push("/");
          console.log("Użytkownik dodany")
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

const registerWithGoogle = () => {
    const db = getFirestore();
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            const usersCollection = collection(db, "users");
            const userDoc = doc(usersCollection, result.user.uid);

            const user = result.user;
            const [firstName, lastName] = user.displayName.split(' ');
            const email = user.email;

            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            
            setDoc(userDoc, userData)
                .then(() => {
                    router.push("/");
                })
                .catch((error) => {
                    console.log(error)
                });

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
