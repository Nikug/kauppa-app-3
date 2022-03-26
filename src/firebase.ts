import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { LoginInformation } from "./types/react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const initializeFirebase = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const firebase = getDatabase(firebaseApp);
  const auth = getAuth(firebaseApp);
  return { firebaseApp, firebase, auth };
};

export const createNewUser = async (login: LoginInformation) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      login.email,
      login.password
    );
    return userCredential;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (login: LoginInformation) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      login.email,
      login.password
    );
    return userCredential;
  } catch (error) {
    console.error(error);
  }
};
