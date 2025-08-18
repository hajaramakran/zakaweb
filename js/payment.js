document.addEventListener("DOMContentLoaded", () => {

    $('#payment-form').on('submit', function (e) {
        e.preventDefault();

        const $btn = $('#payment-btn');
        const $spinner = $('#submit-spinner');
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        $spinner.removeClass('d-none');
        $btn.prop('disabled', true);

        // Convert form data to object
        const formArray = $(this).serializeArray();
        let userData = {};
        formArray.forEach(field => {
            userData[field.name] = field.value;
        });

         // Combine phone code + phone
        const phoneCode = $('#phoneCode').val() || '';
        const phoneNumber = $('#phone').val() || '';
        userData['phone'] = phoneCode + phoneNumber;  // overwrite phone with full number


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

    const phoneCodes = {
        AL: '+355', DZ: '+213', AD: '+376', AO: '+244', AI: '+1-264', AG: '+1-268',
        AR: '+54', AM: '+374', AW: '+297', AU: '+61', AT: '+43', AZ: '+994',
        BS: '+1-242', BH: '+973', BB: '+1-246', BE: '+32', BZ: '+501', BJ: '+229',
        BM: '+1-441', BT: '+975', BO: '+591', BA: '+387', BW: '+267', BR: '+55',
        VG: '+1-284', BN: '+673', BG: '+359', BF: '+226', BI: '+257', KH: '+855',
        CM: '+237', CA: '+1', CV: '+238', KY: '+1-345', TD: '+235', CL: '+56',
        CN: '+86', CO: '+57', KM: '+269', CG: '+242', CD: '+243', CK: '+682',
        CR: '+506', CI: '+225', HR: '+385', CY: '+357', CZ: '+420', DK: '+45',
        DJ: '+253', DM: '+1-767', DO: '+1-809', EC: '+593', EG: '+20', SV: '+503',
        ER: '+291', EE: '+372', ET: '+251', FK: '+500', FO: '+298', FJ: '+679',
        FI: '+358', FR: '+33', GF: '+594', PF: '+689', GA: '+241', GM: '+220',
        GE: '+995', DE: '+49', GI: '+350', GR: '+30', GL: '+299', GD: '+1-473',
        GP: '+590', GT: '+502', GN: '+224', GW: '+245', GY: '+592', HN: '+504',
        HK: '+852', HU: '+36', IS: '+354', IN: '+91', ID: '+62', IE: '+353',
        IL: '+972', IT: '+39', JM: '+1-876', JP: '+81', JO: '+962', KZ: '+7',
        KE: '+254', KI: '+686', KW: '+965', KG: '+996', LA: '+856', LV: '+371',
        LS: '+266', LI: '+423', LT: '+370', LU: '+352', MK: '+389', MG: '+261',
        MW: '+265', MY: '+60', MV: '+960', ML: '+223', MT: '+356', MH: '+692',
        MQ: '+596', MR: '+222', MU: '+230', YT: '+262', MX: '+52', FM: '+691',
        MD: '+373', MC: '+377', MN: '+976', ME: '+382', MS: '+1-664', MA: '+212',
        MZ: '+258', NA: '+264', NR: '+674', NP: '+977', NL: '+31', NC: '+687',
        NZ: '+64', NI: '+505', NE: '+227', NG: '+234', NU: '+683', NF: '+672',
        NO: '+47', OM: '+968', PW: '+680', PA: '+507', PG: '+675', PY: '+595',
        PE: '+51', PH: '+63', PN: '+64', PL: '+48', PT: '+351', QA: '+974',
        RE: '+262', RO: '+40', RW: '+250', WS: '+685', SM: '+378', ST: '+239',
        SA: '+966', SN: '+221', RS: '+381', SC: '+248', SL: '+232', SG: '+65',
        SK: '+421', SI: '+386', SB: '+677', SO: '+252', ZA: '+27', KR: '+82',
        ES: '+34', LK: '+94', SH: '+290', KN: '+1-869', LC: '+1-758', PM: '+508',
        VC: '+1-784', SR: '+597', SJ: '+47', SZ: '+268', SE: '+46', CH: '+41',
        TW: '+886', TJ: '+992', TZ: '+255', TH: '+66', TG: '+228', TO: '+676',
        TT: '+1-868', TN: '+216', TM: '+993', TC: '+1-649', TV: '+688', UG: '+256',
        UA: '+380', AE: '+971', GB: '+44', US: '+1', UY: '+598', VU: '+678',
        VA: '+379', VE: '+58', VN: '+84', WF: '+681', YE: '+967', ZM: '+260',
        ZW: '+263'
    };

    const countrySelect = document.getElementById('country');
    const phoneCodeInput = document.getElementById('phoneCode');
    const phoneInput = document.getElementById('phone');

    countrySelect.addEventListener('change', function() {
        const code = phoneCodes[this.value] || '';
        phoneCodeInput.value = code;
    });
});
