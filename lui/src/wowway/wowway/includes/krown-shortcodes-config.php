<?php

/* ------------------------
-----   Buttons    -----
------------------------------*/

$krown_shortcodes['button'] = array(
    'no_preview' => true,
    'params' => array(
        'url' => array(
            'std' => '',
            'type' => 'text',
            'label' => __('Button URL', 'textdomain'),
            'desc' => __('Add the button\'s url eg http://example.com.', 'textdomain')
        ),
        'color' => array(
            'type' => 'select',
            'label' => __('Button Color', 'textdomain'),
            'desc' => __('Select the button\'s color.', 'textdomain'),
            'options' => array(
                'light' => 'Light',
                'dark' => 'Dark'
            )
        ),
        'style' => array(
            'type' => 'select',
            'label' => __('Button Style', 'textdomain'),
            'desc' => __('Select the button\'s solor.', 'textdomain'),
            'options' => array(
                'normal' => 'Normal',
                'headed' => 'Arrow'
            )
        ),
        'target' => array(
            'type' => 'select',
            'label' => __('Button Target', 'textdomain'),
            'desc' => __('_self = open in same window. _blank = open in new window.', 'textdomain'),
            'options' => array(
                '_self' => '_self',
                '_blank' => '_blank'
            )
        ),
        'label' => array(
            'std' => 'Button Text',
            'type' => 'text',
            'label' => __('Button\'s Text', 'textdomain'),
            'desc' => __('Add the button\'s text.', 'textdomain'),
        )
    ),
    'shortcode' => '[krown_button url="{{url}}" color="{{color}}" style="{{style}}" target="{{target}}" label="{{label}}"]',
    'popup_title' => __('Insert Button', 'textdomain')
);


?>