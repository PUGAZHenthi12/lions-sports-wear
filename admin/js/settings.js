import { db } from "./firebase-config.js";
import { uploadImage } from "./cloudinary.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const settingsRef = doc(db, "settings", "website");
const offerRef = doc(db, "offers", "homepage");

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

// Load Offer
async function loadOffer() {

    const snap = await getDoc(offerRef);

    if (snap.exists()) {

        const data = snap.data();

        document.getElementById("offerTitle").value = data.title || "";
        document.getElementById("offerSubtitle").value = data.subtitle || "";
        document.getElementById("offerButton").value = data.button || "";
        document.getElementById("offerActive").checked = data.active || false;
        document.getElementById("offerStart").value = data.start || "";
        document.getElementById("offerEnd").value = data.end || "";

    }

}

loadOffer();

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

// Save Offer
document.getElementById("saveOffer").addEventListener("click", async () => {

    const imageFile = document.getElementById("offerImage").files[0];

    let imageUrl = "";

    if (imageFile) {
        imageUrl = await uploadImage(imageFile);
    }

    await setDoc(offerRef, {

    title: document.getElementById("offerTitle").value,
    subtitle: document.getElementById("offerSubtitle").value,
    button: document.getElementById("offerButton").value,

    start: document.getElementById("offerStart").value,
    end: document.getElementById("offerEnd").value,

    active: document.getElementById("offerActive").checked,
    image: imageUrl

});

    alert("Offer Banner Saved Successfully ✅");

});

// ===============================
// Offer Image Preview
// ===============================

const offerImage = document.getElementById("offerImage");
const offerPreview = document.getElementById("offerPreview");

offerImage.addEventListener("change", () => {

    const file = offerImage.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        offerPreview.src = e.target.result;
        offerPreview.style.display = "block";

    };

    reader.readAsDataURL(file);

});
