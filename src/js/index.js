import '../scss/main.scss';
import $ from 'jquery';
import 'jquery-ui'
import 'jquery-ui/ui/effect';
import 'bootstrap';
import 'popper.js';
import intlTelInput from 'intl-tel-input';

$(window).on('load', function () {
    let b = $('body');
    let pw = $('.preload-wrapper');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    pw.fadeOut(300);
});

$(function () {
    // intl-tel-input
    if ($('#phone').length) {
        let input = document.querySelector("#phone");
        let iti = intlTelInput(input, {
            separateDialCode: true,
            showSelectedDialCode: true,
            utilsScript: "../../node_modules/intl-tel-input/build/js/utils.js",
            initialCountry: "in",
        });

        // Обработчик события изменения страны
        iti.promise.then(function () {
            $("#countryCode").val(iti.getSelectedCountryData().dialCode);
        });

        // Обработчик события изменения телефонного номера
        input.addEventListener("change", function () {
            $("#countryCode").val(iti.getSelectedCountryData().dialCode);
        });
    }

    // wheel&modals
    const wheel = $('.wheel-section__wheel-circle img');
    const btnSpin = $('#button');
    const registrationModal = $('#registration');
    const txtCounter = $('.wheel-section__attempt-counter');
    let counter = btnSpin.data('counter');

    btnSpin.on('click', function () {
        if (counter !== 0) {
            counter--
        }
        if (!wheel.hasClass('step-1') && !wheel.hasClass('step-2')) {
            wheel.addClass('step-1');
            btnSpin.attr('data-counter', counter);
            txtCounter.attr('data-counter', counter);
        }
        else if (wheel.hasClass('step-1')) {
            wheel.toggleClass('step-1 step-2');
            btnSpin.attr('data-counter', counter);
            txtCounter.attr('data-counter', counter);

            setTimeout(function () {
                registrationModal.modal({
                    backdrop: 'static',
                    show: true,
                });
            }, 4000);
        }
        else {
            registrationModal.modal('show');
        }
    });

    // Password switch
    const passBtn = document.querySelector('.form-button-pass');
    let inputs = document.querySelectorAll('input[type="password"]');
    passBtn.addEventListener('click', function () {
        if (inputs[0].type === 'password') {
            inputs.forEach(function(input) {
                input.type = 'text';
            });
            this.innerHTML = '<svg><use xlink:href="img/spritemap.svg#sprite-pass-hidden"></use></svg>';
        }
        else {
            inputs.forEach(function(input) {
                input.type = 'password';
            });
            this.innerHTML = '<svg><use xlink:href="img/spritemap.svg#sprite-pass-visible"></use></svg>';
        }
    });
});