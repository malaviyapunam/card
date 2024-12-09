// Get elements
const productForm = document.getElementById("productForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const categoryInput = document.getElementById("category");
const brandInput = document.getElementById("brand");
const colorInput = document.getElementById("color");

const productCardsContainer = document.getElementById("productCards");
const cartProductsContainer = document.getElementById("cartProducts");
const clearCartButton = document.getElementById("clearCart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to the page and to local storage
function addProduct(e) {
  e.preventDefault();

  const product = {
    title: titleInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    category: categoryInput.value,
    brand: brandInput.value,
    color: colorInput.value,
  };

  // Store product in local storage
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  // Clear form
  productForm.reset();

  // Display products
  displayProducts();
}

// Display products
function displayProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  productCardsContainer.innerHTML = "";
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
      <p>Category: ${product.category}</p>
      <p>Brand: ${product.brand}</p>
      <p>Color: ${product.color}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productCardsContainer.appendChild(card);
  });
}

// Add product to cart
function addToCart(productIndex) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products[productIndex];

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}

// Display cart
function displayCart() {
  cartProductsContainer.innerHTML = "";
  cart.forEach((product, index) => {
    const productItem = document.createElement("div");
    productItem.classList.add("cart-product");
    productItem.innerHTML = `
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
      <p>Brand: ${product.brand}</p>
      <p>Color: ${product.color}</p>
    `;
    cartProductsContainer.appendChild(productItem);
  });
}

// Clear cart
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Event listeners
productForm.addEventListener("submit", addProduct);
clearCartButton.addEventListener("click", clearCart);

// Initial display
displayProducts();
displayCart();




