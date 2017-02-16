$(document).ready(function(){
    jQuery('#bx1').bxSlider();

    jQuery('#bx2').bxSlider({
        hideControlOnEnd: true,
        captions: true,
        pager: false
    })

    jQuery('#bx3').bxSlider({
        hideControlOnEnd: true,
        minSlides: 3,
        maxSlides: 3,
        slideWidth: 360,
        slideMargin: 10,
        pager: false,
        nextSelector: '#bx-next',
        prevSelector: '#bx-prev',
        nextText: '>',
        prevText: '<'
      })

    jQuery('#bx4').bxSlider({
        hideControlOnEnd: true,
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 360,
        slideMargin: 10,
        pager: false,
        nextSelector: '#bx-next4',
        prevSelector: '#bx-prev4',
        nextText: '>',
        prevText: '<',
    })

    jQuery('#bx5').bxSlider({
        minSlides: 2,
        maxSlides: 3,
        slideWidth: 360,
        slideMargin: 10,
        pager: false,
        ticker: true,
        speed: 12000,
        tickerHover: true,
        useCSS: false
    })
});
