function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

window.addEventListener("load", function () {
    setTimeout(function () {
        const loader = document.getElementById("loader");
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);

    }, 1800);
});

const reveals = document.querySelectorAll(
".feature-card,.product-card,.review-card,.stat-box"
);

function revealElements(){

const trigger = window.innerHeight - 80;

reveals.forEach((el)=>{

const top = el.getBoundingClientRect().top;

if(top < trigger){

el.classList.add("show");

}

});

}

window.addEventListener("scroll", revealElements);

revealElements();

let cart = [];

function addToCart(name, price){

cart.push({
name,
price
});

alert(name + " added to cart!");

console.log(cart);

}

let cart = [];

function addToCart(name, price) {

    cart.push({ name, price });

    updateCart();

}

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cartCount");

    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item) => {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <strong>₹${item.price}</strong>
            </div>
        `;

    });

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    }

    cartCount.innerText = cart.length;

    cartTotal.innerText = total;

}

function toggleCart() {

    document
        .getElementById("cartSidebar")
        .classList
        .toggle("active");

}

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    alert("Proceeding to checkout...");

}

function openCheckout(){

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    document.getElementById("checkoutModal").style.display="flex";

}

function closeCheckout(){

    document.getElementById("checkoutModal").style.display="none";

}

function placeOrder(){

    const name=document.getElementById("customerName").value.trim();

    const phone=document.getElementById("customerPhone").value.trim();

    const address=document.getElementById("customerAddress").value.trim();

    if(!name || !phone || !address){

        alert("Please fill all details.");

        return;

    }

    let total=0;

    let message="🏆 *Lion's Sports Wear Order*%0A%0A";

    message+="👤 Name: "+name+"%0A";

    message+="📱 Phone: "+phone+"%0A";

    message+="📍 Address: "+address+"%0A%0A";

    message+="🛒 Order Details:%0A";

    cart.forEach(item=>{

        message+="• "+item.name+" - ₹"+item.price+"%0A";

        total+=item.price;

    });

    message+="%0A💰 Total: ₹"+total;

    window.open(

        "https://wa.me/917338086551?text="+message,

        "_blank"

    );

}

function searchProducts(){

const value=document
.getElementById("searchBox")
.value
.toLowerCase();

document
.querySelectorAll(".shop-card")
.forEach(card=>{

const name=card
.querySelector("h3")
.innerText
.toLowerCase();

card.style.display=
name.includes(value)
? "block"
: "none";

});

}

function filterProducts(){

const category=
document.getElementById("categoryFilter").value;

document
.querySelectorAll(".shop-card")
.forEach(card=>{

if(category==="all"){

card.style.display="block";

}else{

card.style.display=
card.dataset.category===category
? "block"
: "none";

}

});

}

function toggleWishlist(icon){

icon.classList.toggle("active");

icon.innerHTML=
icon.classList.contains("active")
? "❤"
: "♡";

}

function quickView(title, description, price, image){

document.getElementById("quickTitle").innerText=title;

document.getElementById("quickDescription").innerText=description;

document.getElementById("quickPrice").innerText=price;

document.getElementById("quickImage").src=image;

const amount=parseInt(price.replace(/[^\d]/g,""));

document.getElementById("quickCartBtn").onclick=function(){

addToCart(title,amount);

closeQuickView();

};

document.getElementById("quickViewModal").style.display="flex";

}

function closeQuickView(){

document.getElementById("quickViewModal").style.display="none";

}
