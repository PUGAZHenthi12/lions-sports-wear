import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", async () => {

    const productName = document.getElementById("productName").value.trim();
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value.trim();

    if (!productName || !price) {
        alert("Please fill Product Name and Price");
        return;
    }

    saveBtn.disabled = true;
    saveBtn.innerText = "Saving...";

    try {

        await addDoc(collection(db, "products"), {

            name: productName,
            price: Number(price),
            category: category,
            description: description,
            image: "",
            createdAt: serverTimestamp()

        });

        alert("Product Added Successfully ✅");

        document.getElementById("productName").value = "";
        document.getElementById("price").value = "";
        document.getElementById("description").value = "";
        document.getElementById("category").selectedIndex = 0;

    } catch (error) {

        console.error(error);
        alert("Error: " + error.message);

    }

    saveBtn.disabled = false;
    saveBtn.innerText = "Save Product";

});
