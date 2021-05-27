$(document).ready(function () {

    $('#reg').click(function (e) {
        e.preventDefault();
        $('.register_form').removeClass('dnone');
        $('.register_form').addClass('dblock');
        $('.img_r').removeClass('dnone');
        $('.img_r').addClass('dblock');

        $('.login_form').removeClass('dblock');
        $('.login_form').addClass('dnone');
        $('.img_l').removeClass('dblock');
        $('.img_l').addClass('dnone');
    });
});