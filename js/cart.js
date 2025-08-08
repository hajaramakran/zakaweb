// ==================== CART HANDLING ====================

// Load and render cart
function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Elements for cart display
  const cartList = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const orderTotalPrice = document.getElementById('orderTotalPrice');
  const orderTotalPriceBottom = document.getElementById('orderTotalPriceBottom');

  if (cartList) {
    cartList.innerHTML = ''; // Clear previous items
    let total = 0;

    cartItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-item-container">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${(item.price * item.quantity).toFixed(2)}€</div>
          </div>
        </div>
        <button class="remove-btn" data-index="${index}">
          <i class="zmdi zmdi-delete"></i>
        </button>
      `;
      cartList.appendChild(li);
      total += item.price * item.quantity;
    });

    // Update totals if on checkout page
    if (orderTotalPrice) {
      orderTotalPrice.textContent = `${total.toFixed(2)}€`;
    }
    if (orderTotalPriceBottom) {
      orderTotalPriceBottom.innerHTML = `${total.toFixed(2)}€`;
    }
  }

  // Update badge in header if it exists
  if (cartCount) {
    cartCount.textContent = cartItems.length;
    cartCount.classList.add('animate-badge');
    setTimeout(() => cartCount.classList.remove('animate-badge'), 300);
  }

  // Handle checkout button state if it exists
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
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
}


// Load cart on page load (works for checkout page too)
document.addEventListener('DOMContentLoaded', loadCart);

// Open cart offcanvas
const cartToggleBtn = document.getElementById('cartToggleBtn');
if (cartToggleBtn) {
  cartToggleBtn.addEventListener('click', () => {
    document.getElementById('cartOffcanvas').classList.add('open');
    loadCart();
  });
}

// Close cart offcanvas
const closeCart = document.getElementById('closeCart');
if (closeCart) {
  closeCart.addEventListener('click', () => {
    document.getElementById('cartOffcanvas').classList.remove('open');
  });
}

// Remove item from cart (works for both checkout page & offcanvas)
document.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('.remove-btn');
  if (removeBtn) {
    const index = removeBtn.dataset.index;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
});
