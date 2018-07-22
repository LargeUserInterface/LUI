<?php
/**
 * This file has the purpose to help the transitions from an older version of the theme to a new one (specifically to 1.5 from all prior versions).
 */

function krown_update_setup(){

	// When i moved most stlying options out of OptionTree into the WP Theme Customizer i had to redefine all of them. Here's an array of the old OT options which will get into the WP options array on first theme init.

	$old_new_options = array(
		'rb_color_accent' => 'krown_colors[main]',
		'rb_logo_path' => 'krown_logo',
		'rb_favicon' => 'krown_fav',
		'rb_site_style' => 'krown_site_style',
		'rb_sidebar_autoclose2' => 'krown_sidebar_hide',
		'rb_layout_center' => 'krown_layout_style',
		'rb_blog_layout' => 'krown_blog_style',
		'rb_footer_text' => 'krown_footer_copy',
		'rb_images_fit' => 'krown_gallery_fit'
	);

	foreach ( $old_new_options as $old_option => $new_option ) {
		
		if ( ot_get_option( $old_option ) != '' && ! get_option( $new_option ) ) {
			add_option( $new_option, ot_get_option( $old_option ) );
		}

	}

	// Fix all media

	$args = array( 
		'posts_per_page' => -1, 
		'offset'=> 0,
		'post_type' => array( 'portfolio', 'gallery', 'post', 'page' ),
	);

	$all_posts = new WP_Query( $args );
	$i = 0;
	while( $all_posts->have_posts() ) : $all_posts->the_post();
		global $post;
		krown_change_gallery( $post->ID );
	endwhile;
	
}

function krown_change_gallery( $post_id ) {

	if ( get_post_meta( $post_id, 'pp_gallery_slider', true ) == '' && ! get_post_meta( $post_id, 'krown_fixed_fgal', true ) == 'fixed' ) {

		$new_gallery_string = '';

		$slider_images = get_post_meta( $post_id, 'rb_post_sliderc2', true );

		if ( isset( $slider_images ) && ! empty( $slider_images ) ) {

			foreach ( $slider_images as $key => $value ) {

				if ( is_numeric( $value ) ) {

					// Most simple - attached images

					$new_gallery_string .= $value . ',';

				} else {

					$attachment_id = pn_get_attachment_id_from_url($value);

					if ( $attachment_id != false ) {
						$new_gallery_string .= $attachment_id . ',';
					}

				}

			}

		}

    	update_post_meta( $post_id, 'pp_gallery_slider', substr( $new_gallery_string, 0, -1 ) );
    	update_post_meta( $post_id, 'krown_fixed_fgal', 'fixed' );

    	// Video stuff?!

    	if ( get_post_meta( $post_id, 'rb_post_video', true ) != '' ) {
    		update_post_meta( $post_id, 'krown_iframe', get_post_meta( $post_id, 'rb_post_video', true ) );
    		update_post_meta( $post_id, 'krown_post_header', 'iframe' );
    	} 
    	if ( get_post_meta( $post_id, 'pp_gallery_slider', true ) != '' ) {
    		update_post_meta( $post_id, 'krown_post_header', 'slider' );
    	}

    }

}

// Display update notice if required

add_action( 'admin_notices', 'krown_update_notice_old' );

function krown_update_notice_old() {

	if ( get_option( 'krown_updated_20' ) != 'yes' ) {

        echo '<div class="updated">
        	<h3>You have just updated to version 2.0! Please read this carefully before doing anything else!</h3>
        	<ol>
        		<li>Make sure that you read the guide before doing anything else. <a target="_blank" href="http://demo.krownthemes.com/help/wowway-update.pdf">Click here!</a></li>
        		<li>Make sure that you install the two plugins which are now required. <em>Go to Appearance > Install Plugins</em>.</li>
        		<li>After you\'ve done these two steps, please update the media, by hitting the button below!</li>
        	</ol>';

        printf(__('<a class="button button-primary" href="%1$s">Update Media</a>'), '?krown_update_done_do=0');

        printf(__('<p><em>If this is a fresh installation, please <strong><a href="%1$s">dismiss this message</a></strong></em></p>'), '?krown_update_done_do=1');

        echo "<p></p></div>";

	}

}
add_action( 'admin_init', 'krown_update_done_do_old' );

function krown_update_done_do_old() {
	global $current_user;
    $user_id = $current_user->ID;
    if ( isset( $_GET['krown_update_done_do'] ) && '0' == $_GET['krown_update_done_do'] ) {
        add_option( 'krown_updated_20', 'yes' );
        krown_update_setup();
	} else if ( isset( $_GET['krown_update_done_do'] ) && '1' == $_GET['krown_update_done_do'] ) {
        add_option( 'krown_updated_20', 'yes' );
	}
}


// Function that gets the attachmenet id by url

function pn_get_attachment_id_from_url( $attachment_url = '' ) {
 
	global $wpdb;
	$attachment_id = false;
 
	// If there is no url, return.
	if ( '' == $attachment_url )
		return;
 
	// Get the upload directory paths
	$upload_dir_paths = wp_upload_dir();
 
	// Make sure the upload path base directory exists in the attachment URL, to verify that we're working with a media library image
	if ( false !== strpos( $attachment_url, $upload_dir_paths['baseurl'] ) ) {
 
		// If this is the URL of an auto-generated thumbnail, get the URL of the original image
		$attachment_url = preg_replace( '/-\d+x\d+(?=\.(jpg|jpeg|png|gif)$)/i', '', $attachment_url );
 
		// Remove the upload path base directory from the attachment URL
		$attachment_url = str_replace( $upload_dir_paths['baseurl'] . '/', '', $attachment_url );
 
		// Finally, run a custom database query to get the attachment ID from the modified attachment URL
		$attachment_id = $wpdb->get_var( $wpdb->prepare( "SELECT wposts.ID FROM $wpdb->posts wposts, $wpdb->postmeta wpostmeta WHERE wposts.ID = wpostmeta.post_id AND wpostmeta.meta_key = '_wp_attached_file' AND wpostmeta.meta_value = '%s' AND wposts.post_type = 'attachment'", $attachment_url ) );
 
	}
 
	return $attachment_id;
}

/**
 * The shortcodes have changed in version 2.0, so we need to provide backwards compatibily for content created before this version.
 */

// Fix grids

global $column_time;
$column_time = 0;

function fix_wrapper( $no ) {

	global $column_time;
	$el_position = '';

	if ( $column_time == 0 ) {
		$column_time++;
		$el_position = ' el_position="first"';
	} else if ( ++ $column_time == $no ) {
		$column_time = 0;
		$el_position = ' el_position="last"';
	}

	return $el_position;

}

function full_width_shortcode($atts, $content){
	return do_shortcode( '[krown_column width="1/1" el_position="first last"]' . $content . '[/krown_column]' );
}
function one_half_shortcode($atts, $content){
	return do_shortcode( '[krown_column width="1/2"' . fix_wrapper( 2 ) . ']' . $content . '[/krown_column]' );
}
function one_third_shortcode($atts, $content){
	return do_shortcode( '[krown_column width="1/3"' . fix_wrapper( 3 ) . ']' . $content . '[/krown_column]' );
}
function one_fourth_shortcode($atts, $content){
	return do_shortcode( '[krown_column width="1/4"' . fix_wrapper( 4 ) . ']' . $content . '[/krown_column]' );
}
function clear_shortcode($atts, $content){ 
	return '';
}
function one_half_child_shortcode($atts, $content){
	return do_shortcode( '[krown_column width="1/2' . fix_wrapper( 2 ) . ']' . do_shortcode( $content ) . '[/krown_column]' );
}

// The following shortcodes need more refinement, since some properties are changed in the Krown Shortcodes plugin - that's why these shortcodes actually call for other ones

function rb_alert_box_shortcode($atts, $content){
	return do_shortcode( '[krown_alert type="' . $atts['style'] . '"]' . $content . '[/krown_alert]' );
}
function rb_button_shortcode($atts, $content){
	return do_shortcode( '[krown_button label="' . $atts['label'] . '" target="' . $atts['target'] . '" style="' . $atts['style'] . '" color="' . $atts['color'] . '" url="' . $atts['link'] . '" /]' );
}

// Because v2.0 uses CSS classes for lists or blockquotes, these shortcode need to remain, in order to provide backwards compatibility

function rb_list_shortcode($atts, $content){
	return '<ul class="krown-list ' . $atts['type'] . '">' . do_shortcode($content) . '</ul>';
}
function rb_list_item_shortcode($atts, $content){
	return '<li>' . $content . '</li>';
}
function rb_quote_shortcode($atts, $content){
	return '<blockquote>' . $content . '</blockquote>';
}
function rb_divider_shortcode(){
	return '<hr />';
}
function rb_dropcap_shortcode($atts, $content){
	return '<span class="dropcap ' . $atts['style'] . '">' . $content . '</span>';
}
function rb_highlight_shortcode($atts, $content){
	return '<mark>' . $content . '</mark>';
}

// These shortcodes were really similar in structure, so a simple swap is enough

add_shortcode( 'rb_text_box', 'krown_box_function' );
add_shortcode( 'rb_tabs', 'krown_tabs_function' );
add_shortcode ('rb_tab', 'krown_tabs_section_function' );
add_shortcode( 'rb_toggles', 'krown_accordion_function' );
add_shortcode( 'rb_toggle', 'krown_accordion_section_function' );

// These shortcodes remain the same - as they were

add_shortcode('full_width', 'full_width_shortcode');
add_shortcode('one_half', 'one_half_shortcode');
add_shortcode('one_third', 'one_third_shortcode');
add_shortcode('one_fourth', 'one_fourth_shortcode');
add_shortcode('clear', 'clear_shortcode');
add_shortcode('one_half_child', 'one_half_child_shortcode');
add_shortcode('rb_alert_box', 'rb_alert_box_shortcode');
add_shortcode('rb_button', 'rb_button_shortcode');
add_shortcode('rb_list', 'rb_list_shortcode');
add_shortcode('rb_list_item', 'rb_list_item_shortcode');
add_shortcode('rb_quote', 'rb_quote_shortcode');
add_shortcode('rb_divider', 'rb_divider_shortcode');
add_shortcode('rb_dropcap', 'rb_dropcap_shortcode');
add_shortcode('rb_highlight', 'rb_highlight_shortcode');

?>