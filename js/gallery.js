import { db } from "./firebase-config.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function loadGallery() {

    const galleryGrid = document.getElementById("galleryGrid");

    if (!galleryGrid) return;

    galleryGrid.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "gallery"));

        if (snapshot.empty) {
            galleryGrid.innerHTML = "<p>No Gallery Images</p>";
            return;
        }

        snapshot.forEach((doc) => {

            const data = doc.data();

            galleryGrid.innerHTML += `
    <div class="gallery-item">
        <img src="${data.image}" alt="Gallery Image">
    </div>
`;
        });

    } catch (error) {

        console.error(error);
        galleryGrid.innerHTML = "<p>Failed to load gallery.</p>";

    }

}

loadGallery();
