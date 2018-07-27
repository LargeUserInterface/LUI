<?php 
/**
 * This file contains the output of the WordPress Theme Customizer (frontend)
 */

if( ! function_exists( 'krown_custom_css' ) ) {

	function krown_custom_css() {

		// Get Options

		$f_head = is_serialized( get_option('krown_type_heading' ) ) ? unserialize( get_option('krown_type_heading' ) ) : array( 'default' => true, 'font-family' => '"Helvetica Neue", Helvetica, Arial, sans-serif' );
		$f_body = is_serialized( get_option( 'krown_type_body' ) ) ? unserialize( get_option( 'krown_type_body' ) ) : array( 'default' => true, 'font-family' => '"Helvetica Neue", Helvetica, Arial, sans-serif' );
		
		$colors = get_option( 'krown_colors' );

		$protocol = is_ssl() ? 'https' : 'http';

		// Enequeue Google Fonts

		if ( ! isset( $f_head['default'] ) ) {
			wp_enqueue_style( 'krown-font-head', "$protocol://fonts.googleapis.com/css?family=" . $f_head['css-name'] . ":300,400,400italic,500,600,700,700italic,800" );
		}

		if ( $f_body != $f_head && !isset( $f_body['default'] ) ) {
			wp_enqueue_style( 'krown-font-body', "$protocol://fonts.googleapis.com/css?family=" . $f_body['css-name'] . ":300,400,400italic,500,600,700,700italic,800" );
		}

		// Create Custom CSS

		$custom_css = '

			/* CUSTOM FONTS */

			#tagline, h1, h2, h3, h4, h5, h6, #comments-title, #reply-title, .commentAuthor, .asterix, #submit, .sliderPagination, .projectContent .category, .galleryContent .category, .sidewidget span, .main-menu > li > p {
			  font-family: ' . $f_head['font-family'] . ';
			}

			body, input, textarea, button {
			  font-family: ' . $f_body['font-family'] . ';
			}

			/* CUSTOM COLORS */

			.actionButton, .pagination a:hover, .hasButtonsPost div, .page-template-template-video-php .mejs-overlay-play .mejs-overlay-button:hover, .folioPlus, .hasButtons a, .share-buttons a:hover, .swiper-nav a, .swiper-pagination li, #play-pause:hover, .krown-button.light, .krown-button.dark:hover, input[type="submit"], .jquery-msgbox-buttons button, .video-embedded .mejs-overlay-button:hover, .video-embedded .close-iframe:hover, .mejs-controls .mejs-horizontal-volume-slider .mejs-horizontal-volume-current, .mejs-controls .mejs-time-rail .mejs-time-current, .mejs-controls .mejs-volume-button .mejs-volume-slider .mejs-volume-current, .mejs-overlay:hover .mejs-overlay-button, .fancybox-nav span:hover, .fancybox-close:hover, .video-embedded .close-iframe, .no-touch .responsive-design-cover:hover {
				background-color: ' . $colors['main1'] . ';
			}
			.mCS-me-2 .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
				background-color: ' . $colors['main1'] . ' !important;
			}
			a:hover, .projectContent a:hover, .no-touch .krown-accordion > section h5:hover, .no-touch .krown-accordion > section h5:hover:before, .krown-twitter a:hover, .no-touch .krown-tabs .titles li:hover h5  {
				color: ' . $colors['main1'] . ';
			}
			.krown-button.light.headed:after, .krown-button.dark.headed:hover:after {
			   border-color: ' . krown_hex_to_rgba( $colors['main1'], '0' ) .';
			   border-left-color: ' . $colors['main1'] . ';
			}
			#sidebar {
				background-color: ' . $colors['side1'] . ';
			}
			#close:after {
				border-left-color: ' . $colors['side1'] . ';
			}
			#tagline, #copy, #menu a, #menu ul.sub-menu a, #menu ul.main-menu > li.selected.parent a {
				color: ' . $colors['side2'] . ';
			}
			#sidebar .krown-social li:before {
				color: ' . $colors['side3'] . ';
			}
			#menu ul.sub-menu > li:hover > p > a, #menu ul.main-menu > li:hover > p > a {
				background-color: ' . $colors['side3'] . ';
			}
			#menu ul.sub-menu > li:hover > p:before, #menu ul.main-menu > li.selected > p:before, #menu ul.main-menu > li:hover > p:before {
				border-left-color: ' . $colors['side3'] . ';
			}
			#menu ul li.selected > p > a {
				background-color: ' . $colors['side4'] . ' !important;
			}
			#menu ul li.selected > p:before {
				border-left-color: ' . $colors['side4'] . ' !important;
			}
			#menu ul li.selected > p > a, #menu ul.sub-menu > li.selected p > a {
				color: ' . $colors['side5'] . ' !important;
			}
			
			/* CUSTOM CURSORS */

			.swiper-container {	
			   cursor: -webkit-grab !important;
			   cursor: -moz-grab !important;
			   cursor: url(' . get_template_directory_uri() . '/images/grab.cur), move !important;
			}
			.swiper-container.grabbing {
			   cursor: -webkit-grabbing !important;
			   cursor: -moz-grabbing !important;
			   cursor: url(' . get_template_directory_uri() . '/images/grabbing.cur), move !important;
			}

			/* CUSTOM CSS */

		';

		$custom_css .= ot_get_option( 'krown_custom_css', '' );

		// Embed Custom CSS

		wp_add_inline_style( 'krown-style', $custom_css );

	}

}

add_action( 'wp_enqueue_scripts', 'krown_custom_css', 11 );

// Because of the way the admin bar works, it really breaks the layout of the theme into pieces (it adds bad margin at the top, thus making everything smaller). So we need a bulletproof solution to make sure that the admin bar will not interfer with the user editing (we keep it, but we minimalize it)

if ( ! function_exists( 'krown_custom_admin_bar_soft' ) ) {

	function krown_custom_admin_bar_soft() {

		echo '<style type="text/css">

			html, * html body {
				margin-top: 0 !important;
			}

			#wpadminbar {
				background: rgba(0, 0, 0, .5) !important;
				opacity: .8 !important;
				-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)" !important;
				filter: alpha(opacity=80) !important;
			}

		</style>';

	}

}

add_action( 'wp_head', 'krown_custom_admin_bar_soft', 99 );

?>