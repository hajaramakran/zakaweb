document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // Get references to elements
  const skeletonEl = document.getElementById("product-skeleton");
  const contentEl = document.getElementById("product-content");
  const detailsEl = document.getElementById("product-details");

  // Ensure initial state
  skeletonEl.style.display = "flex"; // Show skeleton
  contentEl.style.display = "none";  // Hide content

  if (!id) {
    skeletonEl.style.display = "none";
    detailsEl.innerHTML = "<p>Invalid product ID.</p>";
    return;
  }

  fetch(`https://bisque-chinchilla-962517.hostingersite.com/wp-json/custom/v1/products/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    })
    .then(product => {
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
      skeletonEl.style.display = "none";  // Hide skeleton
      contentEl.style.display = "flex";   // Show content

      document.getElementById("add-to-cart").addEventListener("click", () => {
        alert(`Produit "${product.title}" ajouté au panier.`);
      });
    })
    .catch(err => {
      skeletonEl.style.display = "none";
      contentEl.style.display = "none";
      detailsEl.innerHTML = `<p>${err.message}</p>`;
    });
});
