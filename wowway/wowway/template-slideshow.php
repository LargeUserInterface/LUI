<?php
/**
 * Template Name: Fullscreen Slideshow
 */
get_header(); ?>

	<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

		<?php if ( get_post_meta( $post->ID, 'krown_slider_text', true) != 'disabled' ) : ?>

			<section class="gallery-project">

				<div class="galleryContent">

					<header class="clearfix">

						<h1><?php the_title(); ?></h1>
						<a class="actionButton close" href="#">Close</a>
						<a class="actionButton minimize<?php echo get_post_meta( $post->ID, 'krown_slider_text', true ) == 'enabled-min' ? ' minimized' : ''; ?>" data-content=".shortContent" data-speed="300" href="#">Minimize</a>

					</header>

					<div class="shortContent clearfix">

						<?php the_content(); 

						if( get_post_meta( $post->ID, 'krown_slider_share', true) == 'show' ) {
							krown_share_buttons( $post->ID, 'light' );
						} ?>

					</div>

				</div>

			</section>

		<?php endif; ?>

		<?php krown_gallery_slider( $post->ID ); ?>

		<div id="gallery-data" data-resize="<?php echo get_post_meta( $post->ID, 'krown_slider_resize', true ); ?>" data-autoplay="<?php echo get_post_meta( $post->ID, 'krown_slider_autoplay', true); ?>"></div>

	<?php endwhile; ?>
	
<?php get_footer(); ?>