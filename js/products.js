import { db } from "./firebase-config.js";

import {
  collection,
  getDocs,
  doc,
  getDoc
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

                        <div class="price-box">

    <span class="old-price">
        ₹${product.originalPrice || product.price}
    </span>

    <span class="new-price">
        ₹${product.price}
    </span>

</div>

${
    product.originalPrice && product.originalPrice > product.price
    ? `
    <div class="save-price">
        🔥 Save ₹${product.originalPrice - product.price}
    </div>
    `
    : ""
}

${
    product.sizes
    ? `
    <div class="product-sizes">
        📏 Sizes: ${product.sizes}
    </div>
    `
    : ""
}
                        <div class="product-options">

<select class="product-size">

<option>S</option>
<option>M</option>
<option>L</option>
<option>XL</option>
<option>XXL</option>

</select>

<input
type="number"
class="product-qty"
min="1"
value="1">

</div>

                        <a
class="btn whatsapp-order"

href="https://wa.me/918778767806?text=${encodeURIComponent(
`Hello Lion's Sports Wear,

I want to order this product.

Product : ${product.name}

Category : ${product.category}

Price : ₹${product.price}

Please share more details.`
)}"

target="_blank">

<button
class="btn whatsapp-order"

data-name="${product.name}"
data-category="${product.category}"
data-price="${product.price}">

Order on WhatsApp

</button>

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

    let visibleCount = 0;

    document.querySelectorAll(".product-card").forEach((card) => {

        const name = card.querySelector("h3").innerText.toLowerCase();
        const productCategory = card.dataset.category;

        const searchMatch = name.includes(search);
        const categoryMatch = category === "" || productCategory === category;

        if (searchMatch && categoryMatch) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }

    });

    document.getElementById("noProducts").style.display =
        visibleCount === 0 ? "block" : "none";

}

searchInput.addEventListener("input", filterProducts);

categoryFilter.addEventListener("change", filterProducts);

async function loadOffer() {

  console.log("Offer function started");

    try {

        const offerRef = doc(db, "offers", "homepage");
        const offerSnap = await getDoc(offerRef);

        if (!offerSnap.exists()) return;

        const offer = offerSnap.data();

        if (!offer.active) return;

        document.getElementById("offerBanner").style.display = "block";
        document.getElementById("offerTitle").textContent = offer.title;
        document.getElementById("offerSubtitle").textContent = offer.subtitle;
        document.getElementById("offerBtn").textContent = offer.button;

    } catch (error) {

        console.error("Offer Banner Error:", error);

    }

}

loadProducts();
loadOffer();
document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("whatsapp-order")) return;

    const card = e.target.closest(".product-card");

    const size = card.querySelector(".product-size").value;
    const qty = card.querySelector(".product-qty").value;

    const name = e.target.dataset.name;
    const category = e.target.dataset.category;
    const price = e.target.dataset.price;

    const message = `Hello Lion's Sports Wear,

I want to order this product.

Product: ${name}

Category: ${category}

Size: ${size}

Quantity: ${qty}

Price: ₹${price}

Please share more details.`;

    window.open(
        "https://wa.me/918778767806?text=" + encodeURIComponent(message),
        "_blank"
    );

});
