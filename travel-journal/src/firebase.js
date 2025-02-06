import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth , GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoiGvruGttxn9WUx1kvYzQgDcczeoHREI",
    authDomain: "neww-4e03b.firebaseapp.com",
    projectId: "neww-4e03b",
    storageBucket: "neww-4e03b.firebasestorage.app",
    messagingSenderId: "4278207342",
    appId: "1:4278207342:web:0148e84c39ceb2b72f377f"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export {
  app,
  auth,
  db,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  googleProvider,
  storage,
};
