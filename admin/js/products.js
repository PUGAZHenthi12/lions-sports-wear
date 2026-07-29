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
  
    const editId = document.getElementById("editProductId").value;
  
    try {
      
      const imageFile = document.getElementById("image").files[0];

let imageUrl = "";

if (imageFile) {
    imageUrl = await uploadImage(imageFile);
}
      
        if (editId) {

    await updateDoc(doc(db, "products", editId), {
        name: productName,
        price: Number(price),
        category: category,
        description: description,
        image: imageUrl || undefined
    });

    alert("Product Updated Successfully ✅");

    document.getElementById("editProductId").value = "";
    saveBtn.innerText = "Save Product";

} else {

    await addDoc(collection(db, "products"), {
        name: productName,
        price: Number(price),
        category: category,
        description: description,
        image: imageUrl,
        createdAt: serverTimestamp()
    });

    alert("Product Added Successfully ✅");
}

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

// ---------------- Product List ----------------

const productList = document.getElementById("productList");

async function loadAdminProducts() {

    const snapshot = await getDocs(collection(db, "products"));

    productList.innerHTML = "";

    snapshot.forEach((doc) => {

        const p = doc.data();

        productList.innerHTML += `
            <div style="border:1px solid #444;padding:15px;margin:10px 0;border-radius:10px;">
                <img src="${p.image}" width="120"><br><br>

                <b>${p.name}</b><br>

                ₹${p.price}<br>

                ${p.category}<br><br>

                <button onclick="editProduct('${doc.id}')">
    ✏️ Edit
</button>

<button onclick="deleteProduct('${doc.id}')">
    🗑️ Delete
</button>
            </div>
        `;

    });

}

window.editProduct = async function(id){

    const snap = await getDoc(doc(db,"products",id));

    if(!snap.exists()){
        alert("Product not found");
        return;
    }

    const p = snap.data();

    document.getElementById("editProductId").value = id;
    document.getElementById("productName").value = p.name;
    document.getElementById("price").value = p.price;
    document.getElementById("category").value = p.category;
    document.getElementById("description").value = p.description;

    saveBtn.innerText = "Update Product";
}

window.deleteProduct = async function(id){

    await deleteDoc(doc(db,"products",id));

    alert("Product Deleted");

    loadAdminProducts();

}

loadAdminProducts();
