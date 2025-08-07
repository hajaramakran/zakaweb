  // Sample cart structure in localStorage: [{ id: 1, name: "Item 1", quantity: 2 }, ...]
  function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    cartList.innerHTML = ''; // Clear previous items

    cartItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        ${item.name} x${item.quantity}
        <button class="remove-btn" data-index="${index}">Supprimer</button>
      `;
      cartList.appendChild(li);
    });

    // Update badge with animation
    cartCount.textContent = cartItems.length;
    cartCount.classList.add('animate-badge');
    setTimeout(() => cartCount.classList.remove('animate-badge'), 300);

    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cartItems.length === 0) {
      checkoutBtn.classList.add('disabled');
      checkoutBtn.setAttribute('aria-disabled', 'true');
      checkoutBtn.tabIndex = -1;
    } else {
      checkoutBtn.classList.remove('disabled');
      checkoutBtn.removeAttribute('aria-disabled');
      checkoutBtn.tabIndex = 0;
    }
  }

  // Open cart
  document.getElementById('cartToggleBtn').addEventListener('click', () => {
    document.getElementById('cartOffcanvas').classList.add('open');
    loadCart();
  });

  // Close cart
  document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartOffcanvas').classList.remove('open');
  });

  // Delegate remove click
  document.getElementById('cartItems').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.dataset.index;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
    }
  });

  // Load cart on page load
  window.addEventListener('DOMContentLoaded', loadCart);
