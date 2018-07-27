<?php
/**
 * The default template for displaying content. Used for both single and index/archive/search.
 */
?>

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

		<ul class="post-meta">
			<li class="category"><strong><?php the_category(','); ?></strong></li>
			<li class="date"><a href="<?php the_permalink(); ?>"><time datetime="<?php the_time( 'c' ); ?>" pubdate><?php the_time( __( 'M j, Y', 'wowway' ) ); ?></time></a></li>
			<li class="comments"><a href="<?php the_permalink(); ?>#comments-title"><?php comments_number(__( '0 Comments', 'wowway' ), __( '1 Comment', 'wowway' ),  __( '% Comments', 'wowway' ) ); ?></a></li>
		</ul>

		<h3 class="post-title">
			<a href="<?php the_permalink(); ?>">
				<?php the_title(); ?>
			</a>
		</h3>

		<?php if ( get_option( 'krown_blog_style', 'Default' ) == 'Default' ) {
			krown_post_thumbnail( $post->ID, 120, 80, true );
		} else {
			krown_post_thumbnail( $post->ID, 900 ); 
		} ?>

		<p class="post-excerpt"><?php krown_excerpt( 'krown_excerptlength_large' ); ?></p>

		<a class="post-more" href="<?php the_permalink(); ?>">
			<strong><?php _e( 'Keep Reading', 'wowway' ); ?></strong>
		</a>

	</article>

	<?php global $i;
	if ( ++ $i % 2 == 0 && get_option( 'krown_blog_style', 'Default' ) == 'Default' ) : ?>
	<hr class="clear-post" />
	<?php endif; ?>

