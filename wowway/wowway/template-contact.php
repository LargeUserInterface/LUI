<?php
/**
 * Template Name: Contact
 */
get_header(); ?>

	<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

		<article id="contactDetails" class="clearfix" data-map="<?php echo get_post_meta( $post->ID, 'krown_show_map', true ) ; ?>" data-map-lat="<?php echo get_post_meta( $post->ID, 'krown_map_lat', true ); ?>" data-map-long="<?php echo get_post_meta( $post->ID, 'krown_map_long', true ); ?>" data-marker-img="<?php echo get_post_meta( $post->ID, 'krown_map_img', true ); ?>" data-zoom="<?php echo get_post_meta( $post->ID, 'krown_map_zoom', true ); ?>" data-greyscale="d-<?php echo get_post_meta( $post->ID, 'krown_map_style', true ); ?>" data-marker="d-<?php echo get_post_meta( $post->ID, 'krown_map_marker', true ); ?>">

			<h4><?php echo get_post_meta( $post->ID, 'krown_c_title_1', true ); ?></h4>

			<div class="minimize-this">

				<hr />

				<ul class="contactIcons">
				<?php

					krown_contact_lines( $post->ID, 'krown_c_phone', 'phone' );
					krown_contact_lines( $post->ID, 'krown_c_email', 'email' );
					krown_contact_lines( $post->ID, 'krown_c_address', 'address' );

				?>
				</ul>

				<h4><?php echo get_post_meta( $post->ID, 'krown_c_title_2', true ); ?></h4>
				<hr />

				<form class="contactForm" id="contact" action="<?php echo get_template_directory_uri(); ?>/includes/contact-form.php" method="post">
					<input id="name" type="text" name="name" class="name" value="<?php echo get_post_meta( $post->ID, 'krown_f_name', true ); ?>" />
					<input id="email" type="text" name="email" class="email" novalidate="" value="<?php echo get_post_meta( $post->ID, 'krown_f_email', true ); ?>" />
					<textarea id="message" type="text" name="message" class="message"><?php echo get_post_meta( $post->ID, 'krown_f_message', true ); ?></textarea>
		    		<input type="text" name="fred" class="fred hidden" value="" />
		        	<input type="submit" class="submit" value="<?php echo get_post_meta( $post->ID, 'krown_f_submit', true ); ?>" />
		    		<input type="hidden" name="dlo128" class="hidden dlo128" value="<?php echo get_post_meta( $post->ID, 'krown_f_sendto', true ); ?>" />
				</form>

				<p class="hidden error-message"><?php echo preg_replace( '"\\n"', '<br />', get_post_meta( $post->ID, 'krown_f_error', true ) ); ?></p>
				<p class="hidden success-message"><?php echo preg_replace( '"\\n"', '<br />', get_post_meta( $post->ID, 'krown_f_success', true ) ); ?></p>

			</div>

			<a href="#" class="actionButton minimize" data-content=".minimize-this" data-speed="300">minimize</a>

		</article>

	<?php endwhile; ?>

<?php get_footer(); ?>