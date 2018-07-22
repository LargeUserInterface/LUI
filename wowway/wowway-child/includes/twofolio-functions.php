<?php

/* PLEASE READ! This is the first area which needs editing! If you duplicate this, make sure that you add the new page template in the if statement, along with the new custom post type..

Let's say that your custom post type is called "threefolio" and the page template which you've prepared is called "template-threefolio". The if statement below should look like this:

    if ( is_page_template( 'template-three.php') || is_page_template( 'template-twofolio.php') || is_page_template( 'template-portfolio.php' ) || is_page_template( 'template-gallery.php' ) || is_singular( array( 'threefolio', 'twofolio', 'portfolio', 'gallery' ) ) ) {

The idea is to make sure that the theme will know when it is dealing with your custom post types.

*/

if ( ! function_exists( 'krown_check_portfolio' ) ) {

    function krown_check_portfolio() {

        global $post;

        if ( is_page_template( 'template-twofolio.php') || is_page_template( 'template-portfolio.php' ) || is_page_template( 'template-gallery.php' ) || is_singular( array( 'twofolio', 'portfolio', 'gallery' ) ) ) { 
            return 'is-portfolio thumbs-loading';
        } else {
            return 'isnt-portfolio';
        }

    }

}

/* PLEASE READ! This is the second area which needs editing! 

You need to add your new custom post type in the array below.

*/

if ( ! function_exists( 'krown_cpt_cat_list' ) ) {

    function krown_cpt_cat_list() {
        return array( 'portfolio_category', 'gallery_category', 'twofolio_category' );
    }

}

/* PLEASE READ! This is the third area which needs editing! 

    1. You need to rename the three strings below "twofolio_page" with your new custom post type name, let's say "threefolio_page".

    2. You need to come at a later point and update the "999" id into something else, because that will be the id of the page template which will display the new custom post type.

*/

if ( ! get_option( 'twofolio_page' ) ) {
    add_option( 'twofolio_page', '9999' );
}

update_option( 'twofolio_page', '999' );

/* PLEASE READ! This is the last area which needs editing! 

    1. You need to rename the four places of "twofolio" with your new custom post type name, let's say "threefolio"

*/

function krown_twofolio_enqueue() {

	global $post;

	if ( isset( $post ) ) {
		
		if ( is_page_template( 'template-twofolio.php' ) || is_singular( 'twofolio' ) ) {
			wp_enqueue_script( 'isotope', get_template_directory_uri().'/js/jquery.isotope.min.js', array('gsap'), NULL, true );
			wp_enqueue_script( 'mCustomScrollbar', get_template_directory_uri().'/js/jquery.mCustomScrollbar.min.js', array('gsap'), NULL, true );
			wp_enqueue_script( 'history', get_template_directory_uri().'/js/jquery.history.min.js', array('gsap'), NULL, true );
			wp_enqueue_script( 'msgbox', get_template_directory_uri().'/js/jquery.msgbox.min.js', array( 'gsap' ), NULL, true );
		}

	}

}

add_action( 'wp_enqueue_scripts', 'krown_twofolio_enqueue', 9 );

?>