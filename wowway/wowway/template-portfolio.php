<?php
/**
 * Template Name: Portfolio
 */
get_header();

	while (have_posts()) : the_post();

		/* Get Portfolio Variables */

		$thumbs_ratio = get_option( 'krown_thumbs_ratio', 'ratio_4-3' );
		$thumbs_width = get_option( 'krown_thumbs_width', '340' );
		$thumbs_style = get_option( 'krown_hover_style', 'style-1' );

		$portfolio_filter = isset( $_GET['filter'] ) ? $_GET['filter'] : '';

		// Retina ready

		$retina = krown_retina();
		if ( $retina === 'true' ) {
			$thumbs_width *= 2;
		}

	?>

	<section id="portfolio" class="folioGrid <?php echo $thumbs_ratio; ?> get-ratio disable-resize-parent clearfix" data-url="<?php echo substr( get_permalink(), strpos( get_permalink(), '/', 9) ); ?>" data-gal="no" data-hover="<?php echo $thumbs_style; ?>">

		<?php 
		
			/* Query */

			$paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : ( get_query_var( 'page' ) ? get_query_var( 'page' ) : 1 );

			$args = array( 
				'posts_per_page' => ( get_option( 'krown_folio_pagination', 'folio-pagination-off' ) == 'folio-pagination-on' ? get_option( 'krown_folio_items', '24' ) : -1 ), 
				'portfolio_category' => $portfolio_filter,
				'post_type' => 'portfolio',
				'paged' => $paged 
			);

			$all_posts = new WP_Query($args);

			while( $all_posts->have_posts() ) : $all_posts->the_post();

			$thumb = get_post_thumbnail_id();
			$img_url = wp_get_attachment_url( $thumb, 'full' );
			switch ( $thumbs_ratio ) {
				case 'ratio_1-1':
					$image = aq_resize( $img_url, $thumbs_width, $thumbs_width, true, false );
					break;
				case 'ratio_16-9':
					$image = aq_resize( $img_url, $thumbs_width, floor($thumbs_width / 1.77777 ), true, false );
					break;
				case 'ratio_16-10':
					$image = aq_resize( $img_url, $thumbs_width, floor($thumbs_width / 1.6 ), true, false );
					break;
				default:
					$image = aq_resize( $img_url, $thumbs_width, floor($thumbs_width / 1.33333 ), true, false );
			}

			$item_href = 'href="' . get_permalink() . '" data-external="no"';
			if ( get_post_meta( $post->ID, 'rb_post_url_d', true ) != '' ) {
				$item_href = 'href="' . get_post_meta( $post->ID, 'rb_post_url_d', true ) . '" data-external="yes" target="' . get_post_meta( $post->ID, 'krown_project_custom_target', true ) . '"';
			}

		?>

		<a id="post-<?php the_ID(); ?>" class="folioItem <?php krown_categories( $post->ID, 'portfolio_category', ' ', 'slug' ); ?> <?php echo $thumbs_style; ?> isotope-hidden" data-custom-filter="0" data-slug="<?php echo $post->post_name; ?>" data-title="<?php echo get_the_title() . ' | ' . get_bloginfo( 'name') ; ?>" <?php echo $item_href; ?>>

			<img src="<?php echo $image[0]; ?>" width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" alt="<?php the_title(); ?>" />

			<div class="folioTextHolder">
				<div class="folioText">
					<h3><?php the_title(); ?></h3>
					<p><?php krown_categories( $post->ID, 'portfolio_category', ', ', 'name' ); ?></p>
				</div>
			</div>
			
		</a>

		<?php endwhile; ?>

	</section>

	<?php krown_pagination( $all_posts, true );

	endwhile; ?>

	<div id="projectHover" class="hidden "></div>

	<div class="projectNav hasButtons">
		<a href="#" class="btnNext hoverBack">Next</a>
		<a href="#" class="btnClose hoverBack">Close</a>
		<a href="#" class="btnPrev hoverBack">Prev</a>
	</div>

	<div id="modal-holder"></div>

<?php get_footer(); ?>