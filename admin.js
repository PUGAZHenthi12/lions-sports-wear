let products = [];

function addProduct(){

const name =
document.getElementById("productName").value;

const price =
document.getElementById("productPrice").value;

const category =
document.getElementById("productCategory").value;

const image =
document.getElementById("productImage").value;

products.push({
name,
price,
category,
image
});

renderProducts();

}

function renderProducts(){

const table =
document.getElementById("productTable");

table.innerHTML = "";

products.forEach((product,index)=>{

table.innerHTML += `

<tr>

<td>${product.name}</td>

<td>₹${product.price}</td>

<td>${product.category}</td>

<td>

<button onclick="deleteProduct(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function deleteProduct(index){

products.splice(index,1);

renderProducts();

}
