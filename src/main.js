import { createApp } from 'vue';
import App from './App.vue';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import './registerServiceWorker'

const firebaseConfig = {
  apiKey: "AIzaSyDPlm0KNLExsLzVQeayl3WTU3d8JSTdKZE",
  authDomain: "memoclip-e3cdb.firebaseapp.com",
  projectId: "memoclip-e3cdb",
  storageBucket: "memoclip-e3cdb.appspot.com",
  messagingSenderId: "914216404911",
  appId: "1:914216404911:web:64daa30c06d488247b115a",
  measurementId: "G-Z73XMP1X9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

// Create Vue instance and mount to DOM
createApp(App).mount('#app');