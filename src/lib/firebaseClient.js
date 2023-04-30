import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
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
const application = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(application);

export default {
  async createUserWithEmailAndPassword(email, password, firstName, lastName) {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const usersCollection = collection(db, "users");
    const userDoc = doc(usersCollection, user.user.uid);
    const userData = {
      firstName,
      lastName,
      email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(userDoc, userData);
    return userData;
  },

  async createUserWithGoogleProvider() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const usersCollection = collection(db, "users");
    const userDoc = doc(usersCollection, result.user.uid);
    const user = result.user;
    const [firstName, lastName] = user.displayName.split(" ");
    const email = user.email;
    const userData = {
      firstName,
      lastName,
      email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(userDoc, userData);
    return userData;
  },

  async signInWithEmailAndPassword(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  async onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },

  async signOut() {
    return signOut(auth);
  },

  async saveVideoWithLocation(recordedChunks, location) {
    const storage = getStorage();
    const dateFormatted = new Date()
      .toISOString()
      .split(".")
      .at(0)
      .replace(/:/g, "");
    const uniqueVideoName = auth.currentUser.uid + "-" + dateFormatted + ".mp4";
    const videosRef = storageRef(storage, uniqueVideoName);
    const videoBlob = new Blob(recordedChunks, { type: "video/mp4" });
    await uploadBytes(videosRef, videoBlob);
    const videosCollectionRef = collection(db, "videos");
    const videoData = {
      name: uniqueVideoName,
      user: auth.currentUser.uid,
      location,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await addDoc(videosCollectionRef, videoData);
    return videoData;
  },
};
