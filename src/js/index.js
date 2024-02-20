import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui'
import 'jquery-ui/ui/effect';
import 'jquery-ui/ui/widgets/tabs';
import 'bootstrap';
import 'popper.js';
import Parallax from "parallax-js";
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
    // ParallaxJS
    if ($('#scene').length) {
        const scene = document.getElementById('scene');
        const parallaxInstance = new Parallax(scene);
    }

    // Tabs
    if ($('#tabs').length) {
        $('#tabs').tabs({
            show: {
                effect: 'fadeIn',
                duration: 300,
            },
            hide: {
                effect: 'fadeOut',
                duration: 300,
            },
        });
    }

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
    const congratsModal = $('#congrats');
    const registrationModal = $('#registration');
    const congratsBtn = $('#congrats_button');

    btnSpin.on('click', function () {
        if (!wheel.hasClass('step-2')) {
            wheel.addClass('step-1');

            setTimeout(function () {
                congratsModal.modal({
                    backdrop: 'static',
                    show: true,
                });
            }, 4000);
        }
        else {
            registrationModal.modal('show');
        }
    });

    congratsBtn.on('click', function () {
        congratsModal.modal('hide');
        wheel.toggleClass('step-1 step-2');

        setTimeout(function () {
            congratsModal.modal('hide');
            registrationModal.modal({
                backdrop: 'static',
                show: true,
            });
        }, 4000);
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

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});