import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your Firebase configuration details
const firebaseConfig = {
    apiKey: "AIzaSyCid7050DKmXRiKdwLbLVHnsxxZ_ubSLVw",
    authDomain: "lootchase-51.firebaseapp.com",
    projectId: "lootchase-51",
    storageBucket: "lootchase-51.firebasestorage.app",
    messagingSenderId: "359744692534",
    appId: "1:359744692534:web:a1f359695faf0002bbd397"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app);  // Firestore
const storage = getStorage(app);

export { auth, db, storage };
