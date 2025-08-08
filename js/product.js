function showProductSkeleton() {
  const contentEl = document.getElementById("product-content");
  const detailsEl = document.getElementById("product-details");

  contentEl.style.display = "flex";
  contentEl.innerHTML = `
    <div class="col-12 col-lg-6 product-image text-center">
      <div class="skeleton skeleton-img"></div>
    </div>

    <div class="col-12 col-lg-6 product-info">
      <div class="skeleton skeleton-text title"></div>
      <div class="skeleton skeleton-text price"></div>
      <div class="skeleton skeleton-text short"></div>
      <div class="skeleton skeleton-btn"></div>
    </div>
  `;

  detailsEl.innerHTML = `
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text short"></div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // Get references to elements
  const contentEl = document.getElementById("product-content");
  const imgLoad = document.getElementById("img-load");
  const detailsEl = document.getElementById("product-details");

  // Ensure initial state
  contentEl.style.display = "none";  // Hide content

  if (!id) {
    detailsEl.innerHTML = "<p>Invalid product ID.</p>";
    return;
  }

  //load cards before  result
  
  fetch(`https://bisque-chinchilla-962517.hostingersite.com/wp-json/custom/v1/products/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    })
    .then(product => {
     // contentEl.style.display = "flex"; 
     imgLoad.style.display = "none"; // Hide loading image
      // Fill product data
      document.getElementById("product-image").src = product.image;
      document.getElementById("product-title").textContent = product.title;
      document.getElementById("product-price").textContent = `${product.price} €`;
      
      const oldPriceEl = document.getElementById("product-old-price");
      if (product.price !== product.regular_price) {
        oldPriceEl.textContent = `${product.regular_price} €`;
        oldPriceEl.style.display = "block";
      } else {
        oldPriceEl.style.display = "none";
      }
      
      detailsEl.innerHTML = product.description;

      // Switch visibility
      contentEl.style.display = "flex";   // Show content

      document.getElementById("add-to-cart").addEventListener("click", () => {
         let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if product already in cart
        const existing = cart.find(item => item.id === product.id);
      
        if (existing) {
          existing.quantity += 1; // Increase quantity
        } else {
          cart.push({
            id: product.id,
            name: product.title,
            price: parseFloat(product.price),
            image: product.image,
            quantity: 1
          });
        }
      
        localStorage.setItem("cart", JSON.stringify(cart));
      
        // Optional: alert
        alert(`Produit "${product.title}" ajouté au panier.`);
      
        // Update cart count badge (if visible)
        const badge = document.getElementById("cartCount");
        if (badge) {
          badge.textContent = cart.length;
          badge.classList.add("animate-badge");
          setTimeout(() => badge.classList.remove("animate-badge"), 300);
        }
        //alert(`Produit "${product.title}" ajouté au panier.`);
      });
    })
    .catch(err => {
      contentEl.style.display = "none";
      detailsEl.innerHTML = `<p>${err.message}</p>`;
    });
});
