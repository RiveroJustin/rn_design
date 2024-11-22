// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBtW0_CwQQYHOhlL65xkqpMhwLPncd1Y3g",
  authDomain: "fir-integration-87f97.firebaseapp.com",
  databaseURL: "https://fir-integration-87f97-default-rtdb.firebaseio.com/",
  projectId: "fir-integration-87f97",
  storageBucket: "fir-integration-87f97.appspot.com",
  messagingSenderId: "989490278968",
  appId: "1:989490278968:web:741006edf3e34a421eeccd",
  measurementId: "G-KSKYK6MYM1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth, db, rtdb };
