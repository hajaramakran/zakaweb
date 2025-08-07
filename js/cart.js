  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const cartOffcanvas = document.getElementById('cartOffcanvas');
  const closeCart = document.getElementById('closeCart');

  cartToggleBtn.addEventListener('click', () => {
    cartOffcanvas.classList.toggle('active');
  });

  closeCart.addEventListener('click', () => {
    cartOffcanvas.classList.remove('active');
  });

  // Optional: close when clicking outside
  window.addEventListener('click', (e) => {
    if (!cartOffcanvas.contains(e.target) && !cartToggleBtn.contains(e.target)) {
      cartOffcanvas.classList.remove('active');
    }
  });
