document.addEventListener("DOMContentLoaded", () => {

    $('#payment-form').on('submit', function (e) {
        e.preventDefault();

        const $btn = $('#payment-btn');
        const $spinner = $('#submit-spinner');
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cartItems);
        $spinner.removeClass('d-none');
        $btn.prop('disabled', true);

        // Convert form data to object
        const formArray = $(this).serializeArray();
        let userData = {};
        formArray.forEach(field => {
            userData[field.name] = field.value;
        });

        // Extract only product ID & quantity
        let productsData = {};
        cartItems.forEach(item => {
            productsData[item.id] = item.quantity;
        });

        // Prepare payload
        let payload = {
            cart: productsData,
            userData: userData
        };
console.log(payload);
        $.ajax({
            url: 'https://bisque-chinchilla-962517.hostingersite.com/wp-json/myapi/v1/order-submit',
            type: 'POST',
            contentType: 'application/json', // correct way in jQuery
            data: JSON.stringify(payload),
            success: function (response) {
                //alert('Order submitted! Reference: ' + response.order_reference);
                console.log(response);
                window.location.href = '/thank-you.html?ref=' + encodeURIComponent(response.order_reference);

            },
            error: function () {
                alert('Error submitting form.');
            },
            complete: function () {
                $spinner.addClass('d-none');
                $btn.prop('disabled', false);
            }
        });
    });

});
