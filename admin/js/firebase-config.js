// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {

    apiKey: "AIzaSyAHfKtPGmkh4Biw-i2MYRv_KbzVZarIMwM",

    authDomain: "lions-sports-wear.firebaseapp.com",

    projectId: "lions-sports-wear",

    storageBucket: "lions-sports-wear.firebasestorage.app",

    messagingSenderId: "131458293230",

    appId: "1:131458293230:web:ac28f4c2afd9d92a1d82ff"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth
export const auth = getAuth(app);
export const db = getFirestore(app);
