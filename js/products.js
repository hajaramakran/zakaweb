/*const products = [
  { title: "Gigabit Dual Band Whole Home Mesh WiFi", price: "$129", old: "$200", image: "images/product1.jpg" },
  { title: "Mesh WiFi Router with Gigabit", price: "$756", image: "images/prod2.jpg" },
  { title: "Wireless Router for the Entire Home", price: "$265", image: "images/prod3.jpg" },
  { title: "Gigabit Wireless Gaming Router", price: "$951", image: "images/prod4.jpg" },
  { title: "Router with All-Inclusive Features", price: "$159", image: "images/prod5.jpg" },
  { title: "Gaming Router with Mesh Support", price: "$350", image: "images/prod6.jpg" },
  // Add more if needed
];*/

let products = [];
const perPage = 6;
let currentPage = 1;

async function loadProducts() {
  try {
    const res = await fetch("https://bisque-chinchilla-962517.hostingersite.com/wp-json/custom/v1/products");
    const data = await res.json();
    
    // Map data to match your structure (title, price, old, image)
    products = data.map(p => ({
      title: p.title,
      price: p.price + " €",
      old: p.regular_price !== p.price ? p.regular_price + " €" : null,
      image: p.image
    }));

    displayProducts();
    setupPagination();
  } catch (err) {
    console.error("Error loading products:", err);
    document.getElementById("productGrid").innerHTML = "<p>Failed to load products.</p>";
  }
}


function displayProducts() {
  const grid = document.getElementById("productGrid");
  const start = (currentPage - 1) * perPage;
  const currentItems = products.slice(start, start + perPage);

  grid.innerHTML = currentItems.map(p => `
    <div class="col-sm-6 col-md-4">
      <div class="product-card">
        <div class="image-wrapper">
          <img src="${p.image}" alt="${p.title}">
          <button class="add-to-cart">Add To Cart</button>
        </div>
        <div class="product-details">
          <div class="product-rating">★★★★★</div>
          <h6 class="product-title">${p.title}</h6>
          <div class="product-price">
            ${p.old ? `<span class="old-price">${p.old}</span>` : ""}
            <span class="new-price">${p.price}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}



function setupPagination() {
  const pagination = document.getElementById("pagination");
  const pages = Math.ceil(products.length / perPage);

  pagination.innerHTML = "";

  for (let i = 1; i <= pages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#">${i}</a>
      </li>`;
  }

  document.querySelectorAll(".page-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      currentPage = parseInt(e.target.innerText);
      displayProducts();
      setupPagination();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

