$( document ).ready(function() {
   // Header Fix
	$(window).scroll(function () {
    var height = $(window).scrollTop();

    if (height > 60) {
        $('.header').addClass('header-small');
    }
    else if (height == 0) {
        $('.header').removeClass('header-small');
    } });
	
	// Diamond
	 $(".diamondservice").diamonds({
    size: 150,
    gap: 5 
});
// Layer Slider
	jQuery("#layerslider").layerSlider({
			pauseOnHover: false,
			responsive : true,
			responsiveUnder : 767,
			skinsPath: 'css/skins/'
		});
		// Owl
		$('.testimonials').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
	dots:true,
	nav:false,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:2,
        },
        1000:{
            items:4,
        }
    }
})
});