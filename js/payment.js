document.addEventListener("DOMContentLoaded", () => {

    $('#payment-form').on('submit', function (e) {
        e.preventDefault();

        const $btn = $('#payment-btn');
        const $spinner = $('#submit-spinner');
        $spinner.removeClass('d-none');
        $btn.prop('disabled', true);
        console.log($(this).serialize());
       /*  $.ajax({
        url: 'https://bisque-chinchilla-962517.hostingersite.com/wp-json/myapi/v1/user-submit',
        type: 'POST',
        data: $(this).serialize(),
        success: function (response) {
            alert('Form submitted successfully!');
        },
        error: function () {
            alert('Error submitting form.');
        },
        complete: function () {
            $spinner.addClass('d-none');
            $btn.prop('disabled', false);
        }
        }); */
  });
});