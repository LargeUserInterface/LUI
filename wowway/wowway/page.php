<?php
/**
 * The Template for displaying all pages.
 */
get_header(); ?>

	<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

		<section id="page">

			<header id="pageHeader">
				<h1><?php the_title(); ?></h1>
				<a href="#" class="actionButton minimize" data-content=".contentHolder" data-speed="600">minimize</a>
			</header>

			<article id="page-<?php the_ID(); ?>" class="contentHolder clearfix">

				<?php 

					krown_post_header( $post->ID );

					the_content(); 
					wp_link_pages();

					if( ot_get_option( 'allow_page_comments', 'disable' ) == 'enable' && comments_open() ) {
						comments_template( '', true );
					} 

				?>

			</article>

		</section>
		
	<?php endwhile; ?>

<?php get_footer(); ?>