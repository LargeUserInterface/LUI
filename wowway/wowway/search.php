<?php
/**
 * The template for displaying search results.
 */
get_header(); 
global $i; $i = 0;
?>

	<section id="page">

		<header id="pageHeader">
			<h1><?php _e( 'Search Results', 'wowway' ); ?></h1>
			<a href="#" class="actionButton minimize" data-content=".contentHolder" data-speed="600">minimize</a>
		</header>

		<div class="contentHolder blog-archive clearfix">

			<?php 

			$allsearch = new WP_Query("s=$s&showposts=-1"); 
			$key = esc_html($s, 1); 
			$count = $allsearch->post_count;
			wp_reset_query(); 

			?>

			<?php if ( have_posts() ) : ?>

				<h4 class="searchResults">
					<?php echo __( 'Your search for ', 'wowway' ) . '<strong>' . get_search_query(). '</strong>' . __( ' returned ', 'wowway' ) . $count . __( ' results', 'wowway' ); ?>
				</h4>
				
				<?php while ( have_posts() ) : the_post();
					get_template_part( 'content' );
				endwhile; ?>

				<?php krown_pagination(); ?>

			<?php else : ?>

				<div class="full_width">
					<h4><?php _e( 'Nothing Found', 'wowway' ); ?></h4>
					<p><?php _e( 'Sorry, but nothing matched your search criteria. Please try again with some different keywords.', 'wowway' ); ?></p>
				</div>

			<?php endif; ?>

		</div>

	</section>
	
<?php get_footer(); ?>