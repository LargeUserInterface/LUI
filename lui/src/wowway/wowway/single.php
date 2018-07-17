<?php
/**
 * The Template for displaying all posts.
 */
get_header(); ?>

	<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

		<section id="page" class="fullPost">

			<header id="pageHeader">
				<h1><?php _e( 'Our Blog', 'wowway' ); ?></h1>
				<a href="#" class="actionButton minimize" data-content=".contentHolder" data-speed="600">minimize</a>

				<nav class="hasButtonsPost">
					<div class="btnNext2 hoverBack"><?php echo previous_post_link( '%link' ); ?></div>
					<div class="btnClose2 hoverBack"><a href="<?php echo get_page_link( get_option( 'krown_blog_page' ) ); ?>"></a></div>
					<div href="#" class="btnPrev2 hoverBack"><?php echo next_post_link( '%link' ); ?></div>
				</nav>

			</header>

			<article id="post-<?php the_ID(); ?>" <?php post_class( 'contentHolder clearfix' ); ?>>

				<ul class="post-meta">
					<li class="category"><strong><?php the_category(','); ?></strong></li>
					<li class="date"><time datetime="<?php the_time( 'c' ); ?>" pubdate><?php the_time( __( 'M j, Y', 'wowway' ) ); ?></time></li>
					<li class="comments"><?php comments_number(__( '0 Comments', 'wowway' ), __( '1 Comment', 'wowway' ),  __( '% Comments', 'wowway' ) ); ?></li>
				</ul>

				<h2 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

				<?php 

					krown_post_header( $post->ID );

					the_content(); 
					krown_share_buttons( $post->ID, 'light' );
					wp_link_pages();
					the_tags( __( 'Tagged with: ', 'wowway' ) );

					if( comments_open() ) {
						comments_template( '', true );
					} 

				?>

			</article>

		</section>

	<?php endwhile; ?>

<?php get_footer(); ?>