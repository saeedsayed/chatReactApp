import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    // apiKey: process.env.FIREBASE_APIKEY,
    // authDomain: process.env.FIREBASE_AUTHDOMAIN,
    // projectId: process.env.FIREBASE_PROJECTID,
    // storageBucket: process.env.FIREBASE_STORGEBUCKET,
    // messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    // appId: process.env.FIREBASE_APPLD,
    apiKey: "AIzaSyDGf7QVZmQVkgWQjKi_SMlnBAJ_R5gEPLY",
    authDomain: "chat-be8b1.firebaseapp.com",
    projectId: "chat-be8b1",
    storageBucket: "chat-be8b1.appspot.com",
    messagingSenderId: "211440961934",
    appId: "1:211440961934:web:5f1a9947e15eb122b6fcdf",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const storage = getStorage(app)

export const db = getFirestore(app)
