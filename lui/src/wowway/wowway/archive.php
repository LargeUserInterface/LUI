<?php
/**
 * The template for displaying archives.
 */
get_header(); 
global $i; $i = 0;
?>


	<section id="page">

		<header id="pageHeader">
			<h1><?php echo get_the_title( get_option( 'krown_blog_page' ) ); ?></h1>
			<a href="#" class="actionButton minimize" data-content=".contentHolder" data-speed="600">minimize</a>
		</header>

		<div class="contentHolder blog-archive clearfix">

			<?php while( have_posts() ) : the_post();

				get_template_part( 'content' );

			endwhile;

			krown_pagination(); ?>

		</div>

	</section>

<?php get_footer(); ?>