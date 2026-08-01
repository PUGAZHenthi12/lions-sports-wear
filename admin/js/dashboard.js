import { auth, db } from "./firebase-config.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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

// Dashboard Analytics

async function loadDashboard() {

    const snapshot = await getDocs(collection(db, "products"));

    document.getElementById("totalProducts").innerText = snapshot.size;

    const categorySet = new Set();
    let latestProduct = "-";

    const recentProducts = document.getElementById("recentProducts");

snapshot.forEach((doc) => {

    const p = doc.data();

    categorySet.add(p.category);

    latestProduct = p.name;

    recentProducts.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>₹${p.price}</td>
        </tr>
    `;

});

    document.getElementById("totalCategories").innerText = categorySet.size;
    document.getElementById("latestProduct").innerText = latestProduct;

}

loadDashboard();
