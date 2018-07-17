<?php
/**
 * This file represents an example of the code that themes would use to register
 * the required plugins.
 *
 * It is expected that theme authors would copy and paste this code into their
 * functions.php file, and amend to suit.
 *
 * @package	   TGM-Plugin-Activation
 * @subpackage Example
 * @version	   2.3.6
 * @author	   Thomas Griffin <thomas@thomasgriffinmedia.com>
 * @author	   Gary Jones <gamajo@gamajo.com>
 * @copyright  Copyright (c) 2012, Thomas Griffin
 * @license	   http://opensource.org/licenses/gpl-2.0.php GPL v2 or later
 * @link       https://github.com/thomasgriffin/TGM-Plugin-Activation
 */

require_once get_template_directory() . '/includes/class-tgm-plugin-activation.php';

add_action( 'tgmpa_register', 'krown_register_required_plugins' );

function krown_register_required_plugins() {

	$plugins = array(

        array(
            'name'      => 'oAuth Twitter Feed for Developers',
            'slug'      => 'oauth-twitter-feed-for-developers',
            'required'  => true,
            'version' => '2.1.4',
            'force_activation' => false
        ),

        array(
			'name'     				=> 'Krown Portfolio', 
			'slug'     				=> 'krown-portfolio', 
			'source'   				=> get_stylesheet_directory() . '/includes/plugins/krown-portfolio.zip', 
			'required' 				=> true, 
			'version' 				=> '0.2', 
			'force_activation' 		=> false, 
			'force_deactivation' 	=> false,
			'external_url' 			=> ''
		),

		array(
			'name'     				=> 'Krown Shortcodes', 
			'slug'     				=> 'krown-shortcodes',
			'source'   				=> get_stylesheet_directory() . '/includes/plugins/krown-shortcodes.zip', 
			'required' 				=> true,
			'version' 				=> '0.6',
			'force_activation' 		=> false,
			'force_deactivation' 	=> false, 
			'external_url' 			=> ''
		)

	);

	
	$config = array(
		'id'           => 'krown',                 // Unique ID for hashing notices for multiple instances of TGMPA.
		'default_path' => '',                      // Default absolute path to bundled plugins.
		'menu'         => 'tgmpa-install-plugins', // Menu slug.
		'has_notices'  => true,                    // Show admin notices or not.
		'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
		'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
		'is_automatic' => false,                   // Automatically activate plugins after installation or not.
		'message'      => '',                      // Message to output right before the plugins table.
	);

	tgmpa( $plugins, $config );

}