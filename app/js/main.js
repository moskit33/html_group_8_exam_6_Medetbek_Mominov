$(document).ready(function(){
    $(".list__item a").on("click", function(event) {
        event.preventDefault();
        var id  = $(this).attr('href');

        var top = $(id).offset().top;

        $('body,html').animate({scrollTop: top}, 1000);
    });

    $('.promo__slider').slick({
        dots: true,
        infinite: true,
        speed: 300

    });




});