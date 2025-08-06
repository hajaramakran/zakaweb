document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("product-details").innerHTML = "<p>Invalid product ID.</p>";
    return;
  }

  fetch(`https://bisque-chinchilla-962517.hostingersite.com/wp-json/custom/v1/products/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    })
    .then(product => {
        document.getElementById("product-skeleton").style.display = "none";

      // Show and fill product image
      const imgEl = document.getElementById("product-image");
      imgEl.src = product.image;
      imgEl.alt = product.title;
      imgEl.style.display = "block";

      // Set title
      const titleEl = document.getElementById("product-title");
      titleEl.textContent = product.title;
      titleEl.style.display = "block";

      // Set price
      const priceEl = document.getElementById("product-price");
      priceEl.textContent = `${product.price} €`;

      // Show old price if different
      const oldPriceEl = document.getElementById("product-old-price");
      if (product.price !== product.regular_price) {
        oldPriceEl.textContent = `${product.regular_price} €`;
        oldPriceEl.style.display = "block";
      } else {
        oldPriceEl.style.display = "none";
      }

      // Set description
      const detailsEl = document.getElementById("product-details");
      detailsEl.innerHTML = product.description;

      // (Optional) Add to cart logic
      document.getElementById("add-to-cart").addEventListener("click", () => {
        alert(`Produit "${product.title}" ajouté au panier.`);
        // You can later hook this into real cart logic
      });
    })
    .catch(err => {
        document.getElementById("product-skeleton").style.display = "none";

      document.getElementById("product-details").innerHTML = `<p>${err.message}</p>`;
    });
});
