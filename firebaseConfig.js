// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtW0_CwQQYHOhlL65xkqpMhwLPncd1Y3g",
  authDomain: "fir-integration-87f97.firebaseapp.com",
  projectId: "fir-integration-87f97",
  storageBucket: "fir-integration-87f97.appspot.com",
  messagingSenderId: "989490278968",
  appId: "1:989490278968:web:741006edf3e34a421eeccd",
  measurementId: "G-KSKYK6MYM1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
