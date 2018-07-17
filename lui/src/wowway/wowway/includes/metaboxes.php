<?php

/*---------------------------------
	Custom meta boxes setup
------------------------------------*/

add_action( 'admin_init', 'krown_meta_boxes' );

function krown_meta_boxes() {

    $backgrounds_array = array( array( 'label' => 'None', 'value' => 'None' ) );
    $backgrounds = ot_get_option( 'rb_backgrounds' );
    if ( isset( $backgrounds ) && ! empty( $backgrounds ) ) {
        foreach ( $backgrounds as $background ) {
            array_push( $backgrounds_array, array( 'label' => $background['title'], 'value' => $background['title'] ) );
        }
    }

  $krown_project_media = array(
    'id'        => 'krown_project_media',
    'title' => 'Project Media',
    'desc' => 'This field controls the <strong>media of the project</strong>. The galleries are managed via the basic WordPress gallery so it\'s easy for you to just drag & drop images into the library and create your gallery directly from here. If you want videos, when you upload a picture (which will be the video poster), you can also see fields for controlling the video. Just fill them as the instructions there and you\'ll have video slides.',
    'pages' => array( 'portfolio', 'gallery' ),
    'context' => 'normal',
    'priority' => 'high',
    'fields' => array(
        array(
          'label' => 'Gallery slider',
          'id' => 'pp_gallery_slider',
          'type' => 'gallery',
          'desc' => 'Click Create Slider to create your gallery for slider.',
          'post_type' => 'post'
          )
        )
    );

  $krown_project_options = array(
    'id'        => 'krown_project_options',
    'title'     => 'Project Options',
    'desc'      => 'Please use the following fields to configure this project. You can change them at any time later.',
    'pages'     => array( 'portfolio' ),
    'context'   => 'normal',
    'priority'  => 'high',
    'fields'    => array(
        array(
            'id'          => '_me_desc',
            'label'       => '<span style="display: block; color: rgb(26, 141, 247); font-size: 1.1em ! important; margin-bottom: -20px; background: none repeat scroll 0% 0% rgb(255, 255, 255);">Modal Window Settings</span>',
            'desc'        => 'The settings below control the aspect of the modal window. You can change the size as you wish, but remember that all iamges will need to have the same size.',
            'std'         => '',
            'type'        => 'textblock-titled',
            'class'       => 'large-heading'
            ),
        array(
            'id'          => 'krown_project_m_width',
            'label'       => 'Window width (px)',
            'desc'        => '',
            'std'         => '910',
            'type'        => 'text'
            ),
        array(
            'id'          => 'krown_project_m_height',
            'label'       => 'Window height (px)',
            'desc'        => '',
            'std'         => '480',
            'type'        => 'text'
            ),
        array(
            'id'          => 'krown_project_m_slider_width',
            'label'       => 'Slider width (px)',
            'desc'        => 'The sider\'s height will be equal to the height of the entire window.',
            'std'         => '600',
            'type'        => 'text'
            ),
        array(
            'id'          => '_me_desc_7',
            'label'       => '<span style="display: block; color: rgb(26, 141, 247); font-size: 1.1em ! important; margin-bottom: -20px; background: none repeat scroll 0% 0% rgb(255, 255, 255);">Project Password</span>',
            'desc'        => 'If you want this project to be password-protected, fill in a password below and only users with the password will be able to access it.',
            'std'         => '',
            'type'        => 'textblock-titled',
            'class'       => ''
            ),
        array(
            'id'          => 'rb_post_pass',
            'label'       => 'Password',
            'desc'        => '',
            'std'         => '',
            'type'        => 'text'
            ),
        array(
            'id'          => '_me_desc_5',
            'label'       => '<span style="display: block; color: rgb(26, 141, 247); font-size: 1.1em ! important; margin-bottom: -20px; background: none repeat scroll 0% 0% rgb(255, 255, 255);">Custom URL</span>',
            'desc'        => 'If you don\'t want this certain thumbnail to be an actual project, but to open a custom url instead, use the following fields to configure this.',
            'std'         => '',
            'type'        => 'textblock-titled',
            'class'       => ''
            ),
        array(
            'id'          => 'rb_post_url_d',
            'label'       => 'URL',
            'desc'        => '',
            'std'         => '',
            'type'        => 'text'
            ),
        array(
            'id'          => 'krown_project_custom_target',
            'label'       => 'Target',
            'desc'        => '',
            'std'         => '_self',
            'type'        => 'select',
            'choices'     => array(
                array( 
                    'label' => '_self',
                    'value' => '_self'
                    ),
                array( 
                    'label' => '_blank',
                    'value' => '_blank'
                    )
                )
            )
        )
	);

  $krown_gallery_options = array(
    'id'        => 'krown_gallery_options',
    'title'     => 'Project Options',
    'desc'      => 'Please use the following fields to configure this project. You can change them at any time later.',
    'pages'     => array( 'gallery' ),
    'context'   => 'normal',
    'priority'  => 'high',
    'fields'    => array(
        array(
            'id'          => 'krown_project_fit',
            'label'       => 'Image resizing',
            'desc'        => 'If anything than "default", will overwrite the general setting from the Theme Customizer.',
            'std'         => 'default',
            'type'        => 'radio',
            'class'       => '',
            'choices'     => array(
                array(
                    'value' => 'default',
                    'label' => 'Default'
                    ),
                array(
                    'value' => 'fit',
                    'label' => 'Fit'
                    ),
                array(
                    'value' => 'fill',
                    'label' => 'Fill'
                    )
                )
            ),
        array(
            'id'          => '_me_desc_7',
            'label'       => '<span style="display: block; color: rgb(26, 141, 247); font-size: 1.1em ! important; margin-bottom: -20px; background: none repeat scroll 0% 0% rgb(255, 255, 255);">Project Password</span>',
            'desc'        => 'If you want this project to be password-protected, fill in a password below and only users with the password will be able to access it.',
            'std'         => '',
            'type'        => 'textblock-titled',
            'class'       => ''
            ),
        array(
            'id'          => 'rb_post_pass',
            'label'       => 'Password',
            'desc'        => '',
            'std'         => '',
            'type'        => 'text'
            ),
        array(
            'id'          => '_me_desc_5',
            'label'       => '<span style="display: block; color: rgb(26, 141, 247); font-size: 1.1em ! important; margin-bottom: -20px; background: none repeat scroll 0% 0% rgb(255, 255, 255);">Custom URL</span>',
            'desc'        => 'If you don\'t want this certain thumbnail to be an actual project, but to open a custom url instead, use the following fields to configure this.',
            'std'         => '',
            'type'        => 'textblock-titled',
            'class'       => ''
            ),
        array(
            'id'          => 'rb_post_url_d',
            'label'       => 'URL',
            'desc'        => '',
            'std'         => '',
            'type'        => 'text'
            ),
        array(
            'id'          => 'krown_project_custom_target',
            'label'       => 'Target',
            'desc'        => '',
            'std'         => '_self',
            'type'        => 'select',
            'choices'     => array(
                array( 
                    'label' => '_self',
                    'value' => '_self'
                    ),
                array( 
                    'label' => '_blank',
                    'value' => '_blank'
                    )
                )
            )
        )
	);

  $krown_page_options = array(
    'id'        => 'krown_page_options',
    'title'     => 'Page / Post Options',
    'desc'      => '',
    'pages'     => array( 'page', 'post' ),
    'context'   => 'normal',
    'priority'  => 'high',
    'fields'    => array(
        array(
            'id'          => 'rb_post_backgrounda',
            'label'       => 'Background',
            'desc'        => 'If you want a special background for this post, just select one from the list below. If you have a default background set for all posts, just leave this at none and that background will be used.',
            'std'         => 'default',
            'type'        => 'select',
            'class'       => '',
            'choices'     => $backgrounds_array
            ),
        array(
            'id'          => 'krown_post_header',
            'label'       => 'Custom header',
            'desc'        => '',
            'std'         => 'none',
            'type'        => 'select',
            'choices'     => array(
                array( 
                    'label' => 'None',
                    'value' => 'none'
                    ),
                array( 
                    'label' => 'Slider',
                    'value' => 'slider'
                    ),
                array( 
                    'label' => 'Iframe',
                    'value' => 'iframe'
                    )
                )
            ),
        array(
            'id'          => 'rb_post_height',
            'label'       => 'Custom header height',
            'desc'        => 'If you\'re using a custom header (slider or iframe) in this page, please make sure that you write it\'s height here. (px)',
            'std'         => '',
            'type'        => 'text'
            ),
        array(
            'label' => 'Slider content',
            'id' => 'pp_gallery_slider',
            'type' => 'gallery',
            'desc' => 'Click Create Slider to create your gallery for the page slider slider (optional).'
            ),
        array(
            'label' => 'Iframe content',
            'id' => 'krown_iframe',
            'type' => 'textarea-simple',
            'desc' => 'Insert the entire code from the site where you\'re embedding from.'
            )
        )
    );


  $krown_blog_options = array(
    'id'        => 'krown_blog_options',
    'title'     => 'Page Options',
    'desc'      => '',
    'pages'     => array( 'page' ),
    'context'   => 'normal',
    'priority'  => 'high',
    'fields'    => array(
        array(
            'id'          => 'rb_post_backgrounda',
            'label'       => 'Background',
            'desc'        => 'If you want a special background for this post, just select one from the list below. If you have a default background set for all posts, just leave this at none and that background will be used.',
            'std'         => 'default',
            'type'        => 'select',
            'class'       => '',
            'choices'     => $backgrounds_array
            )
        )
    );

    $krown_contact_info = array(
      'id'        => 'krown_contact_info',
      'title' => 'Page Options',
      'desc' => '',
      'pages' => array( 'page' ),
      'context' => 'normal',
      'priority' => 'high',
      'fields' => array(
        array(
            'id'          => '_me_desc_5',
            'label'       => '<span style="display: block; color: rgb(26, 141, 247); font-size: 1.1em ! important; margin-bottom: -20px; background: none repeat scroll 0% 0% rgb(255, 255, 255);">Contact Info</span>',
            'desc'        => 'Use the following fields to configure the information which appears in the right side of this page.',
            'std'         => '',
            'type'        => 'textblock-titled',
            'class'       => ''
            ),
        array(
          'label' => 'Section Title',
          'id' => 'krown_c_title_1',
          'type' => 'text',
          'desc' => '',
          'std' => ''
          ),
        array(
          'label' => 'Phone number(s)',
          'id' => 'krown_c_phone',
          'type' => 'textarea-simple',
          'desc' => 'Write your phone number(s) here. Each one needs to be on a new line. <br><br>To create a link you need to wrap the phone number into a proper HTML tag, <a href="http://css-tricks.com/snippets/html/iphone-calling-and-texting-links/" target="_blank">like this</a>.<br><br><em>(optional field)</em>',
          'std' => ''
          ),
        array(
          'label' => 'Email address(es)',
          'id' => 'krown_c_email',
          'type' => 'textarea-simple',
          'desc' => 'Write your email address(es) here. Each one needs to be on a new line. <br><br>To create a link you need to wrap the email address into a proper HTML tag, <a href="http://css-tricks.com/snippets/html/mailto-links/" target="_blank">like this</a>.<br><br><em>(optional field)</em>',
          'std' => ''
          ),
        array(
          'label' => 'Physical address(es)',
          'id' => 'krown_c_address',
          'type' => 'textarea-simple',
          'desc' => 'Write your physical address(es) here. Each one needs to be on a new line. <em>(optional field)</em>',
          'std' => ''
          ),
        array(
            'id'          => '_me_desc_5',
            'label'       => '<span style="display: block; color: rgb(26, 141, 247); font-size: 1.1em ! important; margin-bottom: -20px; background: none repeat scroll 0% 0% rgb(255, 255, 255);">Contact Form</span>',
            'desc'        => 'Use the following fields to configure the contact form for this page.',
            'std'         => '',
            'type'        => 'textblock-titled',
            'class'       => ''
            ),
        array(
          'label' => 'Section Title',
          'id' => 'krown_c_title_2',
          'type' => 'text',
          'desc' => '',
          'std' => ''
          ),
        array(
          'label' => 'Recipent Email',
          'id' => 'krown_f_sendto',
          'type' => 'text',
          'desc' => 'Write the email address where you want to receive the emails.',
          'std' => ''
          ),
        array(
          'label' => 'Name Label',
          'id' => 'krown_f_name',
          'type' => 'text',
          'desc' => 'Write a label for the form\'s name field.',
          'std' => 'Name *'
          ),
        array(
          'label' => 'Email Label',
          'id' => 'krown_f_email',
          'type' => 'text',
          'desc' => 'Write a label for the form\'s email field.',
          'std' => 'Email *'
          ),
        array(
          'label' => 'Message Label',
          'id' => 'krown_f_message',
          'type' => 'text',
          'desc' => 'Write a label for the form\'s message field.',
          'std' => 'Message *'
          ),
        array(
          'label' => 'Submit Label',
          'id' => 'krown_f_submit',
          'type' => 'text',
          'desc' => 'Write a label for the form\'s submit button.',
          'std' => 'Send'
          ),
        array(
          'label' => 'Error Message',
          'id' => 'krown_f_error',
          'type' => 'textarea-simple',
          'desc' => 'Write some text to show when a user doesn\'t fill all fields or the information is incorrectly written.',
          'std' => ''
          ),
        array(
          'label' => 'Success Message',
          'id' => 'krown_f_success',
          'type' => 'textarea-simple',
          'desc' => 'Write some text to show when a user successfully sends you an email.',
          'std' => ''
          )
        )
    );

    $krown_contact_map = array(
      'id'        => 'krown_contact_map',
      'title' => 'Map Options',
      'desc' => 'Use the following fields to configure this page\'s map.',
      'pages' => array( 'page' ),
      'context' => 'normal',
      'priority' => 'high',
      'fields' => array(
        array(
            'id'          => 'rb_post_backgrounda',
            'label'       => 'Background',
            'desc'        => 'If you want a special background for this post, just select one from the list below. If you have to use the map, configure it below.',
            'std'         => 'default',
            'type'        => 'select',
            'class'       => '',
            'choices'     => $backgrounds_array
            ),
        array(
          'label' => 'Enable map',
          'id' => 'krown_show_map',
          'type' => 'radio',
          'desc' => '',
          'std' => 'map-disable',
          'choices' => array(
            array(
                'value' => 'map-enable',
                'label' => 'Enabled'
                ),
            array(
                'value' => 'map-disable',
                'label' => 'Disabled'
                )
            )
          ),
        array(
          'label' => 'Map zoom level',
          'id' => 'krown_map_zoom',
          'type' => 'text',
          'desc' => 'Should be a number between 1 and 21.',
          'std' => '16'
          ),
        array(
          'label' => 'Map style',
          'id' => 'krown_map_style',
          'type' => 'radio',
          'desc' => '',
          'std' => 'true',
          'choices' => array(
            array(
                'value' => 'true',
                'label' => 'Greyscale'
                ),
            array(
                'value' => 'false',
                'label' => 'Default'
                )
            )
          ),
        array(
          'label' => 'Map latitude',
          'id' => 'krown_map_lat',
          'type' => 'text',
          'desc' => 'Enter a latitude coordinate for the map\'s center (your POI).',
          'std' => ''
          ),
        array(
          'label' => 'Map longitude',
          'id' => 'krown_map_long',
          'type' => 'text',
          'desc' => 'Enter a longitude coordinate for the map\'s center (your POI).',
          'std' => ''
          ),
        array(
          'label' => 'Show marker',
          'id' => 'krown_map_marker',
          'type' => 'radio',
          'desc' => '',
          'std' => 'true',
          'choices' => array(
            array(
                'value' => 'true',
                'label' => 'Show'
                ),
            array(
                'value' => 'false',
                'label' => 'Hide'
                )
            )
          ),
        array(
          'label' => 'Marker image',
          'id' => 'krown_map_img',
          'type' => 'upload',
          'desc' => 'Upload an image which will be the marker on your map.',
          'std' => ''
          )
        )
    );

    $krown_fullscreen_video = array(
      'id'        => 'krown_fullscreen_video',
      'title' => 'Video Options',
      'desc' => 'Use the following fields to configure this page\'s video.',
      'pages' => array( 'page' ),
      'context' => 'normal',
      'priority' => 'high',
      'fields' => array(
        array(
          'label' => 'Video MP4 File',
          'id' => 'rb_video_1',
          'type' => 'upload',
          'desc' => 'Upload or link to a .mp4 video file.',
          'std' => ''
        ),
        array(
          'label' => 'Video OGV File',
          'id' => 'rb_video_2',
          'type' => 'upload',
          'desc' => 'Upload or link to a .ogv video file.',
          'std' => ''
        ),
        array(
          'label' => 'Video Poster',
          'id' => 'rb_video_poster',
          'type' => 'upload',
          'desc' => 'Most devices (as in tablets or phones) don\t support video autoplay. You need to upload a poster image for such cases.',
          'std' => ''
        )
      )
    );

  $krown_fullscreen_slideshow = array(
    'id'        => 'krown_fullscreen_slideshow',
    'title'     => 'Slideshow Options',
    'desc'      => '',
    'pages'     => array( 'page' ),
    'context'   => 'normal',
    'priority'  => 'high',
    'fields'    => array(
        array(
            'label' => 'Slideshow content',
            'id' => 'pp_gallery_slider',
            'type' => 'gallery',
            'desc' => 'Click Create Slider to create your gallery for the page slider slider (optional).'
            ),
        array(
            'id'          => 'krown_slider_resize',
            'label'       => 'Slideshow resizing',
            'desc'        => '',
            'std'         => 'fill',
            'type'        => 'select',
            'choices'     => array(
                array( 
                    'label' => 'Fill',
                    'value' => 'fill'
                    ),
                array( 
                    'label' => 'Fit',
                    'value' => 'fit'
                    )
                )
            ),
        array(
            'id'          => 'krown_slider_autoplay',
            'label'       => 'Slideshow autoplay',
            'desc'        => '',
            'std'         => 'true',
            'type'        => 'select',
            'choices'     => array(
                array( 
                    'label' => 'Enabled',
                    'value' => 'true'
                    ),
                array( 
                    'label' => 'Disabled',
                    'value' => 'false'
                    )
                )
            ),
        array(
            'id'          => 'krown_slider_text',
            'label'       => 'Slideshow text',
            'desc'        => 'If enabled, a small content area similar with the gallery ones will appear and the text will be taken directly from the content area of this page.',
            'std'         => 'disabled',
            'type'        => 'select',
            'choices'     => array(
                array( 
                    'label' => 'Disabled',
                    'value' => 'disabled'
                    ),
                array( 
                    'label' => 'Enabled (maximized)',
                    'value' => 'enabled-max'
                    ),
                array( 
                    'label' => 'Enabled (minimized)',
                    'value' => 'enabled-min'
                    )
                )
            ),
        array(
            'id'          => 'krown_slider_share',
            'label'       => 'Slideshow sharing',
            'desc'        => 'Will appear only if the text area is enabled.',
            'std'         => 'show',
            'type'        => 'select',
            'choices'     => array(
                array( 
                    'label' => 'Show',
                    'value' => 'show'
                    ),
                array( 
                    'label' => 'Hide',
                    'value' => 'hide'
                    )
                )
            )
          ) 
      );

	   // Get post info

    $post_id = isset($_GET['post']) ? $_GET['post'] : (isset($_POST['post_ID']) ? $_POST['post_ID'] : 'no');
    $template_file = $post_id != 'no' ? get_post_meta($post_id,'_wp_page_template',TRUE) : 'no';

	 // Register boxes

  	ot_register_meta_box($krown_project_media);
  	ot_register_meta_box($krown_project_options);
  	ot_register_meta_box($krown_gallery_options);

    if ( $template_file == 'default' || ( $template_file == '' && $post_id != 'no' ) ) {
        ot_register_meta_box($krown_page_options);
    }

    if ( $template_file == 'template-contact.php' ) {
        ot_register_meta_box($krown_contact_info);
        ot_register_meta_box($krown_contact_map);
    } else if ( $template_file == 'template-video.php' ) {
      ot_register_meta_box($krown_fullscreen_video);
    } else if ( $template_file == 'template-slideshow.php' ) {
      ot_register_meta_box($krown_fullscreen_slideshow);
    } else if ( $template_file == 'template-blog.php' ) {
      ot_register_meta_box($krown_blog_options);
    }

}

?>