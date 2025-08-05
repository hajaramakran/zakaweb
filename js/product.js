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
      // ✅ Update individual elements
      document.getElementById("product-title").innerText = product.title;
      document.getElementById("product-price").innerHTML = `
        ${product.price} €
        ${product.price !== product.regular_price ? `<span style="text-decoration: line-through; color: gray; margin-left: 10px;">${product.regular_price} €</span>` : ''}
      `;
      document.getElementById("product-image").src = product.image;
      document.getElementById("product-image").style.display = 'block';
      document.getElementById("product-details").innerHTML = product.description;
    })
    .catch(err => {
      document.getElementById("product-details").innerHTML = `<p>${err.message}</p>`;
    });
});
