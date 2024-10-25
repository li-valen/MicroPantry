import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8L3S7hnyVsAtIAazC3eHJV7kvHw6RSa4",
  authDomain: "pantryapp-fd04e.firebaseapp.com",
  projectId: "pantryapp-fd04e",
  storageBucket: "pantryapp-fd04e.appspot.com",
  messagingSenderId: "142482715893",
  appId: "1:142482715893:web:2c5e818d4e1691654941bc",
  measurementId: "G-6T8P6TXV3E"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const AUTH = initializeAuth(
    FIREBASE_APP,
    {persistence: getReactNativePersistence(ReactNativeAsyncStorage)}
);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);