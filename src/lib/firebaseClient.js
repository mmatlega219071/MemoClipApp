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
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDPlm0KNLExsLzVQeayl3WTU3d8JSTdKZE",
  authDomain: "memoclip-e3cdb.firebaseapp.com",
  projectId: "memoclip-e3cdb",
  storageBucket: "memoclip-e3cdb.appspot.com",
  messagingSenderId: "914216404911",
  appId: "1:914216404911:web:64daa30c06d488247b115a",
  measurementId: "G-Z73XMP1X9G",
  vapidKey:
    "BHWHMZYZpDjHC3ZS3MnOJ8n0nnOt7PsIsLCY9vwWhOCV85FDjKKyN4P7qFbcXSQwy2hexZ9lgZkQ_8FPra8aph4",
};

// Initialize Firebase
const application = initializeApp(firebaseConfig);
const db = getFirestore();
getAuth(application);

const messaging = getMessaging(application);

export default {
  async createUserWithEmailAndPassword(email, password, firstName, lastName) {
    const user = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
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
    const result = await signInWithPopup(getAuth(), provider);

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
    return signInWithEmailAndPassword(getAuth(), email, password);
  },

  async onAuthStateChanged(callback) {
    return onAuthStateChanged(getAuth(), callback);
  },

  async signOut() {
    return signOut(getAuth());
  },

  async saveVideoWithLocation(recordedChunks, location) {
    const storage = getStorage();
    const dateFormatted = new Date()
      .toISOString()
      .split(".")
      .at(0)
      .replace(/:/g, "");
    const { currentUser } = getAuth();
    const uniqueVideoName = currentUser.uid + "-" + dateFormatted + ".mp4";
    const videosRef = storageRef(storage, uniqueVideoName);
    const videoBlob = new Blob(recordedChunks, { type: "video/mp4" });
    await uploadBytes(videosRef, videoBlob);
    const videosCollectionRef = collection(db, "videos");
    const videoData = {
      name: uniqueVideoName,
      user: currentUser.uid,
      location,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const result = await addDoc(videosCollectionRef, videoData);
    return { videoData, result };
  },

  async listUserVideos() {
    const { currentUser } = getAuth();
    const storage = getStorage();

    const videosCollectionRef = collection(db, "videos");
    const q = query(videosCollectionRef, where("user", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);

    const list = querySnapshot.docs.map((doc) => [doc.data(), doc.id]);
    const userVideosOutput = [];
    for (const item of list) {
      const videoURL = await getDownloadURL(storageRef(storage, item[0].name));
      userVideosOutput.push({
        videoURL,
        createdAt: new Date(item[0].createdAt.seconds * 1000),
        docId: item[1],
      });
      console.log(item);
    }
    return userVideosOutput;
  },

  async deleteVideo(docId) {
    const videoRecordRef = doc(db, "videos", docId);
    const videoSnap = (await getDoc(videoRecordRef)).data();
    const storage = getStorage();
    const videoRef = storageRef(storage, videoSnap.name);
    await deleteObject(videoRef);
    await deleteDoc(videoRecordRef);
    // File deleted successfully
  },

  async getAllVideos() {
    let tab= [];
    const querySnapshotUsers = await getDocs(collection(db, "users"));
  
    for (const user of querySnapshotUsers.docs) {
      const userDocRef = doc(db, "users", user.id);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        var firstName = userData.firstName;
        var lastName = userData.lastName;
      }

      const q = query(collection(db, "videos"), where("user", "==", user.id));
      const result = await getDocs(q);

      const userObj = {
        user: user.id,
        userFirstName: firstName,
        userLastName: lastName,
        videoNumber: result.size
      }

      tab.push(userObj)
    }

    const topUsersCollectionRef = collection(db, 'topUsers');
    const docRef = doc(topUsersCollectionRef);
    
    await setDoc(docRef, {
      listOfTopUsers: tab
    });
    
    return tab;
  },
  
  messaging,
  firebaseConfig,
};
