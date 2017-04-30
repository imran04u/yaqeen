  jQuery(document).ready(function( $ ) {
    
   
   $(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 100) {
      $('.header').addClass('header-fixed');
    }
    else if (height < 99) {
      $('.header').removeClass('header-fixed');
    }
  });


 });