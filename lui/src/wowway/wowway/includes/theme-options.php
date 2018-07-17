<?php

/**
 * Initialize the options before anything else.
 */
add_action( 'admin_init', 'custom_theme_options', 1 );

/**
 * Build the custom settings & update OptionTree.
 */
function custom_theme_options() {

  global $google_array;
  /**
   * Get a copy of the saved settings array. 
   */
  $saved_settings = get_option( 'option_tree_settings', array() );
  
  /**
   * Custom settings array that will eventually be 
   * passes to the OptionTree Settings API Class.
   */
  $custom_settings = array( 
    'contextual_help' => array(
      
      'sidebar'       => ''
    ),
    'sections'        => array( 
      array(
        'id'          => 'analytics',
        'title'       => 'Analytics'
      ),
      array(
        'id'          => 'css',
        'title'       => 'Custom CSS'
      ),
      array(
        'id'          => 'backgrounds',
        'title'       => 'Backgrounds'
      ),
      array(
        'id'          => 'admin',
        'title'       => 'Admin'
      ),
      array(
        'id'          => 'gmaps',
        'title'       => 'Google Maps API'
      ),
      array(
        'id'          => 'updates',
        'title'       => 'Updates'
      ),
      array(
        'id'          => 'log',
        'title'       => '<strong>Changelog</strong>'
      )
    ),
    'settings'        => array( 



      array(
        'id'          => 'krown_changelog',
        'label'       => 'Changelog', 'krown',
        'desc'        => '<ul>
<li><strong>Version 2.1.4: 10 January 2018</strong>
<br>~ Aixed an issue with videos in WordPress 4.9.1<br><br></li>
<li><strong>Version 2.1.3: 2 August 2017</strong>
<br>~ Added support for the new Google Maps API<br><br></li>
<li><strong>Version 2.1.2: 14 July 2016</strong>
<br>~ Added support for the new Google Maps API<br><br></li>
<li><strong>Version 2.1.1: 1 March 2016</strong>
<br>~ Fixed an issue with galleries in Firefox / WP 4.2<br><br></li>
<li><strong>Version 2.1: 12 December 2015</strong>
<br>~ Fixed an issue related to pagination in WP4.4<br><br></li>
<li><strong>Version 2.0.9: 11 December 2015</strong>
<br>~ Fixed some issues related to latest WordPress versions<br><br></li>
<li><strong>Version 2.0.8: 7 July 2015</strong>
<br>~ Fixed a security issue
<br>~ Enabled the use of theme shortcodes inside portfolio items
<br>~ Added a fail safe against Envato API issues (fixed admin login problems)<br><br></li>
<li><strong>Version 2.0.7: 23 January 2015</strong>
<br>~ Fixed an issue related to self hosted videos in WP 4.1
<br>~ Fixed a scrolling issue on mobile devices<br><br></li>
<li><strong>Version 2.0.6: 22 December 2014</strong>
<br>~ Fixed a critical error from last update<br><br></li>
<li><strong>Version 2.0.5: 20 December 2014</strong>
<br>~ Added WP 4.1 compatibility
<br>~ Fixed some other minor styling bugs
<br>~ Added changelog view in the backend<br><br></li>
<li><strong>Version 2.0.4: 18 September 2014</strong>
<br>~ Improved retina support
<br>~ Fixed an issue regarding Google Analytics
<br>~ Updated the child theme to support multiple portfolios<br><br></li>
<li><strong>Version 2.0.3: 16 August 2014</strong><br>
~ Fixed various bugs including the sidebar behavior on mobile devices<br><br></li>
<li><strong>Version 2.0.2: 16 July 2014</strong><br>
~ Fixed various bugs regarding portfolio projects scrolling and resizing, plus other simple style tweaks<br>
~ Updated Google Fonts list<br><br></li>
<li><strong>Version 2.0.1: 8 May 2014</strong><br>
~ Fixed the "closing project" bug<br>
~ Fixed "jump in view" bug in Chrome<br>
~ Fixed various style related bugs<br>
~ Removed the twitter & social widgets (replaced by shortcodes)<br><br></li>
<li><strong>Version 2.0: 26 April 2014</strong><br>
~ Complete code rewrite<br>
~ Improved portfolio management (drag&drop galleries are now available)<br>
~ Improved animations speed<br>
~ Added the option to choose modal window size per project<br>
~ Added the option to choose gallery resizing per project<br>
~ Added high resolution (retina) compatibility<br>
~ Added much more flexibility for grid thumbnails, regarding size, opacity and hover style<br>
~ Added support for the WP Theme Customizer and increased the number of available customization options<br>
~ Replaced the sliders with the awesome Swiper Slider<br>
~ Improved support for child themes and multiple portfolios<br>
~ Improved project sharing<br>
~ Integrated Google Analytics into AJAX portfolio<br>
~ Refreshed .po/.mo files<br>
~ Multiple categories per project are now supported<br>
~ Added more shortcodes<br>
~ Added password protected galleries<br>
~ Replaced the old hash method with the new History API<br>
~ Replaced the embedded shortcodes with Krown Shortcodes Plugin<br>
~ Replaced the embedded portfolio with Krown Portfolio Plugin<br><br></li>
<li><strong>Version 1.9.4: 15 August 2013</strong><br />
	~ Replaced the self hosted video player once and for all, with the mediaelement.js one, having a custom built skin<br />
	~ Made theme 100% compatible with WordPress 3.6</li><br />
<li><strong>Version 1.9.1: 12 February 2013</strong><br />		
	~ Improved gallery image resizing/cropping and created a new option to fit all images <br />
	~ Replaced the self hosted video player with a better one</li><br />
<li><strong>Version 1.9: 30 January 2013</strong><br />		
	~ Added theme options for a custom color, custom(via Google) fonts and custom css<br />
	~ Improved the functionality of the contact form<br />
	~ Added a fail safe for playing multiple videos at once in the portfolio slider<br />
	~ Fixed some IE8 issues</li><br />
<li><strong>Version 1.8.4 : 22 January 2013</strong><br />~ Fixed paginated portfolio number<br /><br /></li>
<li><strong>Version 1.8.3 : 2 January 2013</strong><br />~ Fixed more bugs<br /><br /></li>
<li><strong>Version 1.8.2 : 28 December 2012</strong><br />~ Fixed some bugs with the menus<br /><br /></li>
<li><strong>Version 1.8.1 : 13 December 2012</strong><br />~ Added WordPress 3.5 compatibility<br /><br /></li>
<li><strong>Version 1.8: 4 December 2012</strong><br />	
        ~ Added the option link pages from the main portfolio grid</li><br />
<li><strong>Version 1.7: 27 November 2012</strong><br />		
        ~ Added the option to have automatic updates via WordPress Dashboard<br />
	~ Made tabs & toggles to work inside project pages<br />
	~ Fixed gallery filtering order<br />
	~ Fixed multiple toggles/tabs on a page issue<br />
	~ Fixed some other bugs</li><br />
<li><strong>Version 1.6.3: 5 October 2012</strong><br />	
        ~ Fixed some bugs, such the twitter widget, the iPhone header, self hosted videos and IE8 issues..</li><br />
<li><strong>Version 1.6: 25 September 2012</strong><br />	
        ~ Added the option to choose a location(header/footer) for the Anaylitics scripts<br />
	~ Disabled self hosted videos fullscreen button due to theme incompatibility issues<br />
	~ Fixed paginated portfolio search issues<br />
	~ Fixed facebook like button issues<br />
	~ Fixed other minor bugs</li><br />
<li><strong>Version 1.5.2: 17 August 2012</strong><br />
	~ Fixed a small bug regarding blog slider images not showing up in Chrome/Safari</li><br />
<li><strong>Version 1.5.1: 8 August 2012</strong><br />
	~ Fixed memory bug when selecting a new category while a project is opened<br />
	~ Fixed portfolio pagination for small screens</li><br />
<li><strong>Version 1.5: 1 August 2012</strong><br />
	~ Added self hosted videos support for projects<br />
	~ Added a paginated portfolio page template(which also gives you the possibility to use multiple categories on a project)<br />
	~ Fixed the project window closing: when you click any category, the project/gallery will close, and we\'ve also added "modal" feature for the project window<br />
	~ Fixed iPhone "forever closed" menu isssue<br />
	~ Fixed Safari "never opening" projects<br />
	~ Other small bugs were "smashed" in the process of this update :)</li><br />
<li><strong>Version 1.3: 28 June 2012</strong><br />
	~ Added a new page template - Fullscreen Video<br />
	~ Added another widget area, at the bottom of the sidebar<br />
	~ Added submenu pages(not filters) to mobile navigation menu<br />
	~ Added portfolio/gallery filters to admin panel<br />
	~ Fixed sharing issues<br />
	~ Fixed other minor bugs</li><br />
<li><strong>Version 1.2.1: 11 June 2012</strong><br />
	~ Fixed some minor bugs</li><br />
<li><strong>Version 1.2: 9 June 2012</strong><br />
	~ Made the phone widget number callable<br />
	~ Added basic touch & swipe functionalities for touchscreen devices<br />
	~ Added scrollbar support for project pages<br />
	~ Added 8 more social icons<br />
	~ Added password protected projects<br />
	~ Added scroll top top functionality after filtering projects<br />
	~ Added scroll back to viewed items after closing project window<br />
	~ Added the ability to have sharing options in the projects page</li><br />
<li><strong>Version 1.1.5 : 29 May 2012</strong><br />
	~ Made a layered PNG file for the sprites<br />
	~ Fixed menu category filtering<br />
	~ Fixed the \'jump to top\' feature when opening projects on a mobile device</li><br />
<li><strong>Version 1.1.3 : 26 May 2012</strong><br />
	~ Fixed the sub menu weird arrows display<br />
	~ Changed the position of custom.css<br />
	~ Fixed other small bugs</li><br />
<li><strong>Version 1.1 : 23 May 2012</strong><br />
	~ Social media links open now in a new tab<br />
	~ Back to top link(on mobile devices) fixed<br />
	~ Fixed favicon and initial # issue<br />
	~ Added the ability to disable sidebar autohide<br />
	~ Added the option to center the posts & pages<br />
	~ Added the option to fit all portrait images from the fullscreen slideshows<br />
	~ Added the ability to link directly to portfolio categories<br />
	~ Added a custom.css in which you can add custom css rules, that will not be overwritten by future updates<br />
	~ Created a new twitter widget that you can put in the footer<br />
	~ Created a new page template featuring a fullscreen slideshow<br />
	~ Created a new blog layout template, featuring full width posts & thumbs</li><br />
<li><strong>Version 1.0.1 : 19 May 2012</strong><br />~ Fixed double portfolio issue</li></ul>',
        'std'         => '',
        'type'        => 'textblock',
        'section'     => 'log',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => ''
      ),


      array(
        'id'          => 'krown_tracking_enable',
        'label'       => 'Enable analytics',
        'desc'        => 'Please select this if you\'ll be using Google Analytics in the theme.',
        'std'         => 'disabled',
        'type'        => 'radio',
        'section'     => 'analytics',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '',
        'class'       => '',
        'choices'     => array( 
          array(
            'value'       => 'enabled',
            'label'       => 'Enabled',
            'src'         => ''
          ),
          array(
            'value'       => 'disabled',
            'label'       => 'Disabled',
            'src'         => ''
          )
        ),
      ),
      array(
        'id'          => 'krown_gmaps',
        'label'       => 'Google Maps API (v3) key',
        'desc'        => 'Since Google Maps changed their API to version 3, all the embedded maps need an API key in order to run. Maps on old sites will still work, but new ones don\'t. <br><br>If this is the case for you, <a href="https://developers.google.com/maps/documentation/javascript/get-api-key#key" target="_blank">read this article</a> or <a href="https://www.youtube.com/watch?v=OH98za14LNg" target="_blank">watch this video</a> (up until 2:00) to learn how to obtain a proper API key.',
        'std'         => '',
        'type'        => 'text',
        'section'     => 'gmaps',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '',
        'class'       => ''
      ),


      array(
        'id'          => 'krown_tracking',
        'label'       => 'Analytics code',
        'desc'        => 'Put your Analytics code inside here. Make sure you include the entire script, not just your ID.',
        'std'         => '',
        'type'        => 'textarea-simple',
        'section'     => 'analytics',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '',
        'class'       => ''
      ),
      array(
        'id'          => 'krown_custom_css',
        'label'       => 'Custom CSS',
        'desc'        => 'Write any custom css here. Please don\'t change theme files, because you won\'t be able to easily update in the future.',
        'std'         => '',
        'type'        => 'css',
        'section'     => 'css',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '',
        'class'       => ''
      ),
      array(
        'id'          => 'krown_custom_login_logo_uri',
        'label'       => 'Admin logo',
        'desc'        => 'Add a custom <strong>273x63</strong> image for the WordPress login page.',
        'std'         => '',
        'type'        => 'upload',
        'section'     => 'admin',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '',
        'class'       => ''
      ),
      array(
        'id'          => 'krown_updates_about',
        'label'       => 'About',
        'desc'        => 'These two fields are required for the theme automatic updates. If you want to protect yourself against security attacks and have the latest features available as soon as they appear, you should complete this section, and you\'ll be notified about new theme updates whenever they appear on ThemeForest.',
        'std'         => '',
        'type'        => 'textblock',
        'section'     => 'updates',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '',
        'class'       => ''
      ),
      array(
        'id'          => 'krown_updates_user',
        'label'       => 'Username',
        'desc'        => 'Please insert your ThemeForest username.',
        'std'         => '',
        'type'        => 'text',
        'section'     => 'updates',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '',
        'class'       => ''
      ),
      array(
        'id'          => 'krown_updates_api',
        'label'       => 'API Key',
        'desc'        => 'Please insert your <a target="_blank" href="http://themeforest.net/help/api">ThemeForest API key</a>.',
        'std'         => '',
        'type'        => 'text',
        'section'     => 'updates',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'min_max_step'=> '',
        'class'       => ''
      ),

      array(
        'id'          => 'rb_backgrounds',
        'label'       => 'Website backgrounds',
        'desc'        => 'Create your custom backgrounds here.
In each page/post you\'ll be able to select a background from this list, or you can select a default one from here..',
        'std'         => '',
        'type'        => 'list-item',
        'section'     => 'backgrounds',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'settings'    => array( 
          array(
            'id'          => 'image',
            'label'       => 'Image',
            'desc'        => 'Upload an image for this background.',
            'std'         => '',
            'type'        => 'upload',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
          array(
            'id'          => 'default_posts',
            'label'       => 'Default for posts',
            'desc'        => 'Check if you want this background to be shown for all of your posts!',
            'std'         => '',
            'type'        => 'checkbox',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'yes',
                'label'       => 'Yes',
                'src'         => ''
              )
            ),
          ),
          array(
            'id'          => 'default_pages',
            'label'       => 'Default for pages',
            'desc'        => 'Check if you want this background to be shown for all of your pages!',
            'std'         => '',
            'type'        => 'checkbox',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'yes',
                'label'       => 'Yes',
                'src'         => ''
              )
            ),
          )
        )
      )
    )
  );
   
  /* settings are not the same update the DB */
  if ( $saved_settings !== $custom_settings ) {
    update_option( 'option_tree_settings', $custom_settings ); 
  }
  
}