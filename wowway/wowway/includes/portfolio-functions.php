<?php

/*---------------------------------
	Portfolio Slider
------------------------------------*/

if ( ! function_exists( 'krown_portfolio_slider' ) ) {

	function krown_portfolio_slider( $post_id = 0, $width = 600, $height = 480, $portfolio = true ) {

		// Retina ready

		$retina = krown_retina();
		if ( $retina === 'true' ) {
			$width *= 2;
			$height *= 2;
		}

		$output = '';

		// New method

		$slides = explode( ',', get_post_meta( $post_id, 'pp_gallery_slider', true ) );

		if ( ! empty( $slides ) && ! empty( $slides[0] ) ) {

			if ( sizeof( $slides ) == 1 ) {

				$output .= '<div id="postSlider" class="modal-single">' . krown_slide_content( $slides[0], $width, $height ) . '</div>';

			} else {

				$output .= '<div id="postSlider" class="swiper-container' . ( $portfolio == false ? ' krown-slider" style="height:' . $height . 'px"' : '"' ) . '><div class="swiper-wrapper">';

				foreach ( $slides as $slide_id ) {

					$output .= krown_slide_content( $slide_id, $width, $height, '<div class="swiper-slide">', '</div>' );

				}

				$output .= '</div></div>';

			}
			
		} else if ( ! get_post_meta( $post_id, 'krown_fixed_fgal', true ) == 'fixed' ) {

			// Old method (2.0 prior fail safe) - before 2.0 a different method than meta keys was used for the gallery, so we have to provide a fail safe for people who update

			$slider_images = get_post_meta( $post_id, 'rb_post_sliderc2', true );

			if ( isset( $slider_images ) && ! empty( $slider_images ) ) {

				foreach ( $slider_images as $key => $value ) {

					if ( strpos($value, '.jpg') > 0 
					  || strpos($value, '.jpeg') > 0 
					  || strpos($value, '.JPG') > 0 
					  || strpos($value, '.JPEG') > 0 
					  || strpos($value, '.png') > 0 
					  || strpos($value, '.PNG') > 0 
					  || strpos($value, '.bmp') > 0 
					  || strpos($value, '.BMP') > 0 
					  || strpos($value, '.gif') > 0 
					  || strpos($value, '.GIF') > 0 
					  || is_numeric($value)) {
							if ( is_numeric( $value ) ) {
		        				echo '<div class="swiper-slide">' . wp_get_attachment_image( $value, 'large', 0 ) . '</div>';
		        			} else {
		        				echo '<div class="swiper-slide"><img src="' . $value . '" /></div>';
		        			}
		        	} else {

		        		if ( strpos( $value, 'iframe' ) > 0) {
			        		echo '<div class="swiper-slide">' . $value . '</div>';
			        	} else {
			        		echo '<div class="swiper-slide"><video id="projectVideo" width="100%" height="100%" controls preload="none" poster="' . $value . '.jpg"><source src="' . $value . '.webm" type="video/webm" /><source src="' . $value . '.mp4" type="video/mp4" /><source src="' . $value . '.ogv" type="video/ogg" /></video></div>';
			        	}

		        	}

				}

			}

		}

		echo $output;

	}

}

// This function is only for the modal (portfolio)

if ( ! function_exists( 'krown_slide_content' ) ) {

	function krown_slide_content( $slide_id, $width, $height, $before = '', $after = '' ){

		// Get video code

		$video_code = get_post_meta( $slide_id, 'video_code', true);
		$video_file = get_post_meta( $slide_id, 'video_file', true);
		$video_file_2 = get_post_meta( $slide_id, 'video_file_2', true);

		// Get image, crop it, then return it back

		$img = wp_get_attachment_image_src( $slide_id, 'full' );
		$img_url = $img[0];
		$image = aq_resize( $img_url, $width, $height, true, false );

		// Create the slide based on the proper info from above

		if ( $video_code != '' ) {

			return $before . '<div class="video-embedded" data-id="' . rand(1, 9999) . '" data-href="' . $video_code . '"><img src="' . $image[0] . '" width="' . $image[1] . '" height="' . $image[2] . '" alt="" /></div>' . $after;

		} else if ( $video_file != '' ) {

			return $before . '<video class="video-hosted" width="' . $image[1] . '" height="' . $image[2] . '" style="width:100%;height:100%" poster="' . $image[0] . '"><source type="video/mp4" src="' . $video_file . '" />' . ( $video_file_2 != '' ? '<source type="video/ogv" src="' . $video_file2 . '" />' : '' ) . '</video>' . $after;

		} else {

			return $before . '<img src="' . $image[0] . '" width="' . $image[1] . '" height="' . $image[2] . '" alt="" />' . $after;

		}

	}

}

/*---------------------------------
	Gallery Slider
------------------------------------*/

if ( ! function_exists( 'krown_gallery_slider' ) ) {

	function krown_gallery_slider( $post_id = 0 ) {

		echo '<div id="projectSlides" class="swiper-container gallery"><div class="swiper-wrapper">';

		// New method

		$slides = explode( ',', get_post_meta( $post_id, 'pp_gallery_slider', true ) );

		if ( ! empty( $slides ) && ! empty( $slides[0] ) ) {

			foreach ( $slides as $slide_id ) {

				$img = wp_get_attachment_image_src( $slide_id, 'full' );

	 			// Simply send the large image
				echo '<div class="swiper-slide"><img src="' . $img[0] . '" width="' . $img[1] . '" height="' . $img[2] . '" alt="' . get_post_meta( $slide_id, '_wp_attachment_image_alt', true ) . '" /></div>';

			}

		} else if ( ! get_post_meta( $post_id, 'krown_fixed_fgal', true ) == 'fixed' ) {

			// Old method (2.0 prior fail safe) - before 2.0 a different method than meta keys was used for the gallery, so we have to provide a fail safe for people who update

			$slider_images = get_post_meta( $post_id, 'rb_post_sliderc2', true );

			if ( isset( $slider_images ) && ! empty( $slider_images ) ) {

				foreach ( $slider_images as $key => $value ) {

					if ( is_numeric( $value ) ) {
				        echo '<div class="swiper-slide"> ' . wp_get_attachment_image( $value, 'full', 0 ) . '</div>';
				    } else {
				    	echo '<div class="swiper-slide"> ' . '<img src="' . $value . '" />' . '</div>';
				    }

				}

			}

		}

		echo '</div><ul class="swiper-pagination"></ul></div>';

	}

}

/*---------------------------------
	Share Buttons
------------------------------------*/

if ( ! function_exists( 'krown_share_buttons' ) ) {

	function krown_share_buttons( $post_id, $style = 'dark' ){

		$html = '<aside class="share-buttons ' . $style . ' clearfix">';

		$url = urlencode( get_permalink( $post_id ) );
		$title = urlencode( get_the_title( $post_id ) );
		$media = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), 'large' );

		$html .= '<a target="_blank" class="btn-twitter" href="https://twitter.com/home?status=' . $title . '+' . $url . '"></a>';

		$html .= '<a target="_blank" class="btn-facebook" href="https://www.facebook.com/share.php?u=' . $url . '&title=' . $title . '"></a>';

		$html .= '<a target="_blank" class="btn-pinterest" href="http://pinterest.com/pin/create/bookmarklet/?media=' . $media[0] . '&url=' . $url . '&is_video=false&description=' . $title . '"></a>';

		$html .= '<a target="_blank" class="btn-gplus" href="https://plus.google.com/share?url=' . $url . '"></a>';

		$html .= '</aside>';

		echo $html;

	}

}

/*---------------------------------
	Adjacent Posts
------------------------------------*/

function krown_get_adjacent_post( $in_same_term = false, $excluded_terms = '', $previous = true, $taxonomy = 'category' ) {

	global $post, $wpdb;

	if ( ( ! $post = get_post() ) || ! taxonomy_exists( $taxonomy ) ) 
		return null; 

	$current_post_date = $post->post_date;

	$join = '';
	$posts_in_ex_terms_sql = ''; 
	if ( $in_same_term || ! empty( $excluded_terms ) ) { 
		$join = " INNER JOIN $wpdb->term_relationships AS tr ON p.ID = tr.object_id INNER JOIN $wpdb->term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id"; 

		if ( $in_same_term ) {
			if ( ! is_object_in_taxonomy( $post->post_type, $taxonomy ) ) 
				return '';
			$term_array = wp_get_object_terms( $post->ID, $taxonomy, array( 'fields' => 'ids' ) ); 
			$join .= $wpdb->prepare( " AND tt.taxonomy = %s AND tt.term_id IN (" . implode( ',', array_map( 'intval', $term_array ) ) . ")", $taxonomy ); 
		}

		$posts_in_ex_terms_sql = $wpdb->prepare( "AND tt.taxonomy = %s", $taxonomy ); 
		if ( ! empty( $excluded_terms ) ) { 
			if ( ! is_array( $excluded_terms ) ) { 
				if ( false !== strpos( $excluded_terms, ' and ' ) ) { 
					_deprecated_argument( __FUNCTION__, '3.3', sprintf( __( 'Use commas instead of %s to separate excluded terms.' ), "'and'" ), 'wowway' ); 
					$excluded_terms = explode( ' and ', $excluded_terms ); 
				} else {
					$excluded_terms = explode( ',', $excluded_terms );
				}
			}

			$excluded_terms = array_map( 'intval', $excluded_terms ); 
				
			if ( ! empty( $term_array ) ) { 
				$excluded_terms = array_diff( $excluded_terms, $term_array );
				$posts_in_ex_terms_sql = ''; 
			}

			if ( ! empty( $excluded_terms ) ) { 
				$posts_in_ex_terms_sql = $wpdb->prepare( " AND tt.taxonomy = %s AND tt.term_id NOT IN (" . implode( $excluded_terms, ',' ) . ')', $taxonomy ); 
			}
		}
	}

	$adjacent = $previous ? 'previous' : 'next';
	$op = $previous ? '<' : '>';
	$order = $previous ? 'DESC' : 'ASC';

	$join  = apply_filters( "get_{$adjacent}_post_join", $join, $in_same_term, $excluded_terms ); 
	$where = apply_filters( "get_{$adjacent}_post_where", $wpdb->prepare( "WHERE p.post_date $op %s AND p.post_type = %s AND p.post_excerpt NOT like 'link' AND p.post_status = 'publish' $posts_in_ex_terms_sql", $current_post_date, $post->post_type), $in_same_term, $excluded_terms ); 
	$sort  = apply_filters( "get_{$adjacent}_post_sort", "ORDER BY p.post_date $order LIMIT 1" );

	$query = "SELECT p.ID FROM $wpdb->posts AS p $join $where $sort"; 
	
	$query_key = 'adjacent_post_' . md5( $query ); 
	$result = wp_cache_get( $query_key, 'counts' ); 
	if ( false !== $result ) {
		if( $result )
			$result = get_post( $result );
		return $result;
	}

	$result = $wpdb->get_var( $query );
	if (null === $result )
		$result = '';

	wp_cache_set( $query_key, $result, 'counts');

	if ( $result ) 
		$result = get_post( $result );

	return $result;

}

?>