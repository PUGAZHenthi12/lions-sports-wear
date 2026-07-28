import { db } from "./firebase-config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const productGrid = document.getElementById("productGrid");

async function loadProducts() {

    productGrid.innerHTML = "";

    const snapshot = await getDocs(collection(db, "products"));

    snapshot.forEach((doc) => {

        const product = doc.data();

        productGrid.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-content">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h4>₹${product.price}</h4>

                <a href="#contact" class="btn">
                    Order Now
                </a>

            </div>

        </div>

        `;

    });

}

loadProducts();
