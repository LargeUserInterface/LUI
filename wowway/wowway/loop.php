<?php
/*---------------------------------
	The loop that displays all posts
------------------------------------*/

$k = 0;

?>

<?php //If there are no posts to display, such as an empty archive page ?>
<?php if ( ! have_posts() ) : ?>
		<h1><?php _e( 'Not Found', 'wowway' ); ?></h1>
		<p><?php _e( 'Apologies, but no results were found for the requested archive. Perhaps searching will help find a related post.', 'wowway' ); ?></p>
		<?php get_search_form(); ?>

<?php endif; ?>

<?php while ( have_posts() ) : the_post(); ?>

	<?php //Display All Posts ?>

		<article id="post-<?php the_ID(); ?>" <?php post_class('one_half clearfix'); ?>>

			<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>

			<?php if($post->post_type != 'page') : ?>

				<ul class="postLinks">
					<li class="category"><strong><?php the_category(','); ?></strong></li>
					<li class="date"><?php the_time('M j, Y'); ?></li>
					<li class="comments"><?php comments_number('0 Comments'); ?></li>
				</ul>

			<?php endif; ?>

			<p><?php rb_excerpt('rb_excerptlength_post', 'rb_excerptmore'); ?></p>

			<a class="read" href="<?php the_permalink(); ?>"><strong><?php _e('Keep Reading <span>&rarr;</span>', 'wowway'); ?></strong></a>

		</article>

		<?php
			if(++$k%2==0) 
				echo '<div class="clearfix xtram"></div>';
		?>

	<?php if ( is_archive() || is_search() ) : ?>
		<!-- Search & Archive Results -->
	<?php else : ?>

	<?php endif; ?>

<?php endwhile;
	wp_reset_query();
 ?>