<?php
/**
 * The Template for displaying all gallery projects.
 */
get_header(); ?>

	<?php if ( have_posts() ) while ( have_posts() ) : the_post(); 

		$project_fit = get_post_meta( $post->ID, 'krown_project_fit', true ) != '' &&  get_post_meta( $post->ID, 'krown_project_fit', true ) != 'default' ? get_post_meta( $post->ID, 'krown_project_fit', true ) : get_option( 'krown_gallery_fit', 'fill' );

	?>

	<article id="post-<?php echo the_ID(); ?>" <?php post_class('project gallery-project clearfix'); ?> data-resize="<?php echo $project_fit; ?>" data-parent="<?php echo get_permalink( get_option( 'krown_gallery_page' ) ); ?>" data-gal="yes" data-autoplay="<?php echo get_option( 'krown_gallery_autoplay', 'true' ); ?>">

			<section class="galleryContent">

				<header class="clearfix">
					
					<h1><?php the_title(); ?></h1>
					<a class="actionButton close" href="#">Close</a>
					<a class="actionButton minimize<?php echo get_option( 'krown_gallery_minimized', 'false' ) == 'true' ? ' minimized' : ''; ?>" data-content=".shortContent" data-speed="300" href="#">Minimize</a>

				</header>

				<div class="shortContent clearfix">

					<?php the_content(); ?>

					<span class="category">
						<?php krown_categories( $post->ID, 'gallery_category' ); ?>
					</span>

					<?php if( get_option( 'krown_gallery_share', 'show' ) == 'show' ) {
						krown_share_buttons( $post->ID, 'light' );
					} ?>

				</div>

			</section>
			
			<div id="nextProject" class="hidden"><?php echo next_post_link( '%link', get_next_post()->post_name, false ); ?></div>
			<div id="previousProject" class="hidden"><?php echo previous_post_link( '%link', get_previous_post()->post_name, false ); ?></div>
		
		</article>

		<p id="pwd" class="hidden"><?php echo get_post_meta( $post->ID, 'rb_post_pass', true ); ?></p>

		<?php krown_gallery_slider( $post->ID ); ?>

	<?php endwhile; ?>

<?php get_footer(); ?>