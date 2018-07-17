<?php
/*---------------------------------
	Setup OptionTree
------------------------------------*/

add_filter( 'ot_show_pages', '__return_false' );
add_filter( 'ot_theme_mode', '__return_true' );
require_once( 'option-tree/ot-loader.php' );

function filter_ot_upload_text(){
	return __( 'Insert', 'wowway' );
}
function filter_ot_header_list(){
	echo '<li id="option-tree-version"><span>' . __( 'Wowway Options', 'wowway' ) . '</span></li>';
}
function filter_ot_header_version_text(){
	return '2.1.4';
}
function filter_ot_header_logo_link(){
	return '';
}

add_filter( 'ot_header_list', 'filter_ot_header_list' );
add_filter( 'ot_upload_text', 'filter_ot_upload_text' );
add_filter( 'ot_header_logo_link', 'filter_ot_header_logo_link' );
add_filter( 'ot_header_version_text', 'filter_ot_header_version_text');

/*---------------------------------
	Include other functions and classes
------------------------------------*/

include( 'includes/extend-ot.php' );
include( 'includes/theme-options.php' );
include( 'includes/customizer-options.php' );
include( 'includes/custom-styles.php' );
include( 'includes/metaboxes.php' );
include( 'includes/widget.php' );
include( 'includes/plugins.php' );
include( 'includes/portfolio-functions.php' );
include( 'includes/krown-update.php' );

if ( ! function_exists( 'aq_resize' ) ) {
	include( 'includes/aq_resizer.php' );
}

/*---------------------------------
	Make some adjustments on theme setup
------------------------------------*/

if ( ! function_exists( 'krown_setup' ) ) {

	function krown_setup() {

		// Setup theme update with PIXELENTITY's class
			
		if( ot_get_option( 'krown_updates_user' ) != '' && ot_get_option( 'krown_updates_api' ) != '' ){

			require_once( 'pixelentity-theme-update/class-pixelentity-theme-update.php' );
			PixelentityThemeUpdate::init( ot_get_option( 'krown_updates_user' ), ot_get_option( 'krown_updates_api' ), 'KrownThemes' );

		}
	
		// Make theme available for translation

		load_theme_textdomain( 'wowway', get_template_directory() . '/lang' );

		$locale = get_locale();
		$locale_file = get_template_directory() . "/lang/$locale.php";

		if ( is_readable( $locale_file ) ) {
			require_once( $locale_file );
		}
	
		// Define content width (stupid feature, this theme has no width)

		if( ! isset( $content_width ) ) {
			$content_width = 940;
		}

		// Enable excerpts for pages
		add_post_type_support( 'page', 'excerpt' );
		
		// Add default posts and comments RSS feed links to head

		add_theme_support( 'automatic-feed-links' );

		// Enable shortcodes inside text widgets

		add_filter('widget_text', 'do_shortcode');
			
		// Add primary navigation 

		register_nav_menus( array(
			'primary' => __( 'Primary Navigation', 'wowway' ),
		) );

		// This theme uses post thumbnails

		add_theme_support( 'post-thumbnails' );

		// WP 4.1 title tag

		add_theme_support( 'title-tag' );
		
	}

}

add_action( 'after_setup_theme', 'krown_setup' );

/*---------------------------------
	Title tag up to WP 4.1
------------------------------------*/

add_action( 'after_setup_theme', 'krown_setup' );

if ( ! function_exists( '_wp_render_title_tag' ) ) {

	function theme_slug_render_title() {
	    echo '<title>' . wp_title( '|', false, 'right' ) . "</title>\n";
	}

	add_action( 'wp_head', 'theme_slug_render_title' );

	function krown_filter_wp_title( $title, $separator ) {

		if ( is_feed() ) return $title;

		global $paged, $page;

		if ( is_search() ) {

			$title = sprintf( __( 'Search results for %s', 'iwrite' ), '"' . get_search_query() . '"' );
			if ( $paged >= 2 )
				$title .= " $separator " . sprintf( __( 'Page %s', 'iwrite' ), $paged );
			$title .= " $separator " . get_bloginfo( 'name', 'display' );
			return $title;
		}

		$title .= get_bloginfo( 'name', 'display' );
		$site_description = get_bloginfo( 'description', 'display' );

		if ( $site_description && ( is_home() || is_front_page() ) )
			$title .= " $separator " . $site_description;

		if ( $paged >= 2 || $page >= 2 )
			$title .= " $separator " . sprintf( __( 'Page %s', 'iwrite' ), max( $paged, $page ) );

		return $title;

	}

	add_filter( 'wp_title', 'krown_filter_wp_title', 10, 2 );

}

/*---------------------------------
	Create a wp_nav_menu fallback, to show a home link
------------------------------------*/

function krown_page_menu_args( $args ) {
	$args['show_home'] = true;
	return $args;
}
add_filter( 'wp_page_menu_args', 'krown_page_menu_args' );

/*---------------------------------
	Comments template
------------------------------------*/

if ( ! function_exists( 'krown_comment' ) ) {

	function krown_comment( $comment, $args, $depth ) {

		$GLOBALS['comment'] = $comment;
		$retina = krown_retina();
		switch ( $comment->comment_type ) :
			case '' :
		?>

		<li id="li-comment-<?php comment_ID(); ?>" class="comment clearfix">
			
			<?php echo  get_avatar( $comment, ( isset( $retina ) && $retina === 'true' ? 100 : 50 ), $default='' ); ?>

			<div>

				<span class="comment-author">
					<?php 
						if ( get_comment_author_url() != 'Website' ) {
							echo comment_author_link();
						} else {
							comment_author();
						}
					?>
				</span>

				<span class="comment-time"><?php echo comment_date( __( 'F j, Y', 'wowway' ) ); ?></span>

				<?php comment_text(); ?>
				
				<?php if ( $comment->comment_approved == '0' ) : ?>
					<em class="await"><?php _e( 'Your comment is awaiting moderation.', 'wowway' ); ?></em>
				<?php endif; ?>

			</div>

		</li>

		<?php
			break;
			case 'pingback'  :
			case 'trackback' :
		?>
		
		<li class="post pingback">
			<p><?php _e( 'Pingback:', 'wowway' ); ?> <?php comment_author_link(); ?><?php edit_comment_link( __('(Edit)', 'wowway'), ' ' ); ?></p></li>
		<?php
				break;
		endswitch;
	}

}
	
/*---------------------------------
	Remove "Recent Comments Widget" Styling
------------------------------------*/

function krown_remove_recent_comments_style() {
	global $wp_widget_factory;
	remove_action( 'wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style' ) );
}
add_action( 'widgets_init', 'krown_remove_recent_comments_style' );

/*---------------------------------
	Register widget areas
------------------------------------*/

function krown_widgets_init() {

	register_sidebar( array(
		'name' => __('Top footer left side', 'wowway'),
		'id' => 'rb_top_footer_widget_left',
		'description' => __('The top footer\'s left side widget area', 'wowway'),
		'before_widget' => '<div id="%1$s" class="widget clearfix %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<span class="hidden">',
		'after_title' => '</span>',
	) );

	register_sidebar( array(
		'name' => __('Top footer right side', 'wowway'),
		'id' => 'rb_top_footer_widget_right',
		'description' => __('The top footer\'s right side widget area', 'wowway'),
		'before_widget' => '<div id="%1$s" class="widget clearfix %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<span class="hidden">',
		'after_title' => '</span>',
	) );

	register_sidebar( array(
		'name' => __('Bottom footer left side', 'wowway'),
		'id' => 'rb_bottom_footer_widget_left',
		'description' => __('The bottom footer\'s left side widget area', 'wowway'),
		'before_widget' => '<div id="%1$s" class="widget clearfix %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<span class="hidden">',
		'after_title' => '</span>',
	) );

	register_sidebar( array(
		'name' => __('Sidebar bottom', 'wowway'),
		'id' => 'rb_side_footer_widget',
		'description' => __('The sidebar\'s bottom widget area', 'wowway'),
		'before_widget' => '<div id="%1$s" class="widget clearfix %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<span>',
		'after_title' => '</span>',
	) );
	
}  
add_action( 'widgets_init', 'krown_widgets_init' );

/*---------------------------------
	Function that replaces the default the_excerpt() function
------------------------------------*/

if ( ! function_exists( 'krown_excerptlength_small' ) ) {

	// Length (words no)
	 
	function krown_excerptlength_small() {
	    return 20;
	}

}

if ( ! function_exists( 'krown_excerptlength_large' ) ) {

	// Length (words no)
	 
	function krown_excerptlength_large() {
	    return 50;
	}

}

if ( ! function_exists( 'krown_excerptmore' ) ) {

	// More text

	function krown_excerptmore() {
	    return ' ...';
	}

}

if ( ! function_exists( 'krown_excerpt' ) ) {

	// The actual function
	
	function krown_excerpt( $length_callback = '', $more_callback = 'krown_excerptmore' ) {

	    global $post;
		
	    if ( function_exists( $length_callback ) ) {
			add_filter( 'excerpt_length', $length_callback );
	    }
		
	    if ( function_exists( $more_callback ) ){
			add_filter( 'excerpt_more', $more_callback );
	    }
		
	    $output = get_the_excerpt();

	    if ( empty( $output ) ) {

	    	// If the excerpt is empty (on pages created 100% with shortcodes), we should take the content, strip shortcodes, remove all HTML tags, then return the correct number of words

	    	$output = strip_tags( preg_replace( "~(?:\[/?)[^\]]+/?\]~s", '', $post->post_content ) );
	    	$output = explode( ' ', $output, $length_callback() );
	    	array_pop( $output );
	    	$output = implode( ' ', $output ) . $more_callback();

	    } else {

	    	// Continue with the regular excerpt method

		    $output = apply_filters( 'wptexturize', $output );
		    $output = apply_filters( 'convert_chars', $output );

	    }
		
	    echo $output;
		
	}   

}

/*---------------------------------
	Add a custom class to the user's gravatar
------------------------------------*/

function krown_avatar_cass( $class ) {
	$class = str_replace( "class='avatar", "class='commentAvatar", $class) ;
	return $class;
}
add_filter( 'get_avatar','krown_avatar_cass' );

/*---------------------------------
	Redefine the search form structure
------------------------------------*/

if ( ! function_exists( 'krown_search_form' ) ) {

	function krown_search_form( $form ) {

		$label = __( 'Type and hit Enter', 'wowway' );

	    $form = '
		<form role="search" method="get" id="searchform" class="searchBox" action="' . home_url( '/' ) . '" >
			<label class="screen-reader-text hidden" for="s">' . __( 'Search for:', 'wowway' ) . '</label>
			<input type="text" data-value="' . $label . '" value="' . $label . '" name="s" id="s" />
	    </form>';
	    return $form;
		
	}

}

add_filter( 'get_search_form', 'krown_search_form' );

/*---------------------------------
	A custom pagination function
------------------------------------*/

if ( ! function_exists( 'krown_pagination' ) ) {

	function krown_pagination( $query = null, $range = 2 ) {  

		if ( $query == null ) {
			global $wp_query;
			$query = $wp_query;
		}

		$page = $query->query_vars['paged'];
		$pages = $query->max_num_pages;

		if ( $page == 0 ) {
			$page = 1;
		}

		$html = '';

		if( $pages > 1 ) {

			$html .= '<nav class="pagination"><ul class="clearfix">';

			$html .= '<li><a class="' . ( ( $page > 1 ) ? 'btnPrev"' : 'btnPrev inactive"' ) .'" href="' . get_pagenum_link( $page - 1 ) . '">' . __( 'Previous', 'wowway' ) . '</a></li>';

			for ( $i = 1; $i <= $pages; $i++ ) {

				if ( $i == 1 || $i == $pages || $i == $page || ( $i >= $page - $range && $i <= $page + $range ) ) {
					$html .= '<li><a href="' . get_pagenum_link( $i ) . '"' . ( $page == $i ? ' class="active"' : '' ) . '>' . $i . '</a></li>';
				} else if ( ( $i != 1 && $i == $page - $range - 1 ) || ( $i != $page && $i == $page + $range + 1 ) ) {
					$html .= '<li>...</li>';
				}

			}

			$html .= '<li><a class="' . ( ( $page < $pages ) ? 'btnNext"' : 'btnNext inactive"' ) .'" href="' . get_pagenum_link( $page + 1 ) . '">' . __( 'Next', 'wowway' ) . '</a></li>';

			$html .= '</ul></nav>';

		}

		echo $html;
		 
	}

}

/*---------------------------------
    Function that gets featured image
------------------------------------*/

if ( ! function_exists( 'krown_post_thumbnail' ) ) {

	function krown_post_thumbnail( $post_id, $width, $height = null, $crop = null ) {

		if ( has_post_thumbnail( $post_id ) ) {

			// Retina ready

			$retina = krown_retina();
			if ( $retina === 'true' ) {
				$width *= 2;
				if ( $height != null ) {
					$height *= 2;
				}
			}

			$img = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), 'full' );
			$img_url = $img[0];
			$image = aq_resize( $img_url, $width, $height, $crop, false );

			echo '<a href="' . get_permalink( $post_id ) . '"><img class="post-thumbnail" src="' . $image[0] . '" width="' . $image[1] . '" height="' . $image[2] . '" alt="' . get_the_title() . '" /></a>';

		}

	}

}

/*---------------------------------
    Function that gets custom header
------------------------------------*/

if ( ! function_exists( 'krown_post_header' ) ) {

	function krown_post_header( $post_id ) {

		$slider_height = get_post_meta( $post_id, 'rb_post_height', true ) != '' ? get_post_meta( $post_id, 'rb_post_height', true ) : 400; 
		
		switch( get_post_meta( $post_id, 'krown_post_header', true ) ) {

			case 'slider':
				echo '<div class="post-header loading">';
				krown_portfolio_slider( $post_id, 900, $slider_height, false );
				echo '</div>';
				break;

			case 'iframe':
				echo '<div class="post-header loading">' . get_post_meta( $post_id, 'krown_iframe', true ) . '</div>';
				break;

			default:
				echo '';

		}

	}

}


/*---------------------------------
    Update Notice
------------------------------------*/

add_action( 'admin_notices', 'krown_update_notice' );

function krown_update_notice() {

	if ( get_option( 'krown_koncept_version' ) != '2.1.4' ) {

        echo '<div class="updated" style="position: relative;">
        	<h4>You have just updated to version 2.1.4 - <a style="text-decoration" href="' . admin_url( 'themes.php?page=ot-theme-options&krown_update_done_do=1#section_log' ) . '">Read the CHANGELOG</a></h4>';

        printf(__('<em style="position: absolute; top: 18px; right: 20px;"><a href="%1$s">Dismiss</a></em>'), '?krown_update_done_do=1');

        echo "<p></p></div>";

	}

}
add_action( 'admin_init', 'krown_update_done_do' );

function krown_update_done_do() {
	global $current_user;
    $user_id = $current_user->ID;
    if ( isset( $_GET['krown_update_done_do'] ) && '1' == $_GET['krown_update_done_do'] ) {
        update_option( 'krown_koncept_version', '2.1.4' );
	}
}

/*---------------------------------
    Navigation Walker
------------------------------------*/

class menu_default_walker extends Walker_Nav_Menu
{

    function start_lvl( &$output, $depth=0, $args=array() ) {
        $output .= '<div><ul class="sub-menu clearfix">';
    }

    function display_element( $element, &$children_elements, $max_depth, $depth=0, $args, &$output ){

        $id_field = $this->db_fields['id'];

        if ( is_object( $args[0] ) ) {
            $args[0]->has_children = ! empty( $children_elements[$element->$id_field] );
        }

        return parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );

    }

    function start_el( &$output, $object, $depth=0, $args=array(), $current_object_id=0 ) {

        global $wp_query;
        global $rb_submenus;

        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

        $new_output = '';
        $depth_class = ( $args->has_children ? 'parent ' : '' );

        $class_names = $value = $selected_class = '';
        $classes = empty( $object->classes ) ? array() : ( array ) $object->classes;

        $current_indicators = array('current-menu-item', 'current-menu-parent', 'current_page_item', 'current_page_parent', 'current-menu-ancestor');

        foreach ( $classes as $el ) {
            if ( in_array( $el, $current_indicators ) ) {
                $selected_class = 'selected ';
            }
        }

        $class_names = ' class="' . $selected_class . $depth_class . 'menu-item' . ( ! empty( $classes[0] ) ? ' ' . $classes[0] : '' ) . ' clearfix"';

		if ( ! get_post_meta( $object->object_id , '_members_only' , true ) || is_user_logged_in() ) {
            $output .= $indent . '<li id="menu-item-'. $object->ID . '"' . $class_names . '>';
        }

		$attributes  = ! empty( $object->attr_title ) ? ' title="'  . esc_attr( $object->attr_title ) .'"' : '';
		$attributes .= ! empty( $object->target )     ? ' target="' . esc_attr( $object->target     ) .'"' : '';
		$attributes .= ! empty( $object->xfn )        ? ' rel="'    . esc_attr( $object->xfn        ) .'"' : '';
		
        if ( ! in_array( $object->object, krown_cpt_cat_list() ) && $object->attr_title != 'allportfolio' && $object->attr_title != 'allgallery' ) {

            $attributes .= ! empty( $object->url )        ? ' href="'   . esc_attr( $object->url        ) .'"' : '';

        } else {

            if ( $object->attr_title == 'allportfolio' || $object->attr_title == 'allgallery' ) {

                $attributes .= ' href="#" class="filter all-filter" data-filter="*"';

            } else {
            	
                $terms = get_terms( $object->object, array( 'include' => $object->object_id ) );
                $attributes .= ' href="#" class="filter" data-filter="' . ( isset( $terms[0] ) ? $terms[0]->slug : '' ) .'"';

            }

        }

        $object_output = $args->before;
        $object_output .= '<p><a' . $attributes . '>';
        $object_output .= $args->link_before . apply_filters( 'the_title', $object->title, $object->ID ) . $args->link_after;
        $object_output .= krown_cpt_cat_count( $object->object, $object->object_id, $object->attr_title );
        $object_output .= '</a></p>';
        $object_output .= $args->after;

        if ( ! get_post_meta( $object->object_id, '_members_only' , true ) || is_user_logged_in() ) {

            $output .= apply_filters( 'walker_nav_menu_start_el', $object_output, $object, $depth, $args );

        }

        $output .= $new_output;

	}

    function end_el(&$output, $object, $depth=0, $args=array()) {

        if ( !get_post_meta( $object->object_id, '_members_only' , true ) || is_user_logged_in() ) {
            $output .= "</li>\n";
        }

    }
    
    function end_lvl(&$output, $depth=0, $args=array()) {

        $output .= "</ul></div>\n";

    }
	
}
/*---------------------------------
    Helper functions for navigation
------------------------------------*/

if ( ! function_exists( 'krown_cpt_cat_list' ) ) {

	function krown_cpt_cat_list() {
		return array( 'portfolio_category', 'gallery_category' );
	}

}

if ( ! function_exists( 'krown_cpt_cat_count' ) ) {

	function krown_cpt_cat_count( $object = null, $object_id = null, $title = null ) {

		if ( $title == 'allblog' ) {
			$title = 'allpost';
		}

		if ( $title == 'allgallery' || $title == 'allportfolio' || $title == 'allpost' ) {

			return ' <span class="menu-cat">(' . wp_count_posts( str_replace_first( 'all', '', $title ) )->publish . ')</span>';

		} else if ( $object == 'category' || $object == 'portfolio_category' || $object == 'gallery_category' ) {

			$terms = get_terms( $object, array( 'include' => $object_id ) );
			return ' <span class="menu-cat">(' . $terms[0]->count . ')</span>';

		} else {
			return  '';
		}

	}

}

function str_replace_first($search, $replace, $subject) {
    $pos = strpos($subject, $search);
    if ($pos !== false) {
        $subject = substr_replace($subject, $replace, $pos, strlen($search));
    }
    return $subject;
}

/*---------------------------------
	Setup backgrounds
------------------------------------*/

add_filter( 'image_slider_fields', 'new_slider_fields', 10, 2 );
function new_slider_fields( $image_slider_fields, $id ) {
  if ( $id == 'rb_backgrounds' ) {
    $image_slider_fields = array(
		array(
			'name'  => 'title',
			'type'  => 'text',
			'label' => 'Title',
		 	'class' => 'option-tree-slider-title'
		),
        array(
	        'name'  => 'image',
	        'type'  => 'text',
	        'label' => 'Post Image URL',
	        'class' => ''
        ),
		array(
			'name' => 'default_pages',
			'type' => 'checkbox',
			'label' => 'Check to select this as the default background for all pages',
			'class' => ''
		),
		array(
			'name' => 'default_posts',
			'type' => 'checkbox',
			'label' => 'Check to select this as the default background for all posts',
			'class' => '',
		)
	);
  }
  return $image_slider_fields;
}

/*---------------------------------
	Custom login logo
------------------------------------*/

function krown_custom_login_logo() {
    echo '<style type="text/css">
        h1 a { background-image: url(' . ot_get_option( 'krown_custom_login_logo_uri', get_template_directory_uri() . '/images/krown-login-logo.png' ) . ') !important; background-size: 273px 63px !important; width: 273px !important; height: 63px !important; }
    </style>';
}

add_action( 'login_head', 'krown_custom_login_logo' );

/*---------------------------------
	Custom gravatar
------------------------------------*/

if ( ! function_exists( 'krown_gravatar' ) ) {

	function krown_gravatar( $avatar_defaults ) {
		$myavatar = get_template_directory_uri() . '/images/krown-gravatar.png';
		$avatar_defaults[$myavatar] = 'Krown Gravatar';
		return $avatar_defaults;
	}

	add_filter( 'avatar_defaults', 'krown_gravatar' );

}

/*---------------------------------
	Fix empty search issue
------------------------------------*/

function krown_request_filter( $query_vars ) {

    if( isset( $_GET['s'] ) && empty( $_GET['s'] ) ) {
        $query_vars['s'] = " ";
    }

    return $query_vars;
}

add_filter('request', 'krown_request_filter');
  
/*---------------------------------
	Return page custom background
------------------------------------*/

if ( ! function_exists( 'krown_custom_background') ) {

	function krown_custom_background() {

		global $post;

		$def_post = '';
		$def_page = '';
		$background_style = '';

		if ( isset( $post ) ) {

			$meta_back = get_post_meta( $post->ID, 'rb_post_backgrounda', true );

			$backgrounds = ot_get_option( 'rb_backgrounds' );
			if ( isset( $backgrounds ) && ! empty( $backgrounds ) ) {

				foreach ( $backgrounds as $background ) {

					if( isset( $background['default_posts'] ) )  {
						$def_post = $background['image'];
					} else if ( isset( $background['default_pages'] ) ) {
						$def_page = $background['image'];
					}

					if ( $meta_back != 'None' && $meta_back == $background['title'] ) {
						$meta_back = $background['image'];
					}

				}

			}

			if ( $meta_back != 'None' ) {
				$background_style = ' style="background-image:url(' . $meta_back . ')"';
			} else if ( $meta_back == 'None' && (is_single() || is_search() || is_archive() || is_page_template('template-blog.php')) && $def_post != '' ) {
				$background_style = ' style="background-image:url(' . $def_post . ')"';
			} else if ( $meta_back == 'None' && $def_page != '' ) {
				$background_style = ' style="background-image:url(' . $def_page . ')"';
			}

		}

		echo $background_style;

	}

}

/*--------------------------------
	Function that echoes contact page info
------------------------------------*/

if ( ! function_exists( 'krown_contact_lines' ) ) {

	function krown_contact_lines( $post_id, $meta, $type ) {

		$field = get_post_meta( $post_id, $meta, true );
		if ( $field != '' ) {
			$field = preg_replace( '"\\n"', '<br />', $field );
			echo '<li class="' . $type . '">' . $field . '</li>';
		}

	}

}

/*--------------------------------
	Function that returns all categories of a custom post
------------------------------------*/

function krown_categories( $post_id, $taxonomy, $delimiter = ', ', $get = 'name', $echo = true, $link = false ){

	$tags = wp_get_post_terms( $post_id, $taxonomy );
	$list = '';
	foreach( $tags as $tag ){
		if ( $link ) {
			$list .= '<a href="' . get_category_link( $tag->term_id ) . '"> ' . $tag->$get . '</a>' . $delimiter;
		} else {
			$list .= $tag->$get . $delimiter;
		}
	}

	if ( $echo ) {
		echo substr( $list, 0, strlen($delimiter)*(-1) );
	} else { 
		return substr( $list, 0, strlen($delimiter)*(-1) );
	}

}

/*---------------------------------
	Check if the current page is a portfolio
------------------------------------*/

if ( ! function_exists( 'krown_check_portfolio' ) ) {

	function krown_check_portfolio() {

		global $post;

		if ( is_page_template( 'template-portfolio.php' ) || is_page_template( 'template-gallery.php' ) || is_singular( array( 'portfolio', 'gallery' ) ) ) { 
			return 'is-portfolio thumbs-loading';
		} else {
			return 'isnt-portfolio';
		}

	}

}

/*---------------------------------
	Enqueue front scripts
------------------------------------*/

function krown_enqueue_scripts() {

	global $post;

	// Enqueue the greensock plugins for js animations:

	wp_enqueue_script( 'tween_max', get_template_directory_uri() . '/js/TweenMax.min.js', array('jquery'), NULL, true);
	wp_enqueue_script( 'gsap', get_template_directory_uri() . '/js/jquery.gsap.min.js', array('tween_max'), NULL, true);

	// Register some other js libraries

	wp_register_script( 'fancybox', get_template_directory_uri().'/js/jquery.fancybox.pack.js', array('gsap'), NULL, true );
	wp_register_script( 'isotope', get_template_directory_uri().'/js/jquery.isotope.min.js', array('gsap'), NULL, true );
	wp_register_script( 'mCustomScrollbar', get_template_directory_uri().'/js/jquery.mCustomScrollbar.min.js', array('gsap'), NULL, true );
	wp_register_script( 'history', get_template_directory_uri().'/js/jquery.history.min.js', array('gsap'), NULL, true );
	wp_register_script( 'msgbox', get_template_directory_uri().'/js/jquery.msgbox.min.js', array( 'gsap' ), NULL, true );
	wp_register_script( 'google-maps', 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=' . ot_get_option( 'krown_gmaps' ), NULL, true );

	// Enqueue theme scripts based on page templates and shortcodes. I haven't used "has_shortcode()" because that function doesn't work with nested shortcodes

	if ( isset( $post ) ) {

		if ( strpos( $post->post_content, '[gallery' ) >= 0 ) {
			wp_enqueue_script( 'fancybox' );
		}

		if ( is_page_template( 'template-portfolio.php' ) || is_page_template( 'template-gallery.php' ) || is_singular( 'portfolio' ) || is_singular( 'gallery' ) ) {
			wp_enqueue_script( 'msgbox' );
			wp_enqueue_script( 'history' );
		}

		if ( is_singular( 'portfolio' ) || is_page_template( 'template-portfolio.php' ) ) {
			wp_enqueue_script( 'mCustomScrollbar' );
		}

		if ( is_page_template( 'template-portfolio.php' ) || is_page_template( 'template-gallery.php' ) ) {
			wp_enqueue_script( 'isotope' );
		}

		if ( is_page_template( 'template-contact.php' ) ) {
			wp_enqueue_script( 'google-maps' );
		}

	}

	// Enqueue the rest of libraries all the time, since they are used almost on any page

	wp_deregister_script( 'wp-mediaelement' );
	wp_deregister_style('wp-mediaelement');

	wp_enqueue_script( 'theme_plugins', get_template_directory_uri().'/js/plugins.min.js', array( 'gsap' ), NULL, true );
	wp_enqueue_script( 'swiper', get_template_directory_uri().'/js/idangerous.swiper.min.js', array('gsap'), NULL, true );
	wp_enqueue_script( 'wp-mediaelement', get_template_directory_uri().'/js/mediaelement-and-player.min.js', array('gsap'), NULL, true );
	wp_enqueue_script( 'theme_scripts', get_template_directory_uri().'/js/scripts.min.js', array( 'theme_plugins' ), NULL, true );

	// Enqueue styles

	wp_enqueue_style( 'krown-style-parties', get_template_directory_uri() . '/css/third-parties.css' );
	wp_enqueue_style( 'krown-style', get_stylesheet_uri() );

	// Handle comments script

	if ( is_single() || is_page() ) {
		wp_enqueue_script( 'comment-reply' );
	} else {
		wp_dequeue_script( 'comment-reply' );
	}
	
	// We need to pass some useful variables to the theme scripts through the following function

	wp_localize_script(
		'theme_scripts', 
		'themeObjects',
		array(
			'base' => get_template_directory_uri(),
			'folioOpacity' 			=> is_page_template( 'template-portfolio.php' ) ? get_option( 'krown_thumbs_opacity', '.7' ) : get_option( 'krown_gal_thumbs_opacity', '.7' ),
			'folioWidth' 			=> is_page_template( 'template-portfolio.php' ) ? get_option( 'krown_thumbs_width', '340' ) : get_option( 'krown_gal_thumbs_width', '340' ),
			'gAnalytics' 			=> ot_get_option( 'krown_tracking_enable', 'disabled' ),
			'gAnalyticsCode' 		=> ot_get_option( 'krown_tracking' ),
			'modalDummyBackground' 	=> get_option( 'krown_folio_dummy_background' ),
			'modalCloseClick'		=> get_option( 'krown_folio_modal_close_click', 'false' ),
			'gallerySliderSpeed'	=> get_option( 'krown_gal_speed', '5000' ),
			'text_password'			=> __( 'This is a protected post. In order to view it, please enter a password:', 'wowway' ),
			'text_slider'			=> __( 'of', 'wowway' ),
			'responsiveNavText'		=> __( '--- Navigation ---', 'wowway' )
		)
	);

}

add_action( 'wp_enqueue_scripts', 'krown_enqueue_scripts', 10 );

/*---------------------------------
	Enqueue admin styles
------------------------------------*/

function krown_admin_scripts() {
	wp_enqueue_style( 'krown-admin-css', get_template_directory_uri() . '/css/admin_styles.css' );
}

add_action( 'admin_enqueue_scripts', 'krown_admin_scripts' );

/*---------------------------------
	Insert analytics code into the footer
------------------------------------*/

if ( ! function_exists( 'krown_analytics' ) ) {

	function krown_analytics() {
		echo ot_get_option( 'krown_tracking' );
	}

}

add_filter( 'wp_footer', 'krown_analytics' );

/*---------------------------------
	Color functions
------------------------------------*/

function krown_hex_to_rgba($hex, $a) {

   $hex = str_replace("#", "", $hex);

   if(strlen($hex) == 3) {
      $r = hexdec(substr($hex,0,1).substr($hex,0,1));
      $g = hexdec(substr($hex,1,1).substr($hex,1,1));
      $b = hexdec(substr($hex,2,1).substr($hex,2,1));
   } else {
      $r = hexdec(substr($hex,0,2));
      $g = hexdec(substr($hex,2,2));
      $b = hexdec(substr($hex,4,2));
   }

   return 'rgba(' . $r . ',' . $g . ',' . $b . ',' . $a . ')';
   
}

/*---------------------------------
	Retina info (by js cookie)
------------------------------------*/

if ( ! function_exists( 'krown_retina' ) ) {

	function krown_retina() {

		if ( isset( $_COOKIE['dpi'] ) ) {
			$retina = $_COOKIE['dpi'];
		} else { 
			$retina = false;
		}

		return $retina;

	}

}

?>