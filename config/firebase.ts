import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, type Auth } from "firebase/auth";
// @ts-ignore 
import { getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBC3W8g6bIauK6NjQwVEVfIwYCXqBOuqOY",
  authDomain: "mobileass4.firebaseapp.com",
  projectId: "mobileass4",
  storageBucket: "mobileass4.firebasestorage.app",
  messagingSenderId: "217372885694",
  appId: "1:217372885694:web:b174276d0bc22c476a94ef",
  measurementId: "G-TGZYFLC7CF"
};

const app = initializeApp(firebaseConfig);
export const auth: Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});