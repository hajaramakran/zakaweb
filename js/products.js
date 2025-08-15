let products = [];
const perPage = 6;
let currentPage = 1;
let totalPages = 1;

function showLoadingPlaceholders() {
  const grid = document.getElementById("productGrid");

  //6card loading placeholders
  grid.innerHTML = Array.from({ length: perPage }).map(() => `
    <div class="col-sm-6 col-md-4">
      <div class="product-card loading">
        <div class="image-wrapper skeleton"></div>
        <div class="product-details">
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text short"></div>
        </div>
      </div>
    </div>
  `).join('');
}

async function loadProducts(page = 1) {
  try {
    showLoadingPlaceholders();

    const res = await fetch(`https://bisque-chinchilla-962517.hostingersite.com/wp-json/custom/v1/products?page=${page}&limit=${perPage}`);
    const data = await res.json();

    products = data.products;
    totalPages = data.totalPages;
    currentPage = page;

    displayProducts();
    setupPagination();
  } catch (err) {
    console.error("Error loading products:", err);
    document.getElementById("productGrid").innerHTML = "<p>Failed to load products.</p>";
  }
}



function displayProducts() {
  const grid = document.getElementById("productGrid");

  grid.innerHTML = products.map(p => `
    <div class="col-sm-6 col-md-4">
      <a href="product.html?id=${p.id}" class="text-decoration-none text-dark">
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
        </a>
      </div>
    </div>
  `).join('');
}




function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#">${i}</a>
      </li>`;
  }

  document.querySelectorAll(".page-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = parseInt(e.target.innerText);
      loadProducts(page);
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});






