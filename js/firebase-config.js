import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHfKtPGmkh4Biw-i2MYRv_KbzVZarIMwM",
  authDomain: "lions-sports-wear.firebaseapp.com",
  projectId: "lions-sports-wear",
  storageBucket: "lions-sports-wear.firebasestorage.app",
  messagingSenderId: "131458293230",
  appId: "1:131458293230:web:ac28f4c2afd9d92a1d82ff"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
