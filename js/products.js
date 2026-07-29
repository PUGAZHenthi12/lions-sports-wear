import { db } from "./firebase-config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const productGrid = document.getElementById("productGrid");

async function loadProducts() {

    try {

        const snapshot = await getDocs(collection(db, "products"));

        productGrid.innerHTML = "";

        snapshot.forEach((doc) => {

            const product = doc.data();

            productGrid.innerHTML += `

                <div class="product-card">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-image">

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

        // Image Popup

        const popup = document.getElementById("imagePopup");
        const popupImage = document.getElementById("popupImage");
        const closePopup = document.getElementById("closePopup");

        document.querySelectorAll(".product-image").forEach(img => {

            img.style.cursor = "zoom-in";

            img.addEventListener("click", () => {

                popup.classList.add("active");

                popupImage.src = img.src;

            });

        });

        closePopup.onclick = () => {

            popup.classList.remove("active");

        };

        popup.onclick = (e) => {

            if (e.target === popup) {

                popup.classList.remove("active");

            }

        };

    }

    catch (error) {

        console.error(error);

        productGrid.innerHTML = "<h3>Products failed to load.</h3>";

    }

}

loadProducts();
