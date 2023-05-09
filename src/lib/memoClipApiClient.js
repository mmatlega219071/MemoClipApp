import firebaseClient from "./firebaseClient";

export async function onAuthStateChanged(callback) {
  return firebaseClient.onAuthStateChanged(callback);
}
export async function signOut() {
  return firebaseClient.signOut();
}
export async function saveVideoWithLocation(recordedChunks, location) {
  return firebaseClient.saveVideoWithLocation(recordedChunks, location);
}

export async function createUserWithEmailAndPassword(
  email,
  password,
  firstName,
  lastName
) {
  return firebaseClient.createUserWithEmailAndPassword(
    email,
    password,
    firstName,
    lastName
  );
}
export async function createUserWithGoogleProvider(providerName) {
  return firebaseClient.createUserWithGoogleProvider(providerName);
}

export async function signInWithEmailAndPassword(email, password) {
  return firebaseClient.signInWithEmailAndPassword(email, password);
}

export async function listUserVideos() {
  return firebaseClient.listUserVideos();
}

export async function deleteVideo(docId) {
  return firebaseClient.deleteVideo(docId);
}

export async function getAllVideos() {
  return firebaseClient.getAllVideos();
}

export const messaging = firebaseClient.messaging;
export const firebaseConfig = firebaseClient.firebaseConfig;
