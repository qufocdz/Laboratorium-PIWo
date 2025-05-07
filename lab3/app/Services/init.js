import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgPvQ3WfJZfaolmUOLhHyskVZJT-z24wU",
  authDomain: "piwo-letbook.firebaseapp.com",
  projectId: "piwo-letbook",
  storageBucket: "piwo-letbook.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export { app };