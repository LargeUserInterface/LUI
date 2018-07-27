/* ALL THE SCRIPTS BELOW THIS LINE ARE MADE BY RUBENBRISTIAN.COM AND ARE LICENSED UNDER ENVATO'S REGULAR/EXTENDED LICENSE --- REDISTRIBUTION IS NOT ALLOWED! */

(function($) {

    $(document).ready(function(){

        "use strict";

        $('body').append('<div id="mobileCheck"></div>');

/* ----------------------------------------------------
---------- !! GENERAL STUFF !! -----------------
------------------------------------------------------- */

	var $html = $('html'),
        $body = $('body'),
        $menu = $('#menu'),
        $sidebar = $('#sidebar'),
		$topFooter = $('#topFooter'),
		$bottomFooter = $('#bottomFooter'),
        $footer = $('.footer'),
		$content = $('#content > div'),
		$close = $('#close'),
		$rightFooter = $('#topFooter div.right'),
		$supersized = $('#supersizedControls'),
		$loader = $('#loader'),
		$fSlide = $('.page-template-template-slideshow-php section.galleryContent'),

        $mobileCheck = $('#mobileCheck'),
        mobileIs = $mobileCheck.css('display') == 'block' ? true : false,

        fPad = 140,
        topJump = 0,

        cssTransform = window.webkitRequestAnimationFrame != undefined ? '-webkit-transform' : 'transform',
		touchM = "ontouchstart" in window;

        if(touchM){
            $body.removeClass('no-touch');
        }

        if(!$body.hasClass('openedSkie')){
        	$close.addClass('openIcon');
        }

    /* -------------------------------
    -----   Sidebar  -----
    ---------------------------------*/

    var sidebarOpened = true,
    	autoCloseSidebar = $body.hasClass('Stick') ? false : true,
    	autoCloseI = null,

        fixedSidebar = $body.hasClass('Stick') ? true : false,
        fixedSidebarWidth = 280,

    	sidebarEaseIn = 'easeOutQuart',
        sidebarTimeIn = .6,
        sidebarEaseOut = 'easeOutQuint',
        sidebarTimeOut = .7;

	// This function closes the sidebar and save the state in the cookie

	function closeSidebar(){

		$.cookie('sidebar_cookie_2', 'closed', {expires:7, path: '/'});
		$close.addClass('openIcon');

		if(!mobileIs){

			TweenMax.to($('#content')[0],
			 	sidebarTimeOut, 
				{
					x: 0, 
					ease: sidebarEaseOut, 
					overwrite: 'all'
				}
			);

			TweenMax.to([$supersized[0], $fSlide[0]],
			 	sidebarTimeOut, 
				{
					x: 0, 
					ease: sidebarEaseOut, 
					overwrite: 'all'
				}
			);

			TweenMax.to([$sidebar[0]],
			 	sidebarTimeOut, 
				{
					x: -270, 
					ease: sidebarEaseOut, 
					overwrite: 'all'
				}
			);

		}

		setTimeout(function(){
			sidebarOpened = false;
		}, 600);

	}

	// This function opens the sidebar - pretty much the opposite of the above

	function openSidebar(){

		$close.removeClass('openIcon');
		$.cookie('sidebar_cookie_2', 'opened', {expires:7, path: '/'});

		if(!mobileIs){

			TweenMax.to($('#content')[0],
			 	sidebarTimeOut, 
				{
					x: 280, 
					ease: sidebarEaseOut, 
					overwrite: 'all'
				}
			);

			TweenMax.to([$supersized[0], $fSlide[0]],
			 	sidebarTimeOut, 
				{
					x: 280, 
					ease: sidebarEaseOut, 
					overwrite: 'all'
				}
			);

			TweenMax.to([$sidebar[0]],
			 	sidebarTimeOut, 
				{
					x: 0, 
					ease: sidebarEaseOut, 
					overwrite: 'all'
				}
			);

		}

		setTimeout(function(){
			sidebarOpened = true;
		}, 600);

	}

	// Initialize the sidebar autoclose feature - on mousemove event handler

	if(!autoCloseSidebar && !mobileIs) $fSlide.css('left', 280);

	if(!touchM && autoCloseSidebar) {

		$(window).on('mousemove', function(event){
            if(event.pageX < 20){
                openSidebar();
            } else if(event.pageX > 280) {
                closeSidebar();
            }
		});

	}

    // Some touch considerations

    var touchSidebar = false;

    if(touchM){

        $sidebar.swipe({

            swipe: function(e, dir){
            	
                if(dir == 'right' && mobileIs != true) {
                    openSidebar();
                    e.preventDefault();
                } else if (dir == 'left' && mobileIs != true){
                    closeSidebar();
                    e.preventDefault();
                }

            },

            treshold: 0

        }).find('#close').click(function(e){ 

            if($close.hasClass('openIcon')){
                openSidebar();
                e.preventDefault();
            } else {
                closeSidebar();
                e.preventDefault();
            }

        });

    } else {

    	$sidebar.find('#close').click(function(e){
    		e.preventDefault();
    	});

    }

    /* -------------------------------
    -----   Menu (responsive)  -----
    ---------------------------------*/

    var optionsString = '';

    $menu.children('.main-menu').children('li').each(function(){

        // Create responsive navigaton

        var $a = $(this).children('p').children('a');

        optionsString += '<option data-href="' + $a.prop('href') + '"' + ($a.hasClass('filter') ? ' data-filter="' + $a.data('filter') + '"' : '') + ($a.hasClass('all-filter') ? ' class="all-filter"' : '') + ($a.prop('target') == 'blank' ? ' data-target="_blank"' : '') + '>' + $a.text() + '</option>';

        if($(this).hasClass('parent') && $(this).hasClass('selected')) {
            $(this).find('ul').find('a').each(function(){

                optionsString += '<option data-href="' + $(this).prop('href') + '"' + ($(this).hasClass('filter') ? ' data-filter="' + $(this).data('filter') + '"' : '') + ($(this).hasClass('all-filter') ? ' class="all-filter"' : '') + ($(this).prop('target') == 'blank' ? ' data-target="_blank"' : '') + '> -- ' + $(this).text() + '</option>';

            });

        }

    });

    $menu.append('<div class="responsive-menu"><select><option data-href="#">' + themeObjects.responsiveNavText + '</option>' + optionsString + '</select></div>');

    $('.responsive-menu').children('select').on('change', function(){

        var href = $(this).find('option:selected').data('href'),
            target = $(this).find('option:selected').data('target'),
            filter = $(this).find('option:selected').data('filter');

        if(filter != undefined) {

            var $this = $(this),
            	cacheSelected = $(this).find('option:selected');

            if($project != null){
                closeAndStay();
                setTimeout(function(){
                    sortFolio(cacheSelected);
                }, 500);
            } else {
                sortFolio(cacheSelected);
            }

        } else {
            if(target == undefined) {
                document.location.href = href;
            } else {
                window.open(href, '_blank');
            }
        }

    }).styledSelect({
        coverClass: 'responsive-design-cover',
        innerClass: 'responsive-design-inner'
    });
	
/* ----------------------------------------------------
---------- !! RESIZE !! -----------------
------------------------------------------------------- */

    // This first resize event is a general one (in comparison with the one below, which is dedicated for the portfolio pages)

    function resizeQueries(){

        if($mobileCheck.css('display') == 'block' && mobileIs != true){
            mobileIs = true;
            $(window).trigger('resize');
        } else if($mobileCheck.css('display') == 'none' && mobileIs == true){
            mobileIs = false;
            $(window).trigger('resize');
        }

    }

    $(window).on('resize', resizeQueries);

    // This function needs to be defined here (above the portfolio and the gallery scripts), since it will be used for both of them

    var iW, 
    	iH;

    // Gets the ratio based on the class

    if($('.get-ratio').hasClass('ratio_16-9')) {
        var imgRatio = [16, 9];
    } else if($('.get-ratio').hasClass('ratio_16-10')) {
        var imgRatio = [16, 10];
    } else if($('.get-ratio').hasClass('ratio_1-1')) {
        var imgRatio = [1, 1];
    } else {
        var imgRatio = [4, 3];
    }

    function resizeThumbs(){

        // Gets the window size

        var sW = $content.width()+3, 
            sH = $(window).height();

        $folioContainer.width(sW);

        // Calculates the new size of the thumbs based on initial width and ratio

        iW = Math.floor(sW/Math.ceil(sW/maxImgWidth));
        iH = Math.floor(iW/imgRatio[0]*imgRatio[1]);

        // Do the actual resize

        $folioItems.addClass('disable-resize')
            .width(iW)
            .height(iH);

        // If isotope is initialized, refresh items

        if($body.hasClass('is-portfolio') && $folioContainer.hasClass('isotope')) {
            $folioContainer.isotope();
        }

        // If a project is opened, configure the hover area

        if($project!=null){
            $projectHolder.height($(window).height()-fPad);
            $projectHover.height($projectHolder.outerHeight());
        }

        if($project!=null && projectType=='gallery'){
            $projectSlider.height($(window).height()-fPad);
        }

    }

/* ----------------------------------------------------
---------- !! THE PORTFOLIO GRID !! -----------------
------------------------------------------------------- */

    var singleOpened = false;

    /* -------------------------------
    -----   Portfolio Resizing   -----
    ---------------------------------*/

    var fsw = 0,
        firstModalQuery = true;

    function modalQuery(){

        var projectWidth = $project.data('project-width'),
            sliderWidth = $project.data('slider-width'),
            sliderHeight = $project.data('project-height'),
            modalQueryString = '';

        if(fixedSidebar){ 

            modalQueryString = '@media all and (min-width: ' + (projectWidth+fixedSidebarWidth+100) + 'px) { .swiper-container { width: ' + sliderWidth + 'px !important; height: ' + sliderHeight + 'px !important; } .project { margin-left: ' + (-(projectWidth-fixedSidebarWidth)/2) + 'px !important; } } @media all and (max-width: ' + (projectWidth+fixedSidebarWidth+100) + 'px) { #modal-holder { position: relative; padding: 160px 0; } .project { width: ' + sliderWidth + 'px !important; margin-left: -' + (sliderWidth/2) + 'px !important; height: auto !important; top: auto !important; margin-top: 0 !important; } .projectContent { width: 100% !important; } .nano > .nano-content { position: relative !important; padding: 0 !important; overflow: visible !important; } .openedP { height: 100% !important; padding: 155px 0 !important; min-height: none !important; } } @media all and (max-width: ' + (sliderWidth+fixedSidebarWidth) + 'px) { .project { width: 100% !important; margin-left: 0 !important; left: 0 !important; float: left; } .projectSlides, .swiper-container { width: 100% !important; } .swiper-container img { width: 100% !important; height: auto !important; top: 0 !important; left: 0 !important; } } @media all and (min-width: ' + (sliderWidth) + 'px) and (max-width: 980px) { #modal-holder { position: relative; padding: 160px 0; } .project { width: ' + sliderWidth + 'px !important; margin-left: -' + (sliderWidth/2) + 'px !important; height: auto !important; top: auto !important; margin-top: 0 !important; left: 50% !important; } .projectContent { width: 100% !important; } .nano > .nano-content { position: relative !important; padding: 0 !important; overflow: visible !important; } .openedP { height: 100% !important; padding: 155px 0 !important; min-height: none !important; } }';

        } else {

            modalQueryString = '@media all and (max-width: ' + (projectWidth+100) + 'px) { #modal-holder { position: relative; padding: 0; } .project { width: ' + sliderWidth + 'px !important; margin-left: -' + (sliderWidth/2) + 'px !important; height: auto !important; top: auto !important; margin-top: 0 !important; } .projectContent { width: 100% !important; } .nano > .nano-content { position: relative !important; padding: 0 !important; overflow: visible !important; } .openedP { height: 100% !important; padding: 155px 0 !important; min-height: none !important; } } @media all and (max-width: ' + (sliderWidth) + 'px) { .project { width: 100% !important; margin-left: 0 !important; left: 0 !important; float: left; } .projectSlides, .swiper-container { width: 100% !important; } .swiper-container img { width: 100% !important; height: auto !important; top: 0 !important; left: 0 !important; } }';

        }

        if(firstModalQuery) {

            firstModalQuery = false;
            $('head').append('<style id="modal-query" type="text/css">' + modalQueryString + '</style>');

        } else {
            $('#modal-query').html(modalQueryString);

        }

    }

    if($body.hasClass('is-portfolio')) {	

        /* -------------------------------
        -----   Variables  -----
        ---------------------------------*/

	    var $folioContainer = $('#portfolio'),
	    	$folioItems = $folioContainer.children('a.folioItem'),
	    	$projectHolder = $('#content > div'),
            $projectHolderNew = $('#modal-holder'),
	    	$projectHover = $('#projectHover'),
            $projectNav = $('.projectNav'),
	    	$btnNext = $projectNav.find('.btnNext'),
	    	$btnPrev = $projectNav.find('.btnPrev'),
	    	$btnClose = $projectNav.find('.btnClose'),

            $folioPagination = $('.blog-grid-nav').length > 0 ? $('.blog-grid-nav') : null,

            $selectedFilter = $menu.find('a.all-filter').parent().parent(),
            $initFilter = null,
            sortedFolio = null,

            firstProject = true,

            initHref = $folioContainer.data('url'),
            initTitle = document.title,
            historyChanged = false,

            // The project variables are empty on init except when we are already on the single page   

            $project = $('.project').length > 0 ? $('.project') : null,
            $projectSlider = $('.swiper-container').length > 0 ? $('.swiper-container') : ($('.project-modal').length > 0 ? $('.project-modal') : null),
            $projectContent = $('#project-content').length > 0 ? $('#project-content') : null,
            projectLoading = false,
            projectType = $project != null ? ( $project.data('gal') == 'yes' ? 'gallery' : 'folio' ) : ( $folioContainer.data('gal') == 'yes' ? 'gallery' : 'folio' ),
            projectHoverStyle = $folioContainer.data('hover'),

            // Other stuff

            maxImgWidth = parseInt(themeObjects.folioWidth),
            zI = 99;

        // Do this on single projects

        if($project!=null){

            // Close password protected projects

            if($project.find('#pwd').text() != ''){
                document.location.href = $project.data('parent');
            }

            // Append what's missing

            $('#content').append('<div id="projectHover" class="hasButtons"' + (projectType == 'folio' ? ' style="background-image:url(' + themeObjects.modalDummyBackground + ');"' : '') + '></div><div class="projectNav hasButtons"><a href="#" class="btnNext hoverBack">Next</a><a href="#" class="btnClose hoverBack">Close</a><a href="#" class="btnPrev hoverBack">Prev</a></div>');
            
            // Redefine variables

            $projectHover = $('#projectHover');
            $projectNav = $('.projectNav');
            $btnNext = $projectNav.find('.btnNext');
            $btnPrev = $projectNav.find('.btnPrev');
            $btnClose = $projectNav.find('.btnClose');

            // Setup buttons

            var $prevLink = $project.find('#nextProject a');
            var $nextLink = $project.find('#previousProject a');

            if($prevLink.length>0) {
                $btnPrev.removeClass('disabled').attr('href', $prevLink.attr('href')).data('title', $prevLink.text());
            } else {
                $btnPrev.addClass('disabled');
            }

            if($nextLink.length>0) {
                $btnNext.removeClass('disabled').attr('href', $nextLink.attr('href')).data('title',$nextLink.text());
            } else {
                $btnNext.addClass('disabled');
            }

            $project.find('.close').on('click', closeAndStay);

            // Continue setup

            singleOpened = true;

            $projectHolder.addClass('openedP');
            $projectHolder.parent().addClass('openedP2');
            $body.css('overflowY', 'scroll');

            $projectHolder.css('min-height', $project.data('project-height')+fPad+100);

            resizeThumbs();
            initFolioScripts();

        }

        // Continue with whatever needs to be done

		$folioItems.append('<span class="folioPlus"></span>');
        if(projectHoverStyle == 'style-1'){
		  $folioItems.append('<span class="folioShadow"></span>');
        }
		$folioItems.find('img').css('opacity', themeObjects.folioOpacity);

	    var sP = ($body.hasClass('admin-bar') ? 28 : 0);

	   // var itemWidth = iW = 360;
	   // var itemHeight = iH = 270;
	    var itemPadding = 70;


        // The code below checks the hashtag and opens a single project (if the case) in browsers which don't support the History API. Also, check for a category now.

        var category = checkInitCategory();

        if (!history.pushState){

            if(document.location.href.indexOf('#') > 0) {

                if(!category){
                    document.location.href = document.location.href.replace('#', '');
                }
            }

        }

        $selectedFilter.addClass('selected');

	   //var zI = 10, maxP = (itemWidth*itemHeight)*$folioItems.size(), firstProject = true, fSafe = true, fHash = true, byHash = false, oTitle = document.title, catArr = new Array(), sTop = 0;

        /* -------------------------------
        -----   Loading  -----
        ---------------------------------*/

        if($folioContainer.length > 0) {

            $folioContainer.imagesLoaded(function(){

                // When images are done loading, init the isotope plugin and set up it's options

                $folioContainer.isotope({
                    transformsEnabled: false,
                    animationEngine: 'jquery',
                    animationOptions: {
                        duration: 500,
                        easing: 'Quad.easeOut',
                        queue: false
                    },
                    getSortData: {
                        byFilter: function($elem){
                            return parseInt($($elem).data('custom-filter'));
                        }
                    },
                    hiddenStyle: {
                    	scale: 1,
                    	opacity: .1
                    },
                    resizable: false,
                    resizesContainer: true
                });

                // Run a sequence (delayed) animation on all thumbnails and apply the default opacity

                $folioItems.each(function(){
                    TweenMax.to($(this)[0], .1, {
                        opacity: 1,
                        delay: .1+$(this).index()*.05,
                        onCompleteScope: $(this), 
                        onComplete: function(){
                            $(this).removeClass('isotope-hidden');
                        }
                    });

                });

                if($initFilter != null) {
                    sortFolio($initFilter);
                }

                if($folioPagination != null) {
                    $folioPagination.delay(300).fadeIn(200);
                }

                // Remove the preloader, animate the sidebar into the screen then enable mouse hovering actions

                $loader.fadeOut(150, function(){
                    $body.removeClass('thumbs-loading');
                });

            });

        }

        // Attach resize event and trigger it once

        $(window).resize(function(){
            resizeThumbs();
        });

        resizeThumbs();

        /* -------------------------------
        -----   Hover  -----
        ---------------------------------*/

	    $folioItems.on('mouseenter', function(){

            var $this = $(this);
 			$this.css('zIndex', ++zI);

            setTimeout(function(){
                $this.addClass('hovered');
            }, 500);

            if(projectHoverStyle == 'style-1') {

                TweenMax.to($this.children('img')[0],
                    .4, 
                    {
                        y: -70, 
                        opacity: 1,
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.children('span.folioPlus')[0],
                    .3, 
                    {
                        y: -91,
                        opacity: 1, 
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.children('span.folioShadow')[0],
                    .4, 
                    {
                        y: -70,
                        opacity: 1, 
                        height: iH+140,
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.children('div.folioTextHolder')[0],
                    .3, 
                    {
                        y: 70,
                        height: 140,
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.find('div.folioText')[0],
                    .35, 
                    {
                        y: 0,
                        opacity: 1, 
                        ease: 'easeOutSine', 
                        overwrite: 'all'
                    }
                );

            } else {

                TweenMax.to($this.children('img')[0],
                    .3, 
                    {
                        opacity: 1,
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.children('span.folioPlus')[0],
                    .3, 
                    {
                        y: -iH/2-45,
                        opacity: 1, 
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.children('div.folioTextHolder')[0],
                    .3, 
                    {
                        opacity: 1,
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.find('div.folioText')[0],
                    .2, 
                    {
                        y: iH/2,
                        opacity: 1, 
                        ease: 'easeOutSine', 
                        overwrite: 'all'
                    }
                );

            }

	    }).on('mouseleave', function(){

            var $this = $(this);

            $(this).removeClass('hovered');

            if(projectHoverStyle == 'style-1') {

                TweenMax.to($this.children('img')[0],
                    .15, 
                    {
                        y: 0, 
                        opacity: themeObjects.folioOpacity,
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.children('span.folioPlus')[0],
                    .2, 
                    {
                        y: -50,
                        opacity: 0, 
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.children('div.folioTextHolder')[0],
                    .2, 
                    {
                        y: 0,
                        height: 0, 
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.find('div.folioText')[0],
                    .2, 
                    {
                        y: -150,
                        opacity: 0, 
                        ease: 'easeOutQuad', 
                        overwrite: 'all',
                        onCompleteScope: $this,
                        onComplete: function(){
                            $(this).css('zIndex', 10);
                        }
                    }
                );
                
                TweenMax.to($this.children('span.folioShadow')[0],
                    .15, 
                    {
                        y: 0,
                        opacity: 0, 
                        height: 0,
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

            } else {

                TweenMax.to($this.children('img')[0],
                    .2, 
                    {
                        opacity: themeObjects.folioOpacity,
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.children('span.folioPlus')[0],
                    .2, 
                    {
                        y: -300,
                        opacity: 0, 
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.children('div.folioTextHolder')[0],
                    .2, 
                    {
                        opacity: 0,
                        ease: 'easeOutQuad', 
                        overwrite: 'all'
                    }
                );

                TweenMax.to($this.find('div.folioText')[0],
                    .2, 
                    {
                        y: 200,
                        opacity: 0, 
                        ease: 'easeOutSine', 
                        overwrite: 'all',
                        onCompleteScope: $this,
                        onComplete: function(){
                            $(this).css('zIndex', 10);
                        }
                    }
                );

            }

	    });

        // We need to combine the mouse / touch events in a good way, so that we always have both (useful for the case of touchscreen laptops with a mouse pointer). My first approach is to assume that the touch event will always fire before the click event --

        var touched = false;

        $folioItems.click(function(e){

            if(!touched || (touched && $(this).hasClass('hovered'))) {

                if($(this).data('external') == 'no') {
                    preOpenProject($(this));
                    e.preventDefault();
                }

                touched = false;

                $(this).trigger('mouseleave');

            } else {
                e.preventDefault();
            }

        });

        $folioItems.on('touchstart', function(event){
            touched = true;
        });

        /* -------------------------------
        -----   Navigation  -----
        ---------------------------------*/

		$btnNext.click(function(e){
			if(!projectLoading) {
				closeAndOpen($(this));
			}
			e.preventDefault();
		});

		$btnPrev.click(function(e){
			if(!projectLoading) {
				closeAndOpen($(this));
			}
			e.preventDefault();
		});

        $('.btnClose').on('click', closeAndStay);

        if(themeObjects.modalCloseClick == 'true'){
        	$('#modal-holder').on('click', function(e){
                if($(e.target).attr('id') == 'modal-holder'){
                    closeAndStay(null);
                }
            });
        }

	}

    /* -------------------------------
    -----   Filter  -----
    ---------------------------------*/

    function sortFolio($this, option){

        $('html,body').animate({scrollTop: 0}, 500, 'easeInQuad');

        // Change the selected class in the menu

        if(option == undefined) {

            $selectedFilter.removeClass('selected');
            $selectedFilter = $this.parent().parent();
            $selectedFilter.addClass('selected');

        }

        if(!$this.hasClass('all-filter')) {

            var filter = $this.data('filter');
            $folioItems.removeClass('disable-resize');

            sortedFolio = filter;
            document.location.hash = filter;

            $folioItems.each(function(){

                if($(this).hasClass(filter)) {

                    // The items which are filtered need to be shown and enabled

                    $(this).data('custom-filter', '0');

                    TweenMax.to($(this)[0], .3, {
                        opacity: 1,
                        overwrite: 'all',
                        onCompleteScope: $(this), 
                        onComplete: function(){
                            $(this).removeClass('isotope-hidden');
                        }
                    });

                } else {

                    // The items which aren't filtered need to be hidden and disabled

                    $(this).data('custom-filter', '1');

                    TweenMax.to($(this)[0], .3, {
                        opacity: .1,
                        overwrite: 'all',
                        onCompleteScope: $(this), 
                        onComplete: function(){
                            $(this).addClass('isotope-hidden');
                        }
                    });

                }

            });

            // Update the sort data before each actual filtering, then do the sort

            $folioContainer.isotope('updateSortData', $folioItems);
            $folioContainer.isotope({
                'sortBy': 'byFilter'
            });

        } else {

            // Show all thumbnails

            sortedFolio = null;
            document.location.hash = '';

            $folioItems.each(function(){
                $(this).data('custom-filter', '0')
                    .animate({'opacity': 1})
                    .removeClass('isotope-hidden');
            });

            $folioContainer.isotope('updateSortData', $folioItems);
            $folioContainer.isotope({
                'sortBy': 'original-order'
            });

        }

    }

    $menu.find('a.filter').each(function(){

        // Attach click event

        $(this).click(function(e){

            var $this = $(this);

            if($project != null){
                closeAndStay();
                setTimeout(function(){
                    sortFolio($this);
                }, 500);
            } else {
                sortFolio($this);
            }

            e.preventDefault();

        });

    });

    function checkInitCategory(){

        var filter = document.location.hash.replace('#', ''),
            returnV = false;

        $menu.find('a.filter').each(function(){
            if($(this).data('filter') == filter) {
                $initFilter = $(this);
                returnV = true;
            }
        });

        return returnV;

    }

    /* -------------------------------
    -----   Project Functions   -----
    ---------------------------------*/

	function preOpenProject($this){

        // This function makes the initial animation before a project has been opened and it also creates the proper DOM elements

		if(!$this.hasClass('disabled')){

            topJump = $(window).scrollTop();

            if(mobileIs){
                $content.height($(window).height() - 140);
            }

            $('html,body').animate({scrollTop: 0}, 200, 'easeInQuad');

			$this.addClass('disabled');

			setTimeout(function(){
				$this.removeClass('disabled');
			}, 500);

        	$projectHolder.addClass('openedP');
            $projectHolder.parent().addClass('openedP2');
        	$body.css('overflowY', 'scroll');
            $footer.css('zIndex', 99999);

			$projectHover.height(0)
				.stop().fadeIn(0).animate({
					'height': $(window).height()-fPad
				}, 200, 'easeInQuad', function(){
                    $projectHolder.height($(window).height()-fPad);
				    openProject($this);
					$folioItems.css('zIndex', 6);
	            	$loader.stop().fadeIn(150);
                    $projectHolderNew.css('display', 'block');
				}
			);

		}

	}

	function openProject($this){

        // Do the actual AJAX request for the new project

        if(!projectLoading) {

            projectLoading = true;

            $.ajax({

                url: $this.prop('href'),
                dataType: 'html',
                success: function(data){

                    $folioItems.css('zIndex', 6);
					var pwd = $(data).find('#pwd').text();

					if(pwd == ''){

						// If this project is not password protected, continue with the loadnig

						$btnNext.css('display', '');
						$btnPrev.css('display', '');
						$btnClose.css('display', '');

						finishLoading(data, $this);

					} else {

						// If this project is password protected, prompt the user to insert it's password before loading it

						$btnNext.css('display', 'none');
						$btnPrev.css('display', 'none');
						$btnClose.css('display', 'none');

                        $loader.stop().fadeOut(100);

						$.msgbox(themeObjects.text_password, {
							type : 'prompt',
							buttons : [
								{type: 'submit', value:'Ok'},
								{type: 'cancel', value:'Cancel'}
							]}, 
							function(event) {
								if(event == pwd) {
                                    $loader.stop().fadeIn(100);
									finishLoading(data, $this);
                                    $btnNext.css('display', '');
                                    $btnPrev.css('display', '');
                                    $btnClose.css('display', '');
								} else {
									closeAndStay(null);
								}
							}
						);

					}

                }

            });

        }

	}

	function finishLoading(data, $this){

        // Append stuff

        $project = $(data).find('.project');

        if(projectType == 'folio'){
            $projectHolderNew.prepend($project);
        } else {
            $projectHolder.prepend($project);
        }

        if(projectType == 'gallery'){
            $projectHolder.prepend($(data).find('#projectSlides'));
        }

        // Init all scripts and do a resize

        initFolioScripts();
        initDefShortcodes();
        resizeThumbs();

        // Get the title & push new History state

        var matches = data.match(/<title>(.*?)<\/title>/);
        var title = matches[1];

        History.pushState({projectType: 'project'}, title, $this.prop('href').replace(document.location.protocol + '//' + document.location.hostname, ''));

        // Configure project buttons

		$project.find('.close').on('click', closeAndStay);

		var $prevLink = $project.find('#nextProject a');
		var $nextLink = $project.find('#previousProject a');

		if($prevLink.length>0) {
			$btnPrev.removeClass('disabled').attr('href', $prevLink.attr('href')).data('title', $prevLink.text());
		} else {
			$btnPrev.addClass('disabled');
		}

		if($nextLink.length>0) {
			$btnNext.removeClass('disabled').attr('href', $nextLink.attr('href')).data('title',$nextLink.text());
		} else {
			$btnNext.addClass('disabled');
		}

        // Analytics integraton

        if(themeObjects.gAnalytics == 'enabled') {
            ga('send', 'pageview', {
                'page': document.location.pathname,
                'title': document.title
            });
        }

	}

	function closeAndOpen($this){

        $loader.stop().fadeIn(150);

		// Closes the current project and opens a new one

        if(projectType == 'folio') {



            $projectHolderNew.animate({'left': '-100%'}, 300, 'easeOutQuart', function(){
                $project.remove();
                openProject($this);
            });
/*
    		$project.stop().animate({'left': '-50%'}, 300, 'easeOutQuart', function(){
    			$project.remove();
    			openProject($this);
    		});
*/
        } else {

            $('#projectSlides').stop().fadeOut(300, function(){
                $('#projectSlides').remove();
            });

            $project.stop().animate({'opacity': 0}, 300, function(){
                $project.remove();
                openProject($this);
            });

        }

	}

	function closeAndStay(e){

        if(!singleOpened) {

    		// Closes the project view altogheter

            var phd1 = 0,
                phd2 = 300;

            projectLoading = false;
            $projectNav.stop().fadeOut(200);

    		if($project!=null){

                if(projectType == 'folio'){

                    $projectHolderNew.animate({'left': '-100%'}, 500, 'easeOutQuart', function(){
                        // Reset everyhing
                        $project.remove();
                        $project = null;
                    });

                } else {

                    // Similar as above, but for galleries

                    $('#projectSlides').stop().fadeOut(500, function(){
                        $('#projectSlides').remove();
                    });

                    $project.stop().animate({'opacity': 0}, 500, function(){

                        $project.remove();
                        $project = null;

                    });

                }

                phd1 = 200;
                phd2 = 600;

    	        // Push new History state

    	        historyChanged = false;
    	        History.pushState({projectType: 'original'}, initTitle, initHref);

    		}

            setTimeout(function(){

                $project = null;
                $projectHolder.parent().removeClass('openedP2');
                $projectHolder.removeClass('openedP')
                    .css({
                        'height': 'auto',
                        'min-height': 0
                    });
                resizeThumbs();
                $folioItems.css('zIndex', 10);
                $footer.css('zIndex', 8);
                $projectHolderNew.css('display', 'none');

                $('html,body').animate({scrollTop: topJump}, 200, 'easeInQuad');

            }, phd2);

            $projectHover.delay(phd1).fadeOut(200);

        } else {

            // Single project opened - jump to main portfolio page
            document.location.href = $project.data('parent');

        }

        if(e!=null){
    	    e.preventDefault();
    	}
	
	}

    /* -------------------------------
    -----   Slider Functions (called in the scripts init)   -----
    ---------------------------------*/

    function resizeProjectCentered(){

        // Change the size of the images within the gallery. Resize them proportionally to fit the screen

        $projectSlider.find('img').each(function(){

        	if($(this)[0].naturalWidth > 0 || $(this)[0].complete) {

	            var $img = $(this);

	            var maxHeight = Math.min($img.data('max-height'), $projectSlider.height()-40),
	                maxWidth = Math.min($img.data('max-width'), $projectSlider.width()-40),
	                oldHeight = $img.height(),
	                oldWidth = $img.width(),
	                ratio = Math.max(oldWidth / oldHeight, oldHeight / oldWidth),
	                newHeight = 0,
	                newWidth = 0;

	            // Complex calculations to get the perfect size

	            if(oldWidth > oldHeight){

	                if(maxWidth / ratio > maxHeight){
	                    newHeight = maxHeight;
	                    newWidth = maxHeight * ratio;
	                } else {
	                    newWidth = maxWidth;
	                    newHeight = maxWidth / ratio;
	                }

	            } else {

	                if(maxHeight / ratio > maxWidth){
	                    newWidth = maxWidth;
	                    newHeight = maxWidth * ratio;
	                } else {
	                    newHeight = maxHeight;
	                    newWidth = maxHeight / ratio;
	                }

	            }

	            // Apply the correct size and reposition

	            $img.css({
	                'width': Math.ceil(newWidth),
	                'height': Math.ceil(newHeight),
	                'top': Math.round(($projectSlider.height()-newHeight)/2),
	                'left': Math.round(($projectSlider.width()-newWidth)/2)
	            });

	        }

        });

    }

    function resizeProjectFull(){

        // Change the size of the images within the gallery. Resize them proportionally to fill the screen

        $projectSlider.find('img').each(function(){

        	if($(this)[0].naturalWidth > 0 || $(this)[0].complete) {

	            var $img = $(this);

	            var maxHeight = $projectSlider.height(),
	                maxWidth = $projectSlider.width(),
	                oldHeight = $img.height(),
	                oldWidth = $img.width(),
	                ratio = Math.max(oldWidth / oldHeight, oldHeight / oldWidth),
	                newHeight = 0,
	                newWidth = 0;

	            // Complex calculations to get the perfect size

	            if(oldWidth > oldHeight){

	                if(maxWidth / ratio < maxHeight){
	                    newHeight = maxHeight;
	                    newWidth = maxHeight * ratio;
	                } else {
	                    newWidth = maxWidth;
	                    newHeight = maxWidth / ratio;
	                }

	            } else {

	                if(maxHeight / ratio < maxWidth){
	                    newWidth = maxWidth;
	                    newHeight = maxWidth * ratio;
	                } else {
	                    newHeight = maxHeight;
	                    newWidth = maxHeight / ratio;
	                }

	            }

	            // Apply the correct size and reposition

	            $img.css({
	                'width': Math.ceil(newWidth),
	                'height': Math.ceil(newHeight),
	                'top': Math.round((maxHeight - newHeight)/2),
	                'left': Math.round((maxWidth - newWidth)/2)
	            });

	        }

        });

    }

    function resizeModal(){

        // When the modal project is opened and at 100% width, it needs some proper resizing
        $projectSlider.height($projectSlider.find('img').height());

    }

    /* -------------------------------
    -----   Init Scripts   -----
    ---------------------------------*/

    function initSwiperCustom(swiper){

        // Fade out the loader

        $loader.stop().fadeOut(100);

        $projectNav.stop().delay(300).fadeIn(200);

        if(projectType == 'gallery') {

            // GALLERY PROJECTS ----

            $(swiper.slides).delay(300).find('img').animate({'opacity': 1}, 500, function(){
                projectLoading = false;
            });

            // If this slider has centered images we need to calculate the maximum height for each image

            for (var i = 0; i < swiper.slides.length; i++) {
                var $img = $(swiper.slides[i]).find('img');
                $img.data({
                    'max-width': $img.attr('width'),
                    'max-height': $img.attr('height')
                });
            }

            // Attach the proper resize event to the window and do one

            if($project.data('resize') == 'fit') {
                $(window).on('resize.removeLater', resizeProjectCentered);
                resizeProjectCentered();
            } else {
                $(window).on('resize.removeLater', resizeProjectFull);
                resizeProjectFull();
            }

            // Fade in all other elements

            $('.galleryContent').stop().delay(400).fadeIn(300);
            $(swiper.paginationContainer).stop().delay(600).fadeIn(300);

        } else {

            // PORTFOLIO PROJECTS ----

            $('#postSlider').find('img').css('opacity', 1);

            // Prep project holder for vertical scrolling

            $projectHolder.css('min-height', $project.data('project-height')+fPad+140)

            // Slide in project

            $projectHolderNew.css('left', '100%').stop().delay(100).animate({'left': 0}, 500, 'easeInOutCubic', function(){
                projectLoading = false;
            });

            // For swiper

            if(!$('#postSlider').hasClass('modal-single')){

                $(window).on('resize.removeLater', resizeProjectFull);
                resizeProjectFull();
                createSwiperRegularNav(swiper);

                $(window).on('resize.removeLater', resizeModal);
                resizeModal();

            }

            // Setup responsiveness

            resizeThumbs();
            modalQuery();

        }

        // Stupid bugs all over again

        var sbI = 0,
            sbK = 0;
        
        fixSwiper(swiper);

        sbI = setInterval(function(){
            if(++sbK==6){
                clearInterval(sbI);
                setTimeout(function(){
                    $(window).trigger('resize');
                    fixSwiper(swiper);
                }, 1000);
            }
            $(window).trigger('resize');
            fixSwiper(swiper);
        }, 500);

    }

    function fixSwiper(swiper){
        if(swiper != null){
            swiper.resizeFix();
        }
    }

    function initFolioScripts(){

        if($('#postSlider').hasClass('modal-single')){

            var firstImg = $('.modal-single').find('img')[0];

            // Init scripts

            initMedia();
            initMinimize();

            // Init custom bars
            if(projectType == 'folio'){
                contentScrollbar();
            }

            //dbdBehavior();

            // Search for images and load "load" the first one - when it's ready, continue with the initialization

            if(firstImg == undefined){
                initSwiperCustom(swiper);
            } else {

                if(firstImg.complete || firstImg.naturalWidth > 0) {
                    initSwiperCustom(swiper);
                } else {

                    $(firstImg).attr('src', $(firstImg).attr('src'));

                    $(firstImg).on('load', function(){
                        initSwiperCustom(swiper);
                    });

                }

            }

        } else {

            var firstImg = $('.swiper-container').find('img')[0];

            $projectSlider = $('.swiper-container');

            var swiper = $projectSlider.swiper({

                // Variables - they are pretty stable as defined :)

                mode: 'horizontal',
                loop: true,
                calculateHeight: false,
                grabCursor: true,
                centeredSlides: true,
                useCSS3Transforms: true,
                resizeReInit: true,
                updateOnImagesReady: false,
                noSwiping: true,
                noSwipingClass: 'no-swipe',
                speed: 300,
                resistance: false,
                roundLenghts: true,
                keyboardControl: true,

                // pagination - only available for galleries

                createPagination: (projectType == 'gallery' ? true : false),
                pagination: '.swiper-pagination',
                paginationClickable: true,
                paginationAsRange: false,
                paginationElement: 'li',
                paginationActiveClass: 'selected',

                // autoplay - only available for galleries

                autoplay: (projectType == 'gallery' && $project.data('autoplay') === true ? parseInt(themeObjects.gallerySliderSpeed) : 0),
                autoplayDisableOnInteraction: false,

                // functions
                
                onSwiperCreated: function(swiper) {

                    // On the first init append the custom navigation (depending on the project type) and bind the proper events

                    if(projectType == 'gallery'){

                        // Append custom navigation, then remember the variables, for a later use

                        $(swiper.paginationButtons).each(function(){
                            $(this).text($(this).index()+1);
                        });

                        if($project.data('autoplay') === true) {

                            $(swiper.paginationContainer).prepend('<li id="play-pause"' + ($project.data('autoplay') === true ? '' : ' class="paused"') + '><div id="progress-bar"></div></li>');

                            swiper.$krProgressBar = $('#progress-bar');

                            swiper.$krProgressBar.stop().animate({'height': 26}, parseInt(themeObjects.gallerySliderSpeed), 'linear');

                        }

                        // Configure play/pause button

                        $('#play-pause').click(function(){

                            if($(this).hasClass('paused')){

                                swiper.startAutoplay();
                                $(this).removeClass('paused');
                                swiper.$krProgressBar.stop().animate({'height': 26}, parseInt(themeObjects.gallerySliderSpeed), 'linear');

                            } else {

                                swiper.stopAutoplay();
                                $(this).addClass('paused');
                                swiper.$krProgressBar.stop().animate({'height': 0}, 50, 'linear');

                            }

                        });

                    } 

                    // Init scripts

                    initMedia();
                    initMinimize();

                    // Init custom bars
                    if(projectType == 'folio'){
                        contentScrollbar();
                    }

                    //dbdBehavior();

                    // Search for images and load "load" the first one - when it's ready, continue with the initialization

                    if(firstImg == undefined){
		                initSwiperCustom(swiper);
		            } else {

		                if(firstImg.complete || firstImg.naturalWidth > 0) {
		                    initSwiperCustom(swiper);
		                } else {
		                    $(firstImg).attr('src', $(firstImg).attr('src'));

		                    $(firstImg).on('load', function(){
		                        initSwiperCustom(swiper);
		                    });

		                }

		            }

		            $projectSlider.find('img').on('load', function(){
		            	$(window).trigger('resize');
		            })


                },

                // The two functions below are for the customization of the grabbing mouse cursor. They are also for refreshing the gallery progress bar.

                onTouchStart: function(swiper){
                    $(swiper.container).addClass('grabbing');
                },
                onTouchMove: function(swiper){
                    if(projectType == 'gallery'){
                        swiper.$krProgressBar.stop().animate({'height': 0}, 50, 'linear');
                    }
                },
                onTouchEnd: function(swiper){
                    $(swiper.container).removeClass('grabbing');
                    if(projectType == 'gallery'){
                        swiper.$krProgressBar.stop().animate({'height': 26}, parseInt(themeObjects.gallerySliderSpeed), 'linear');
                    }
                },

                // Refresh the pagination in the custom navigation, change the captions for gallery projects and fix continuous video play bug

                onSlideChangeStart: function(swiper){
                    if(projectType == 'gallery'){
                        swiper.$krProgressBar.stop().animate({'height': 0}, 50, 'linear');
                    } else if(swiper.$swiperNo != null){
                        swiper.$swiperNo.text(swiper.activeLoopIndex+1)
                    }
                },

                onSlideChangeEnd: function(swiper){

                    if(projectType == 'gallery'){
                        swiper.$krProgressBar.stop().animate({'height': 26}, parseInt(themeObjects.gallerySliderSpeed), 'linear');
                    }

                    if($(swiper.slides).eq(swiper.previousIndex).find('.video-hosted').length > 0) {
                    }

                    if($(swiper.slides).eq(swiper.previousIndex).find('.video-embedded').length > 0) {

                        $(swiper.slides).eq(swiper.previousIndex).find('.video-embedded')
                            .removeClass('loading')
                            .find('iframe, close-iframe').remove();

                    }

                }

            });

        }

	}

    function contentScrollbar(){

        // Init custom scrollbars for content - http://manos.malihu.gr/jquery-custom-content-scroller/
        
        $('.projectContent').mCustomScrollbar({
            scrollInertia: 400,
            theme: "me-2",
            autoDraggerLength: false,
            autoHideScrollbar: true,
            mouseWheelPixels: 100,
            contentTouchScroll: false,
            advanced: {
                updateOnContentResize: true
            }
        });

    }

    function initMedia(){

        // Init media elements

        $('audio,video').mediaelementplayer({
            alwaysShowControls: false,
            iPadUseNativeControls: false,
            iPhoneUseNativeControls: false,
            AndroidUseNativeControls: false,
            enableKeyboard: false,
            pluginPath: themeObjects.base + '/js/mediaelement/',
            success: function() {
                $(window).trigger('resize');
            }
        });

        $('.video-embedded').append('<div class="mejs-overlay-play"><div class="mejs-overlay-button"></div></div>')
            .find('.mejs-overlay-button').click(function(e){

                var $this = $(this).closest('.video-embedded');

                if(!$this.hasClass('loading')) {

                    var href = $this.data('href'),
                        id = $this.data('id');

                    $this.append('<div class="css-loader"></div><a href="#" class="close-iframe close-btn-special"></a><iframe id="video-frame-' + id + '" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + ($html.hasClass('ie') ? ' allowtransparency="true"' : '') + '></iframe>')

                        .addClass('loading')

                        .find('.close-iframe').click(function(){
                            $(this).closest('.video-embedded')
                                .removeClass('loading')
                                .find('iframe, .close-iframe').remove();
                        });

                    $('#video-frame-' + id).prop('src', href)   
                        .load(function(){
                            $(this).animate({'opacity': 1}, 200)
                                .siblings('.css-loader').remove();
                        });

                }     

                e.preventDefault();

            });
    }

/* ----------------------------------------------------
---------- !! SINGLE SLIDESHOW !! -----------------
------------------------------------------------------- */

    if($body.hasClass('page-template-template-slideshow-php')) {

        // Here, we are basically simply 

        var $project = $('#gallery-data'),
            $projectNav = $project,
            $projectCustom = $('#projectSlides'),
            projectType = 'gallery';

        $(window).on('resize', function(){
            $projectCustom.height($(window).height()-140);
            if(mobileIs){
                $content.height($(window).height() - 140);
            }
        });
        $(window).trigger('resize');

        initFolioScripts();

    }

/* ----------------------------------------------------
---------- !! SINGLE VIDEO !! -----------------
------------------------------------------------------- */

    if($body.hasClass('page-template-template-video-php')) {

        var globalME = null,
            $poster = null;

        $('#fullScreenVideo').mediaelementplayer({

            alwaysShowControls: false,
            iPadUseNativeControls: false,
            iPhoneUseNativeControls: false,
            AndroidUseNativeControls: false,
            enableKeyboard: true,
            pluginPath: themeObjects.base + '/js/mediaelement/',

            success: function(mediaElement, domObject, player){

                globalME = mediaElement;
                mediaElement.play();

                var origWidth = player.width,
                    origHeight = player.height,
                    ratio = Math.max(origWidth / origHeight, origHeight / origWidth);

                $(window).on('resize', function(){

                    if(mobileIs){
                        $content.height($(window).height() - 140);
                    }

                    var maxWidth = $(window).width() - (fixedSidebar ? fixedSidebarWidth : 0),
                        maxHeight = $(window).height() - 140,
                        newHeight = 0,
                        newWidth = 0,
                        topMargin = mobileIs ? 0 : 70;

                    // Complex calculations to get the perfect size

                    if(origWidth > origHeight){

                        if(maxWidth / ratio < maxHeight){
                            newHeight = maxHeight;
                            newWidth = maxHeight * ratio;
                        } else {
                            newWidth = maxWidth;
                            newHeight = maxWidth / ratio;
                        }

                    } else {

                        if(maxHeight / ratio < maxWidth){
                            newWidth = maxWidth;
                            newHeight = maxWidth * ratio;
                        } else {
                            newHeight = maxHeight;
                            newWidth = maxHeight / ratio;
                        }

                    }

                    // Apply the correct size and reposition

                    $(domObject).css({
                        'width': Math.ceil(newWidth),
                        'height': Math.ceil(newHeight),
                        'top': Math.round((maxHeight - newHeight)/2)+topMargin,
                        'left': Math.round(($(window).width() - newWidth + (fixedSidebar ? fixedSidebarWidth : 0))/2)
                    });

                    if($poster != null){
                        $poster.css({
                            'width': Math.ceil(newWidth),
                            'height': Math.ceil(newHeight),
                            'top': Math.round((maxHeight - newHeight)/2)+topMargin,
                            'left': Math.round(($(window).width() - newWidth + (fixedSidebar ? fixedSidebarWidth : 0))/2)
                        });
                    }

                }).trigger('resize');

                $loader.delay(100).fadeOut(150);
                $(domObject).delay(300).animate({'opacity': 1}, 1000, function(){

                    if(globalME.paused){
                        $poster = $('.mejs-poster');
                        $poster.addClass('noplay');
                        $('.mejs-overlay-play').addClass('noplay');
                        $(window).trigger('resize');
                    }

                });

                globalME.addEventListener('play', function(){
                    $('.mejs-overlay-play').removeClass('noplay');
                });
                globalME.addEventListener('pause', function(){
                    $('.mejs-overlay-play').addClass('noplay');
                });

            }

        });

    }

/* ----------------------------------------------------
---------- !! CONTACT PAGE !! -----------------
------------------------------------------------------- */

    if($body.hasClass('page-template-template-contact-php')){

        // Handle map if enabled

        if($('#contactDetails').data('map') == 'map-enable'){

            $body.append('<div id="contactMapHolder"><div id="contactMap"></div></div>')

            var $mapDataObj = $('#contactDetails'),
                $mapInsert = $('#contactMap');

            if (!window.addEventListener) {
                window.onload = addMap;
            } else { 
                window.addEventListener('load', addMap, false);
            }

        } else {
            $loader.stop().fadeOut(200);
        }

        // Setup contact form

        var $form = $('#contact'),
        $name = $form.find('.name'),
        $email = $form.find('.email'),
        $subject = $form.find('.subject'),
        $message = $form.find('.message'),
        $success = $form.parent().find('.success-message'),
        $error = $form.parent().find('.error-message');

        $name.focus(function(){resetError($(this))});
        $email.focus(function(){resetError($(this))});
        $message.focus(function(){resetError($(this))});

        $form.submit(function(e){

            var ok = true;
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

            if($name.val().length < 3 || $name.val() == $name.data('value')){
                showError($name);
                ok = false;
            }

            if($email.val() == '' || $email.val() == $email.data('value') || !emailReg.test($email.val())){
                showError($email);
                ok = false;
            }

            if($message.val().length < 5 || $message.val() == $message.data('value')){
                showError($message);
                ok = false;
            }


            if(ok){

                $form.fadeOut();

                $.ajax({
                    type: $form.prop('method'),
                    url: $form.prop('action'),
                    data: $form.serialize(),
                    success: function(){
                      $success.fadeIn();
                  }
              });

            }

            e.preventDefault();

        });

    }

    // Configure the custom Google Maps API instance

    function addMap(){

        var map;

        var stylez = [
            {
              featureType: "all",
              elementType: "all",
              stylers: [
                { saturation: -100 }
              ]
            }
        ];

        var mapOptions = {
            zoom: $mapDataObj.data('zoom'),
            center: new google.maps.LatLng($mapDataObj.data('map-lat'), $mapDataObj.data('map-long')),
            streetViewControl: false,
            scrollwheel: false,
            panControl: false,
            mapTypeControl: false,
            overviewMapControl: false,
            zoomControl: false,
            draggable: false,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE
            },
            mapTypeControlOptions: {
                 mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'krownMap']
            }
        };

        map = new google.maps.Map(document.getElementById("contactMap"), mapOptions);

        if($mapDataObj.data('greyscale') == 'd-true') {

            var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });    
            map.mapTypes.set('krownMap', mapType);
            map.setMapTypeId('krownMap');

        }

        if($mapDataObj.data('marker') == 'd-true') {

            var myLatLng = new google.maps.LatLng($mapDataObj.data('map-lat'), $mapDataObj.data('map-long'));
            var beachMarker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: $mapDataObj.data('marker-img')
            });

        }

        $mapInsert.delay(600).animate({'opacity': 1}, 400);
        $loader.delay(600).fadeOut(150);

    }

    // Contact form functions

    function showError($input){
        $input.val($input.data('value'));
        $input.addClass('contact-error-border');
        $error.fadeIn();
    }

    function resetError($input){
        $input.removeClass('contact-error-border');
        $error.fadeOut();
    }

/* ----------------------------------------------------
---------- !! SHORTCODES !! -----------------
------------------------------------------------------- */

    initDefShortcodes();

    function initDefShortcodes(){

        // Dirty but working

        $('p:empty').remove();

        /* -------------------------------
        -----   Video / Audio Elements   -----
        ---------------------------------*/
/*
        $('.page-content, .blog-grid, .blog-fixed .post-format-content').find('audio,video').each(function(){
            $(this).mediaelementplayer({
                alwaysShowControls: true,
                iPadUseNativeControls: false,
                iPhoneUseNativeControls: false,
                AndroidUseNativeControls: false,
                enableKeyboard: false,
                pluginPath: themeObjects.base + '/js/mediaelement/'
            });
        });
*/
        /* -------------------------------
        -----   Gallery Shortcode   -----
        ---------------------------------*/

        // Actually, this turned out to be used only in the blog grid, because the slider i used isn't as responsive as i wanted, so it threw a lot of bugs.

        var $postHeader = $('.post-header');
        $postHeader.find('iframe').load(function(){
            $postHeader.removeClass('loading');
        });

        if($postHeader.find('#postSlider').hasClass('modal-single')){
            $postHeader.removeClass('loading');
        }

        // Sorry for that :)

        if($('.krown-slider').length > 0) {

            $('.krown-slider').each(function(){

                $(this).swiper({

                    // Variables - they are pretty stable as defined :)

                    mode: 'horizontal',
                    loop: true,
                    calculateHeight: false,
                    grabCursor: true,
                    centeredSlides: true,
                    useCSS3Transforms: true,
                    resizeReInit: false,
                    updateOnImagesReady: true,
                    createPagination: false,
                    noSwiping: true,
                    noSwipingClass: 'no-swipe',
                    autoplay: 0,
                    speed: 300,
                    resistance: false,
                    keyboardControl: false,

                    onImagesReady: function(swiper){

                        $(swiper.container).find('div').css('height', $(swiper.container).find('img').height());

                        // Fade in images & navigation

                        $(swiper.slides).find('img').delay(200).animate({'opacity': 1}, 300);
                        createSwiperRegularNav(swiper);

                        // Add proper resizing event & do first resize

                        $(swiper.container).animate({'height': $(swiper.container).find('img').height()}, 300, 'linear', function(){
                            $(window).trigger('resize');
                        });

                        $(window).on('resize', function(){
                            $(swiper.container).height($(swiper.container).find('img').height());
                        });

                        if($postHeader != null){
                            $postHeader.removeClass('loading');
                        }


                    },

                    // The two functions below are for the customization of the grabbing mouse cursor

                    onTouchStart: function(swiper){
                        $(swiper.container).addClass('grabbing');
                    },
                    onTouchEnd: function(swiper){
                        $(swiper.container).removeClass('grabbing');
                    },

                    // Refresh the pagination in the custom navigation

                    onSlideChangeStart: function(swiper){
                        if(swiper.$swiperNo != null){
                            swiper.$swiperNo.text(swiper.activeLoopIndex+1)
                        }
                    }

                });

            });

        }

        /* -------------------------------
        -----   Accordions   -----
        ---------------------------------*/

        $('.krown-accordion').each(function(){

            var toggle = $(this).hasClass('toggle') ? true : false,
                $sections = $(this).children('section'),
                $opened = $(this).data('opened') == '-1' ? null : $sections.eq(parseInt($(this).data('opened')));

            if($opened != null){
                $opened.addClass('opened');
                $opened.children('div').slideDown(0);
            }

            $(this).children('section').children('h5').click(function(){

                var $this = $(this).parent();

                if(!toggle){
                    if($opened != null){
                        $opened.removeClass('opened');
                        $opened.children('div').stop().slideUp(300);
                    }
                }

                if($this.hasClass('opened') && toggle){
                    $this.removeClass('opened');
                    $this.children('div').stop().slideUp(300);
                } else if(!$this.hasClass('opened')){
                    $opened = $this;
                    $this.addClass('opened');
                    $this.children('div').stop().slideDown(300);
                }

            });

        });

        /* -------------------------------
        -----   Tabs   -----
        ---------------------------------*/

        $('.krown-tabs').each(function(){

            var $titles = $(this).children('.titles').children('li'),
            $contents = $(this).children('.contents').children('div'),
            $openedT = $titles.eq(0),
            $openedC = $contents.eq(0);

            $openedT.addClass('opened');

            $titles.find('a').prop('href', '#').off('click');;

            $titles.click(function(e){

                $openedT.removeClass('opened');
                $openedT = $(this);
                $openedT.addClass('opened');

                $openedC.stop().slideUp(200);
                $openedC = $contents.eq($(this).index());
                $openedC.stop().delay(200).slideDown(200);

                e.preventDefault();

            });

        });

        /* -------------------------------
        -----   Fancybox   -----
        ---------------------------------*/

        $('img.alignleft, img.alignright, img.aligncenter').parent('a').each(function(){
            $(this).attr('class', 'fancybox fancybox-thumb ' + $(this).children('img').attr('class'));
        });

        if($('.fancybox').length > 0 || $('div[id*="attachment"]').length > 0){

            $('.fancybox, div[id*="attachment"] > a').fancybox({
                padding: 0,
                margin: 50,
                aspectRatio: true,
                scrolling: 'no',
                mouseWheel: false,
                openMethod: 'zoomIn',
                closeMethod: 'zoomOut',
                nextEasing: 'easeInQuad',
                prevEasing: 'easeInQuad'
            }).append('<span></span>');
        }
        
    }

    /* -------------------------------
    -----   Minimize button   -----
    ---------------------------------*/

    function initMinimize(){

        $('.minimize').each(function(){

            if(!$(this).hasClass('init')){

                $(this).addClass('init');

                if($(this).hasClass('minimized')){
                    $($(this).data('content')).stop().slideUp(0);
                }

                $(this).click(function(){

                    if($(this).hasClass('minimized')){

                        $(this).removeClass('minimized');
                        $($(this).data('content')).stop().slideDown($(this).data('speed'));

                    } else {

                        $(this).addClass('minimized');
                        $($(this).data('content')).stop().slideUp($(this).data('speed'));

                    }

                });

            }

        });

    }

    initMinimize();

    // More //   

    function createSwiperRegularNav(swiper){

        // Creates swiper slider navigation for portfolio modular windows and all other sliders

        if(swiper.slides.length == 3){

            // Disable swipping for one image

            $(swiper.container).addClass('no-swipe');
            $(swiper.wrapper).addClass('no-swipe');

        } else {

            // For everything else, create navigation & show it

            $(swiper.container).append('<div class="swiper-nav"><a class="swiper-prev" href="#"></a><a class="swiper-next" href="#"></a><span class="swiper-no"><span class="cur">1</span> ' + themeObjects.text_slider + ' ' + (swiper.slides.length-2) + '</span></div>');
            swiper.$swiperNo = $(swiper.container).find('.swiper-no .cur');
            $(swiper.container).find('.swiper-nav').delay(300).fadeIn();

            // And asign proper events

            $(swiper.container).find('.swiper-next').on('click', function(e){
                swiper.swipeNext();
                e.preventDefault();
            });
            $(swiper.container).find('.swiper-prev').on('click', function(e){
                swiper.swipePrev();
                e.preventDefault();
            });

        }

    }

    /* -------------------------------
    -----   Twitter Widget   -----
    ---------------------------------*/

    $('.krown-twitter.rotenabled').each(function(){

        var $tW = $(this).children('ul').children('li'),
            tI = 0,

        tV = setInterval(function(){

            $tW.eq(tI).fadeOut(250);

            if(++tI == $tW.length)
                tI = 0;

            $tW.eq(tI).delay(260).fadeIn(300);

        }, 6000);

    });

    /* -------------------------------
    -----   Go Top Button   -----
    ---------------------------------*/

    var $top = $('#top');

    $top.click(function(e){
        $('html,body').animate({scrollTop: 0}, 500, 'easeInQuad');
        e.preventDefault();
    });

    $(window).scroll(function(){
        if($(this).scrollTop() > 500) {
            $top.stop(true, true).fadeIn();
        } else {
            $top.stop(true, true).fadeOut(200);
        }
    });

    /* -------------------------------
    -----   DPI Cookie   -----
    ---------------------------------*/

    var retina = window.devicePixelRatio > 1;
    $.cookie('dpi', retina, {expires: 365, path: '/'});

    /* -------------------------------
    -----   Input Trick   -----
    ---------------------------------*/

    $('input, textarea').each(function(){
    
        if($(this).attr('type') != 'submit'){

            $(this)
                .data('value', $(this).val())
                .focus(function(){
                    $(this).addClass('focus-input');
                    if($(this).val() == $(this).data('value')){
                      $(this).val('');
                    } else {
                      $(this).select();
                    }
                })
                .blur(function(){
                    $(this).removeClass('focus-input');
                    if($(this).val() == ''){
                      $(this).val($(this).data('value'));
                    }
                });
        }
      
    });

/* ----------------------------------------------------
---------- !! THE END !! -----------------
------------------------------------------------------- */

});

})(jQuery);