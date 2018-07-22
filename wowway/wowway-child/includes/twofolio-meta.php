<?php

// BELOW THERE IS NO EDITING NEEDED! just replace "twofolio" with your custom post type

add_action( 'admin_init', 'twofolio_meta' );

function twofolio_meta() {

  $krown_project_media = array(
    'id'        => 'krown_project_media',
    'title' => 'Project Media',
    'desc' => 'This field controls the <strong>media of the project</strong>. The galleries are managed via the basic WordPress gallery so it\'s easy for you to just drag & drop images into the library and create your gallery directly from here. If you want videos, when you upload a picture (which will be the video poster), you can also see fields for controlling the video. Just fill them as the instructions there and you\'ll have video slides.',
    'pages' => array( 'twofolio' ),
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
    'pages'     => array( 'twofolio' ),
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

  ot_register_meta_box($krown_project_media);
  ot_register_meta_box($krown_project_options);

}

?>