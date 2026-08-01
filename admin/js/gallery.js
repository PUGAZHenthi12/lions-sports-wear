import { db } from "./firebase-config.js";
import { uploadImage } from "./cloudinary.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const uploadBtn = document.getElementById("uploadGallery");
const galleryList = document.getElementById("galleryList");

uploadBtn.addEventListener("click", async () => {

    const file = document.getElementById("galleryImage").files[0];

    if (!file) {
        alert("Please select an image");
        return;
    }

    uploadBtn.disabled = true;
    uploadBtn.innerText = "Uploading...";

    try {

        const imageUrl = await uploadImage(file);

        await addDoc(collection(db, "gallery"), {

            image: imageUrl,
            createdAt: serverTimestamp()

        });

        alert("Image Uploaded Successfully ✅");

        document.getElementById("galleryImage").value = "";

        loadGallery();

    } catch (err) {

        console.error(err);
        alert(err.message);

    }

    uploadBtn.disabled = false;
    uploadBtn.innerText = "📤 Upload Image";

});

async function loadGallery() {

    galleryList.innerHTML = "";

    const snapshot = await getDocs(collection(db, "gallery"));

    snapshot.forEach((item) => {

        const data = item.data();

        galleryList.innerHTML += `
            <div style="display:inline-block;margin:10px;text-align:center;">
                <img src="${data.image}" width="150" style="border-radius:10px;"><br><br>

                <button onclick="deleteGallery('${item.id}')">
                    🗑 Delete
                </button>

            </div>
        `;

    });

}

window.deleteGallery = async function(id){

    if(!confirm("Delete this image?")) return;

    await deleteDoc(doc(db,"gallery",id));

    loadGallery();

}

loadGallery();
