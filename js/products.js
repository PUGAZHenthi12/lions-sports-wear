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

                <div class="product-card" data-category="${product.category}">

                    <div class="product-slider">

    <img
        src="${product.image}"
        class="product-image active">

    ${
        product.image2
        ? `<img src="${product.image2}" class="product-image">`
        : ""
    }

    ${
        product.image2
        ? `
        <button class="prev-btn">◀</button>
        <button class="next-btn">▶</button>
        `
        : ""
    }

</div>

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

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("next-btn") ||
       e.target.classList.contains("prev-btn")){

        const slider = e.target.parentElement;

        const images = slider.querySelectorAll(".product-image");

        let current = 0;

        images.forEach((img,index)=>{
            if(img.classList.contains("active")){
                current=index;
            }
        });

        images[current].classList.remove("active");

        if(e.target.classList.contains("next-btn")){
            current=(current+1)%images.length;
        }else{
            current=(current-1+images.length)%images.length;
        }

        images[current].classList.add("active");
    }

});

const searchInput = document.getElementById("searchProduct");
const categoryFilter = document.getElementById("categoryFilter");

function filterProducts() {

    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    document.querySelectorAll(".product-card").forEach((card) => {

        const name = card.querySelector("h3").innerText.toLowerCase();

        const price = card.innerText.toLowerCase();

        const productCategory = card.dataset.category;

        const searchMatch =
            name.includes(search) || price.includes(search);

        const categoryMatch =
            category === "" || productCategory === category;

        if (searchMatch && categoryMatch) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

}

searchInput.addEventListener("input", filterProducts);

categoryFilter.addEventListener("change", filterProducts);

loadProducts();
