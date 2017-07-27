 (function($) {
     
    'use strict';
    
    /**
    * =====================================
    * Function for windows height and width      
    * =====================================
    **/
    function windowSize( el ) {
      var result = 0;
        if("height" == el)
          result = window.innerHeight ? window.innerHeight : $(window).height();
        if("width" == el)
          result = window.innerWidth ? window.innerWidth : $(window).width();
    
        return result; 
    }
    
    /**
    * =============================================
    * Preloader INIT
    * =============================================
    */
       $('body').jpreLoader({
           preMainSection:     '#main-preloader',
           prePerText:         '.preloader-percentage-text',
           preBar:             '.preloader-bar',
       });
       
       
        
    jQuery(document).on('ready', function () {
        
    /**
    * =====================================
    * FULL PAGE      
    * =====================================
    */    
    
    if( windowSize( 'width' ) > 991 ) var scrollOverflow = true;
    else var scrollOverflow = false;
        
    $('#fullpage').fullpage({
        scrollOverflow: scrollOverflow,
        fitToSection: true,
        resize : true,
        scrollingSpeed: 700,
        scrollBar: true,
        showActiveTooltip: true,
        responsiveWidth: 992
    }); 

    
         
    /**
     * =======================================
     * Mobile navigation style
     * =======================================
     */
    
    var trigger = $('.navbar-toggle'),
    overlay     = $('.overlay'),
    active      = false;
    
    $('.navbar-toggle, #navbar-nav li a, .overlay').on('click', function () {
        $('.navbar-toggle').toggleClass('active')
        $('#js-navbar-menu').toggleClass('active');
        overlay.toggleClass('active');
    });  

    
        
    /**
    * =====================================
    * Skills    
    * =====================================
    */   
        $(".determinate").each(function(){
          var width = $(this).text();
          $(this).css("width", width)
            .empty()
            .append('<i class="fa"></i>');                
        });    
        
    
        
    /**
    * =====================================
    * Steller      
    * =====================================
    */  
        $.stellar({
            horizontalScrolling: true
        });
        
        
        $('.scene').parallax();
        
    /**
    * =====================================
    * Animation      
    * =====================================
    */
        new WOW().init(); 
        
        
   

    /**
    * =====================================
    * Portfolio     
    * =====================================
    */
    
        $('.view-project-detail').on('click', function(event) {
            event.preventDefault();
            var href          = $(this).attr('href') + ' ' + $(this).attr('data-action'),
                dataShow      = $('#project-gallery-view'),
                dataShowMeta  = $('#project-gallery-view meta'),
                dataHide      = $('#project-gallery'),
                preLoader     = $('#loader'),
                backBtn       = $('#back-button'),
                filterBtn     = $('#filter-button');
    
                dataHide.animate( { 'marginLeft':'-120%' }, { duration: 400, queue: false } );
                filterBtn.animate( { 'marginLeft':'-120%' }, { duration: 400, queue: false } );
                dataHide.fadeOut(400);
                filterBtn.fadeOut(400);
                setTimeout( function() { preLoader.show(); }, 400);
                setTimeout( function() {
                    dataShow.load( href, function() {
                    dataShowMeta.remove();
                    preLoader.hide();
                    dataShow.fadeIn(600);
                    backBtn.fadeIn(600);
                  });
            },800);
        });
    
        $('#back-button').on('click', function(event) {
          event.preventDefault();
          var dataShow    = $('#project-gallery'),
              dataHide    = $('#project-gallery-view'),
              filterBtn   = $('#filter-button');
        
          $("[data-animate]").each( function() {
              $(this).addClass($(this).attr('data-animate'));
          });
        
          dataHide.fadeOut(400);
          $(this).fadeOut(400);
          setTimeout(function(){
              dataShow.animate( { 'marginLeft': '0' }, { duration: 400, queue: false } );
              filterBtn.animate( { 'marginLeft': '0' }, { duration: 400, queue: false } );
              dataShow.fadeIn(400);
              filterBtn.fadeIn(400);
          },400);
          setTimeout(function(){
              dataShow.find('.fadeInRight, .fadeInLeft, .fadeInUp, .fadeInDown').removeClass('fadeInRight').removeClass('fadeInLeft').removeClass('fadeInUp').removeClass('fadeInDown');
          },1500);
        });
        
    /**
    * =====================================
    * EXPERIENCE
    * =====================================
    */   
        
        $('.content-slider .click').on('click', function(event) {
            event.preventDefault();
            var parentPosition = $(this).closest('.content-slider'),
              actionPosition = $(this).attr('data-click-for');
            
            parentPosition.find('.active').removeClass('active');
            $(this).addClass('active');
            parentPosition.find(actionPosition).addClass('active');
        });
        
        
    }); 

} (jQuery) );
