import { initializeApp } from "firebase/app";

//configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDPJ3Ki5yOZAm-gfZHV5tZJARNHYQpueWU",
  authDomain: "gigster-b98b9.firebaseapp.com",
  projectId: "gigster-b98b9",
  storageBucket: "gigster-b98b9.appspot.com",
  messagingSenderId: "242284250606",
  appId: "1:242284250606:web:04912309c73deb72fcfaff",
  measurementId: "G-DPDCHVGJ2B",
};

// Initialisation Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
