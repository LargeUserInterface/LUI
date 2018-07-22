<?php
/**
 * The Template for displaying all portfolio projects.
 */
get_header(); ?>

	<?php if ( have_posts() ) while ( have_posts() ) : the_post(); 

		$project_m_width = get_post_meta( $post->ID, 'krown_project_m_width', true ) != '' ? get_post_meta( $post->ID, 'krown_project_m_width', true ) : '910';
		$project_m_height = get_post_meta( $post->ID, 'krown_project_m_height', true ) != '' ? get_post_meta( $post->ID, 'krown_project_m_height', true ) : '480';
		$project_m_slider_width = get_post_meta( $post->ID, 'krown_project_m_slider_width', true ) != '' ? get_post_meta( $post->ID, 'krown_project_m_slider_width', true ) : '600';

	?>

	<div id="modal-holder">

		<article id="post-<?php echo the_ID(); ?>" <?php post_class('project clearfix'); ?> style="width:<?php echo $project_m_width; ?>px;height:<?php echo $project_m_height; ?>px;margin-left:-<?php echo $project_m_width/2; ?>px;margin-top:-<?php echo $project_m_height/2; ?>px" data-project-width="<?php echo $project_m_width; ?>" data-project-height="<?php echo $project_m_height; ?>" data-slider-width="<?php echo $project_m_slider_width; ?>" data-parent="<?php echo get_permalink( get_option( 'krown_folio_page' ) ); ?>" data-gal="false">

			<section class="projectSlides" style="width:<?php echo $project_m_slider_width; ?>px">

				<?php krown_portfolio_slider( $post->ID, $project_m_slider_width, $project_m_height ); ?>

			</section>

			<section class="projectContent" style="width:<?php echo ( $project_m_width - $project_m_slider_width ); ?>px">

				<h1><?php the_title(); ?></h1>
				<hr />
				<span class="category"><?php krown_categories( $post->ID, 'portfolio_category' ); ?></span>
				<hr class="second" />
				<?php the_content(); ?>

				<?php if( get_option( 'krown_folio_share', 'show' ) == 'show' ) {
					krown_share_buttons( $post->ID );
				} ?>

			</section>

			<?php 

			$next_post = krown_get_adjacent_post( false, '', false, 'portfolio_category' );
			$prev_post = krown_get_adjacent_post( false, '', true, 'portfolio_category' );

			?>

			<div id="nextProject" class="hidden">
				<?php if ( ! empty ( $next_post ) ) : ?>
					<a href="<?php echo get_permalink( $next_post->ID ); ?>"><?php echo $next_post->post_name; ?></a>
				<?php else: ?>
					<a href="#"></a>
				<?php endif; ?>
			</div>

			<div id="previousProject" class="hidden">
				<?php if ( ! empty ( $prev_post ) ) : ?>
					<a href="<?php echo get_permalink( $prev_post->ID ); ?>"><?php echo $prev_post->post_name; ?></a>
				<?php else: ?>
					<a href="#"></a>
				<?php endif; ?>
			</div>

			<a class="actionButton close" href="#">Close</a>
		
		</article>

	</div>

	<p id="pwd" class="hidden"><?php echo get_post_meta( $post->ID, 'rb_post_pass', true ); ?></p>

	<?php endwhile; ?>

<?php get_footer(); ?>