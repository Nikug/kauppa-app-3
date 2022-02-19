// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtTMPmJhUj0Ecj6Oh7uetwaTmB6MNVmfE",
  authDomain: "kauppa-app.firebaseapp.com",
  databaseURL:
    "https://kauppa-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kauppa-app",
  storageBucket: "kauppa-app.appspot.com",
  messagingSenderId: "522722518172",
  appId: "1:522722518172:web:94baa70cc6544115367959",
};

// Initialize Firebase
export const initializeFirebase = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const firebase = getDatabase(firebaseApp);
  return firebase;
};
