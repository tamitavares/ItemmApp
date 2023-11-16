import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSNkpPonlA9bmlkxz5hwEnK4u74DuvmPA",
  authDomain: "itemm-d37c8.firebaseapp.com",
  projectId: "itemm-d37c8",
  storageBucket: "itemm-d37c8.appspot.com",
  messagingSenderId: "846627289274",
  appId: "1:846627289274:web:13fa24bd598097cbcbaa83"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const storage = getStorage(app);


export { db, auth };
