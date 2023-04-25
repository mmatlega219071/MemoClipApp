import { collection } from "firebase/firestore";
import { firestore } from "../main";

export function addVideo(videoData) {
  const videoCollection = collection(firestore, "users");
  console.log(videoCollection);
  console.log(videoData);
}
