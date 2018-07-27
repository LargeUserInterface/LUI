<?php
/**
 * Template Name: Fullscreen Video
 */
get_header(); ?>

    <video id="fullScreenVideo" poster="<?php echo get_post_meta($post->ID, 'rb_video_poster', true); ?>" preload="auto">

        <?php if ( get_post_meta( $post->ID, 'rb_video_1', true ) != '' ) :?>
        <source src="<?php echo get_post_meta($post->ID, 'rb_video_1', true); ?>" type="video/mp4" />
        <?php endif; ?>

        <?php if ( get_post_meta( $post->ID, 'rb_video_2', true ) != '' ) :?>
        <source src="<?php echo get_post_meta($post->ID, 'rb_video_2', true); ?>" type="video/ogv" />
        <?php endif; ?>

    </video>

<?php get_footer(); ?>