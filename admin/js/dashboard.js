import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Protect Dashboard
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html";
    }
});

// Logout
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    window.location.href = "index.html";

});
