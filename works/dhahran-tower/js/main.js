jQuery(document).ready(function($){
	var slidesWrapper = $('.cd-hero-slider');

	//check if a .cd-hero-slider exists in the DOM 
	if ( slidesWrapper.length > 0 ) {
		var primaryNav = $('.cd-primary-nav'),
			sliderNav = $('.cd-slider-nav'),
			navigationMarker = $('.cd-marker'),
			slidesNumber = slidesWrapper.children('li').length,
			visibleSlidePosition = 0,
			autoPlayId,
			autoPlayDelay = 5000;

		//upload videos (if not on mobile devices)
		uploadVideo(slidesWrapper);

		//autoplay slider
		setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

		//on mobile - open/close primary navigation clicking/tapping the menu icon
		primaryNav.on('click', function(event){
			if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
		});
		
		//change visible slide
		sliderNav.on('click', 'li', function(event){
			event.preventDefault();
			var selectedItem = $(this);
			if(!selectedItem.hasClass('selected')) {
				// if it's not already selected
				var selectedPosition = selectedItem.index(),
					activePosition = slidesWrapper.find('li.selected').index();
				
				if( activePosition < selectedPosition) {
					nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
				} else {
					prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
				}

				//this is used for the autoplay
				visibleSlidePosition = selectedPosition;

				updateSliderNavigation(sliderNav, selectedPosition);
				updateNavigationMarker(navigationMarker, selectedPosition+1);
				//reset autoplay
				setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
			}
		});
	}

	function nextSlide(visibleSlide, container, pagination, n){
		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
		checkVideo(visibleSlide, container, n);
	}

	function prevSlide(visibleSlide, container, pagination, n){
		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
		checkVideo(visibleSlide, container, n);
	}

	function updateSliderNavigation(pagination, n) {
		var navigationDot = pagination.find('.selected');
		navigationDot.removeClass('selected');
		pagination.find('li').eq(n).addClass('selected');
	}

	function setAutoplay(wrapper, length, delay) {
		if(wrapper.hasClass('autoplay')) {
			clearInterval(autoPlayId);
			autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);
		}
	}

	function autoplaySlider(length) {
		if( visibleSlidePosition < length - 1) {
			nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
			visibleSlidePosition +=1;
		} else {
			prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
			visibleSlidePosition = 0;
		}
		updateNavigationMarker(navigationMarker, visibleSlidePosition+1);
		updateSliderNavigation(sliderNav, visibleSlidePosition);
	}

	function uploadVideo(container) {
		container.find('.cd-bg-video-wrapper').each(function(){
			var videoWrapper = $(this);
			if( videoWrapper.is(':visible') ) {
				// if visible - we are not on a mobile device 
				var	videoUrl = videoWrapper.data('video'),
					video = $('<video loop><source src="'+videoUrl+'.mp4" type="video/mp4" /><source src="'+videoUrl+'.webm" type="video/webm" /></video>');
				video.appendTo(videoWrapper);
				// play video if first slide
				if(videoWrapper.parent('.cd-bg-video.selected').length > 0) video.get(0).play();
			}
		});
	}

	function checkVideo(hiddenSlide, container, n) {
		//check if a video outside the viewport is playing - if yes, pause it
		var hiddenVideo = hiddenSlide.find('video');
		if( hiddenVideo.length > 0 ) hiddenVideo.get(0).pause();

		//check if the select slide contains a video element - if yes, play the video
		var visibleVideo = container.children('li').eq(n).find('video');
		if( visibleVideo.length > 0 ) visibleVideo.get(0).play();
	}

	function updateNavigationMarker(marker, n) {
		marker.removeClassPrefix('item').addClass('item-'+n);
	}

	$.fn.removeClassPrefix = function(prefix) {
		//remove all classes starting with 'prefix'
	    this.each(function(i, el) {
	        var classes = el.className.split(" ").filter(function(c) {
	            return c.lastIndexOf(prefix, 0) !== 0;
	        });
	        el.className = $.trim(classes.join(" "));
	    });
	    return this;
	};
});


/*	 $(document).ready(function() {

			function initialization(){
				$('#myContainer').fullpage({
					//sectionsColor: ['#4A6FB1', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
					anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
					resize: false,
					animateAnchor:false,
					scrollOverflow: true,
					autoScrolling:true,
					responsive: 900,
					fitSection: false,
					menu: '#menu',
					navigation:true,
					continuousVertical:true,
					paddingTop: '20px',
					css3: true,
					onLeave: function(index, nextIndex, direction){
						console.log("onLeave--" + "index: " + index + " nextIndex: " + nextIndex + " direction: " +  direction);
					},
					afterLoad: function(anchorLink, index){
						console.log("afterLoad--" + "anchorLink: " + anchorLink + " index: " + index );
					},
					afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
						console.log("afterSlideLoad--" + "anchorLink: " + anchorLink + " index: " + index + " slideAnchor: " + slideAnchor + " slideIndex: " + slideIndex);
					},
					onSlideLeave: function(anchorLink, index, slideIndex, direction){
						console.log("onSlideLeave--" + "anchorLink: " + anchorLink + " index: " + index + " slideIndex: " + slideIndex + " direction: " + direction);
					},
					afterRender: function(){
						console.log("afterRender");
					},
					afterResize: function(){
						console.log("afterResize");
					}
				});
			}

			//fullPage.js initialization
			initialization();


			$('#moveSectionUp').click(function(e){
				e.preventDefault();
				$.fn.fullpage.moveSectionUp();
			});

			$('#moveSectionDown').click(function(e){
				e.preventDefault();
				$.fn.fullpage.moveSectionDown();
			});

			$('#moveTo').click(function(e){
				e.preventDefault();
				$.fn.fullpage.moveTo(2, 3);
			});

			$('#silentMoveTo').click(function(e){
				e.preventDefault();
				$.fn.fullpage.silentMoveTo(2);
			});

			$('#silentMoveToSlide').click(function(e){
				e.preventDefault();
				$.fn.fullpage.silentMoveTo(2, 3);
			});

			$('#moveSlideRight').click(function(e){
				e.preventDefault();
				$.fn.fullpage.moveSlideRight();
			});

			$('#moveSlideLeft').click(function(e){
				e.preventDefault();
				$.fn.fullpage.moveSlideLeft();
			});

			$('#setAutoScrollingFalse').click(function(e){
				e.preventDefault();
				$.fn.fullpage.setAutoScrolling(false);
			});

			$('#setAutoScrollingTrue').click(function(e){
				e.preventDefault();
				$.fn.fullpage.setAutoScrolling(true);
			});

			$('#setAllowScrollingFalse').click(function(e){
				e.preventDefault();
				$.fn.fullpage.setAllowScrolling(false);
			});

			$('#setAllowScrollingTrue').click(function(e){
				e.preventDefault();
				$.fn.fullpage.setAllowScrolling(true);
			});

			$('#setKeyboardScrollingFalse').click(function(e){
				e.preventDefault();
				$.fn.fullpage.setKeyboardScrolling(false);
			});

			$('#setKeyboardScrollingTrue').click(function(e){
				e.preventDefault();
				$.fn.fullpage.setKeyboardScrolling(true);
			});

			$('#setScrollingSpeed1500').click(function(e){
				e.preventDefault();
				$.fn.fullpage.setScrollingSpeed(2500);
			});

			$('#setScrollingSpeed700').click(function(e){
				e.preventDefault();
				$.fn.fullpage.setScrollingSpeed(700);
			});

			$('#destroy').click(function(e){
				e.preventDefault();
				$.fn.fullpage.destroy('all');
			});

			$('#undestroy').click(function(e){
				e.preventDefault();

				//fullPage.js initialization
				initialization();
			});

			$('#reBuild').click(function(e){
				e.preventDefault();
				$.fn.fullpage.reBuild();
			});

			$('#setLockAnchorsTrue').click(function(e){
				e.preventDefault;
				$.fn.fullpage.setLockAnchors(true);
			});

			$('#setLockAnchorsFalse').click(function(e){
				e.preventDefault;
				$.fn.fullpage.setLockAnchors(false);
			});
		});*/
		
		//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
