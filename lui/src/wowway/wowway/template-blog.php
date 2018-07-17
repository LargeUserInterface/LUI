<?php
/**
 * Template Name: Blog
 */
get_header(); ?>

	<?php while ( have_posts() ) : the_post();

		$paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : ( get_query_var( 'page' ) ? get_query_var( 'page' ) : 1 );

		$args = array(
			'paged' => $paged, 
			'post_type' => 'post'
		);
		$all_posts = new WP_Query( $args );

		global $i; $i = 0;

	?>

	<section id="page">

		<header id="pageHeader">
			<h1><?php the_title(); ?></h1>
			<a href="#" class="actionButton minimize" data-content=".contentHolder" data-speed="600">minimize</a>
		</header>

		<div class="contentHolder blog-archive clearfix">

			<?php while( $all_posts->have_posts() ) : $all_posts->the_post();

				get_template_part( 'content' );

			endwhile;

			krown_pagination( $all_posts ); ?>

		</div>

	</section>

<?php endwhile; ?>
	
<?php get_footer(); ?>