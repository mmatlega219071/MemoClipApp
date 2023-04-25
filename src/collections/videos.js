import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "../main";

export function addVideo(inputData) {
  const videosCollectionRef = collection(firestore, "videos");

  //const userDoc = doc(videosCollection, result.video.uid);

  //const user = result.user;

  //const [firstName, lastName] = user.displayName.split(' ');

  //const email = user.email;
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // User is signed in
  } else {
    // No user is signed in.
  }
  // let latlng;
  //navigator.geolocation.getCurrentPosition(function (position) {
  // latlng = [position.coords.latitude, position.coords.longitude];
  //});

  const videoData = {
    name: inputData.name,
    user: user.uid,
    // localization: latlng,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  addDoc(videosCollectionRef, videoData).then(() => {
    console.log("document has beed added successfully");
  });
  console.log(videosCollectionRef);
  console.log(videoData);
}
