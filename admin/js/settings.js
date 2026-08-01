import { db } from "./firebase-config.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const settingsRef = doc(db, "settings", "website");

// Load Settings
async function loadSettings() {

    const snap = await getDoc(settingsRef);

    if (snap.exists()) {

        const data = snap.data();

        document.getElementById("shopName").value = data.shopName || "";
        document.getElementById("phone").value = data.phone || "";
        document.getElementById("whatsapp").value = data.whatsapp || "";
        document.getElementById("instagram").value = data.instagram || "";
        document.getElementById("maps").value = data.maps || "";

    }

}

loadSettings();

// Save Settings
document.getElementById("saveSettings").addEventListener("click", async () => {

    await setDoc(settingsRef, {

        shopName: document.getElementById("shopName").value,
        phone: document.getElementById("phone").value,
        whatsapp: document.getElementById("whatsapp").value,
        instagram: document.getElementById("instagram").value,
        maps: document.getElementById("maps").value

    });

    alert("Settings Saved Successfully ✅");

});
