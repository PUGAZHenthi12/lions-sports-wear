import { db } from "./firebase-config.js";
import { uploadImage } from "./cloudinary.js";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const saveBtn = document.getElementById("saveBtn");
const productList = document.getElementById("productList");
const editProductId = document.getElementById("editProductId");
const searchProduct = document.getElementById("searchProduct");
const adminCategoryFilter = document.getElementById("adminCategoryFilter");

// ---------------- SAVE / UPDATE ----------------

saveBtn.addEventListener("click", async () => {

    const productName = document.getElementById("productName").value.trim();
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value.trim();
    const originalPrice = document.getElementById("originalPrice").value;
    const sizes = document.getElementById("sizes").value.trim();

    if (!productName || !price) {
        alert("Please fill Product Name and Price");
        return;
    }

    saveBtn.disabled = true;
    saveBtn.innerText = "Saving...";

    try {

        const imageFile1 = document.getElementById("image").files[0];
const imageFile2 = document.getElementById("image2").files[0];

let imageUrl1 = "";
let imageUrl2 = "";

if (imageFile1) {
    imageUrl1 = await uploadImage(imageFile1);
}

if (imageFile2) {
    imageUrl2 = await uploadImage(imageFile2);
}

        // ---------- UPDATE ----------
        if (editProductId.value) {

            const updateData = {

    name: productName,
    originalPrice: Number(originalPrice) || Number(price),
    price: Number(price),
    sizes: sizes,

    category,
    description

};

            if (imageUrl1) {
    updateData.image = imageUrl1;
}

if (imageUrl2) {
    updateData.image2 = imageUrl2;
}

            await updateDoc(
                doc(db, "products", editProductId.value),
                updateData
            );

            alert("Product Updated Successfully ✅");

        }

        // ---------- ADD ----------
        else {

            await addDoc(collection(db, "products"), {

    name: productName,
    originalPrice: Number(originalPrice) || Number(price),
    price: Number(price),
    sizes: sizes,

    category,
    description,
    image: imageUrl,

    createdAt: serverTimestamp()

});

            alert("Product Added Successfully ✅");

        }

        // Reset Form

        document.getElementById("productName").value = "";
        document.getElementById("price").value = "";
        document.getElementById("description").value = "";
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("image").value = "";
        document.getElementById("image2").value = "";

        editProductId.value = "";

        saveBtn.innerText = "Save Product";
        saveBtn.disabled = false;

        loadAdminProducts();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

        saveBtn.disabled = false;
        saveBtn.innerText = "Save Product";

    }

});

// ---------------- LOAD PRODUCTS ----------------

async function loadAdminProducts() {

    const snapshot = await getDocs(collection(db, "products"));

    productList.innerHTML = "";

    // Dashboard Statistics
    document.getElementById("totalProducts").innerText = snapshot.size;

    const categorySet = new Set();
    let latestProduct = "-";

    snapshot.forEach((item) => {

        const p = item.data();

        categorySet.add(p.category);
        latestProduct = p.name;

        productList.innerHTML += `
        <div style="border:1px solid #444;padding:15px;margin:10px 0;border-radius:10px;">

            <img src="${p.image}" width="120"><br><br>

            <b>${p.name}</b><br>

            ₹${p.price}<br>

            ${p.category}<br><br>

            <button onclick="editProduct('${item.id}')">
                ✏️ Edit
            </button>

            <button onclick="deleteProduct('${item.id}')">
                🗑 Delete
            </button>

        </div>
        `;

    });

    document.getElementById("totalCategories").innerText = categorySet.size;
    document.getElementById("latestProduct").innerText = latestProduct;

}

// ---------------- EDIT ----------------

window.editProduct = async function(id){

    const snap = await getDoc(doc(db,"products",id));

    if(!snap.exists()) return;

    const p = snap.data();

    editProductId.value = id;

    document.getElementById("productName").value = p.name;
    document.getElementById("price").value = p.price;
    document.getElementById("category").value = p.category;
    document.getElementById("description").value = p.description;
    document.getElementById("originalPrice").value = p.originalPrice || "";
    document.getElementById("sizes").value = p.sizes || "";

    saveBtn.innerText = "Update Product";

};

// ---------------- DELETE ----------------

window.deleteProduct = async function(id){

    if(!confirm("Delete this product?")) return;

    await deleteDoc(doc(db,"products",id));

    alert("Product Deleted");

    loadAdminProducts();

};

loadAdminProducts();
function filterAdminProducts() {

    const search = searchProduct.value.toLowerCase();
    const category = adminCategoryFilter.value;

    document.querySelectorAll("#productList > div").forEach((card) => {

        const name = card.querySelector("b").innerText.toLowerCase();

        const categoryText = card.innerText;

        const searchMatch = name.includes(search);

        const categoryMatch =
            category === "" || categoryText.includes(category);

        card.style.display =
            (searchMatch && categoryMatch) ? "" : "none";

    });

}

searchProduct.addEventListener("input", filterAdminProducts);

adminCategoryFilter.addEventListener("change", filterAdminProducts);
