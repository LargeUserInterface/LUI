<?php

// This file contains an overwrite for the shortcodes availalble in the Krown Themes Shortcodes. These could easily be overwritten in a child theme.

/* ------------------------
-----   Accordion    -----
------------------------------*/

if ( ! function_exists( 'krown_accordion_function' ) ) {

    function krown_accordion_function( $atts, $content ){

        extract( shortcode_atts( array(
            'el_class'  => '',
            'type'      => 'accordion',
            'opened'    => '0'
        ), $atts ) );

        $html = '<div data-opened="' . $opened . '" class="krown-accordion ' . $type . ' ' . ( $el_class != '' ? ' ' . $el_class : '' ) . ' clearfix">';

        $html .= do_shortcode( $content );

        $html .= '</div>';

        return $html;

    }

    add_shortcode( 'krown_accordion', 'krown_accordion_function' );

}

if ( ! function_exists( 'krown_accordion_section_function' ) ) {

    function krown_accordion_section_function( $atts, $content ){

        extract( shortcode_atts( array(
            'title' => 'Section',
        ), $atts ) );

        $html = '<section>
            <h5>' . $title . '</h5>
            <div>' . do_shortcode( $content ) . '</div>
        </section>';

        return $html;

    }   

    add_shortcode( 'krown_accordion_section', 'krown_accordion_section_function' );

}

/* ------------------------
-----   Buttons    -----
------------------------------*/

if ( ! function_exists( 'krown_button_function' ) ) {

    function krown_button_function( $atts, $content ) { 

        extract( shortcode_atts( array(
            'el_class'  => '',
            'label'     => 'Button',
            'target'    => '_blank',
            'color'      => 'light',
            'style'      => 'normal',
            'url'       => '#'
        ), $atts ) );

        $html = '<a class="krown-button ' . $color . ' ' . $style . ($el_class != '' ? ' ' . $el_class : '') . '" href="' . $url . '" target="' . $target . '">' . $label . '</a>';
       
       return $html;

    }

    add_shortcode( 'krown_button', 'krown_button_function' );

}

/* ------------------------
-----   Gallery   -----
------------------------------*/

if ( ! function_exists( 'krown_gallery_function' ) ) {
   
    function krown_gallery_function( $attr ) {

        global $post;

        $post = get_post();

        static $instance = 0;
        $instance++;

        if ( ! empty( $attr['ids'] ) ) {
            if ( empty( $attr['orderby'] ) ) {
                $attr['orderby'] = 'post__in';
            }
            $attr['include'] = $attr['ids'];
        }

        $html = apply_filters( 'post_gallery', '', $attr );
        if ( $html != '' ) {
            return $html;
        }

        if ( isset( $attr['orderby'] ) ) {
            $attr['orderby'] = sanitize_sql_orderby( $attr['orderby'] );
            if ( !$attr['orderby'] ) {
                unset( $attr['orderby'] );
            }
        }

        extract( shortcode_atts( array(
            'order'          => 'ASC',
            'orderby'        => 'menu_order ID',
            'id'             => $post->ID,
            'include'        => '',
            'exclude'        => '',
            'type'           => 'thumbs',
            'columns'        => '3',
            'width'          => 'null',
            'lightbox'       => 'false',
            'grid'           => 'false'
        ), $attr ) );

        $id = intval( $id );
        if ( 'RAND' == $order ) {
            $orderby = 'none';
        }

        if ( ! empty( $include ) ) {

            $_attachments = get_posts( array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );

            $attachments = array();

            foreach ( $_attachments as $key => $val ) {
                $attachments[$val->ID] = $_attachments[$key];
            }

        } else if ( ! empty( $exclude ) ) {
            $attachments = get_children( array('post_parent' => $id, 'exclude' => $exclude, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
        } else {
            $attachments = get_children( array('post_parent' => $id, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
        }

        if ( empty( $attachments ) ) {
            return '';
        }

        if ( is_feed() ) {
            $html = "\n";
            foreach ( $attachments as $att_id => $attachment ) {
                $html .= wp_get_attachment_link($att_id, $size, true) . "\n";
            }
            return $html;
        }

        $slides = '';

        $thumbs_col = 100 / $columns;
        $thumbs_width = floor(1000 / $columns);

        $i = 0;

        foreach ( $attachments as $id => $attachment ) {

            $link = isset( $attr['link'] ) && 'file' == $attr['link'] ? wp_get_attachment_image_src( $id, 'full', false, false ) : wp_get_attachment_image_src( $id, 'full', true, false );

            $caption = get_post( $id )->post_excerpt;
            $title = get_post( $id )->post_title;

            $extra_class = '';
            if ( $i % $columns == 0 ) {
                $extra_class = ' first';
            }
            if ( ++$i % $columns == 0 ) {
                $extra_class = ' last';
            } 

            if ( $type == 'slider' ) {

                $slides .= '<li>';

                if ( $lightbox == 'true') {
                    $slides .= '<a href="' . $link[0] . '" class="fancybox fancybox-thumb">';
                }

                if ( $grid == 'true' ) {
                    $link[0] = aq_resize( $link[0], '680', null );
                }

                $slides .= '<img src="' . $link[0] . '" alt="' . $caption .'" />';


                if ( $lightbox == 'true') {
                    $slides .= '</a>';
                }

                $slides .= '</li>';


            } else {

                $slides .= '<a class="fancybox fancybox-thumb' . $extra_class . '" data-fancybox-group="gallery-' . $instance . '" href="' . $link[0] . '" style="width:' . $thumbs_col . '%"><img src="' . aq_resize( $link[0], $thumbs_width, $thumbs_width, true ) . '" /></a>';

            }

        }

        if ( $type == 'slider' ) {

            $html = '<div class="flexslider mini"><ul class="slides">' . $slides . '</ul></div>';

        } else {

            $html = '<div class="krown-thumbnail-gallery clearfix">' . $slides . '</div>';

        }

        return $html;

    }

    remove_shortcode( 'gallery', 'gallery_shortcode' );
    add_shortcode( 'gallery', 'krown_gallery_function' );

}

/* ------------------------
-----   Twitter    -----
------------------------------*/


if ( ! function_exists( 'krown_twitter_function' ) ) {

    function krown_twitter_function( $atts ) {

        extract( shortcode_atts( array(
            'el_class'       => '',
            'user'           => 'rubenbristian',
            'no'             => '1',
            'title'          => 'Latest Tweets:',
            'rotate'         => 'enabled'
        ), $atts ) );

        $html = '';

        if ( function_exists( 'getTweets' ) ) {

            $tweets = getTweets( $user, $no );

            if ( ! empty ( $tweets['error'] ) ) {

                $html .= '<p>Error (go to Settings > Twitter Feed Auth to resolve this): <span style="color:red; ">' . $tweets['error'] . '</span></p>';

            } else {

                $html = '<div class="krown-twitter clearfix rot' . $rotate . ( $el_class != '' ? ' ' . $el_class : '' ) . '"><a class="title" href="https://twitter.com/' . $user . '">' . $title . '</a><ul>';

                foreach ( $tweets as $tweet ) {

                    $html .= '<li>' . krown_parse_tweet( $tweet['text'] ) . '</li>';

                }

            }

        } else {

            $html = '<p style="font-weight:bold;">Please install the <a href="http://wordpress.org/plugins/oauth-twitter-feed-for-developers/">oAuth Twitter Feed Plugin</a> and configure it properly for the twitter widget to run. Read more about this in the manual.</p>';

        }

        $html .= '</ul></div>';

        return $html;

    }

    add_shortcode( 'krown_twitter', 'krown_twitter_function' );

}

?>