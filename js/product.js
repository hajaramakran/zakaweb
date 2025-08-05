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
      document.getElementById("product-details").innerHTML = `
        <div class="product-info">
          <h1>${product.title}</h1>
          <img src="${product.image}" alt="${product.title}" style="max-width:300px" />
          <p><strong>Price:</strong> ${product.price} €</p>
          ${product.price !== product.regular_price ? `<p><del>${product.regular_price} €</del></p>` : ''}
          <div>${product.description}</div>
          <br>
          <a href="index.html">← Back to products</a>
        </div>
      `;
    })
    .catch(err => {
      document.getElementById("product-details").innerHTML = `<p>${err.message}</p>`;
    });
});
