/* eslint-disable */ 
import { createApp } from "vue";
import Vue from "vue";
import VueRouter from "vue";
import App from "./App.vue";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import router from './router';

const firebaseConfig = {
    apiKey: "AIzaSyDPlm0KNLExsLzVQeayl3WTU3d8JSTdKZE",
    authDomain: "memoclip-e3cdb.firebaseapp.com",
    projectId: "memoclip-e3cdb",
    storageBucket: "memoclip-e3cdb.appspot.com",
    messagingSenderId: "914216404911",
    appId: "1:914216404911:web:64daa30c06d488247b115a",
    measurementId: "G-Z73XMP1X9G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);


// Create Vue instance and mount to DOM
createApp(App).use(router).mount("#app");


