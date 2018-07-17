<?php

add_action( 'init', 'twofolio_init', 0 );

add_filter( 'manage_edit-twofolio_columns', 'twofolio_add_thumbnail_column', 10, 1 );
add_action( 'manage_twofolio_posts_custom_column', 'twofolio_display_thumbnail', 10, 1 );

add_action( 'restrict_manage_posts', 'twofolio_add_taxonomy_filters' );

add_action( 'right_now_content_table_end', 'twofolio_add_folio_counts' );

add_action( 'admin_head', 'twofolio_icon' );

function twofolio_init() {

	/**
	 * Enable the Twofolio custom post type
	 * http://codex.wordpress.org/Function_Reference/register_post_type
	 */

	$labels = array(
		'name' => __( 'Twofolio', 'twofolioposttype' ),
		'singular_name' => __( 'Twofolio Item', 'twofolioposttype' ),
		'add_new' => __( 'Add New Item', 'twofolioposttype' ),
		'add_new_item' => __( 'Add New Twofolio Item', 'twofolioposttype' ),
		'edit_item' => __( 'Edit Twofolio Item', 'twofolioposttype' ),
		'new_item' => __( 'Add New Twofolio Item', 'twofolioposttype' ),
		'view_item' => __( 'View Item', 'twofolioposttype' ),
		'search_items' => __( 'Search Twofolio', 'twofolioposttype' ),
		'not_found' => __( 'No twofolio items found', 'twofolioposttype' ),
		'not_found_in_trash' => __( 'No twofolio items found in trash', 'twofolioposttype' )
	);
	
	$args = array(
    	'labels' => $labels,
    	'public' => true,
		'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'comments', 'author', 'custom-fields', 'revisions' ),
		'capability_type' => 'post',
		'rewrite' => array("slug" => "twofolio"), // Permalinks format
		'menu_position' => 5,
		'has_archive' => false
	);
	
	$args = apply_filters('twofolioposttype_args', $args);

	register_post_type( 'twofolio', $args );
	
	/**
	 * Register a taxonomy for Twofolio Tags
	 * http://codex.wordpress.org/Function_Reference/register_taxonomy
	 */
	
	/*$taxonomy_twofolio_tag_labels = array(
		'name' => _x( 'Twofolio Tags', 'twofolioposttype' ),
		'singular_name' => _x( 'Twofolio Tag', 'twofolioposttype' ),
		'search_items' => _x( 'Search Twofolio Tags', 'twofolioposttype' ),
		'popular_items' => _x( 'Popular Twofolio Tags', 'twofolioposttype' ),
		'all_items' => _x( 'All Twofolio Tags', 'twofolioposttype' ),
		'parent_item' => _x( 'Parent Twofolio Tag', 'twofolioposttype' ),
		'parent_item_colon' => _x( 'Parent Twofolio Tag:', 'twofolioposttype' ),
		'edit_item' => _x( 'Edit Twofolio Tag', 'twofolioposttype' ),
		'update_item' => _x( 'Update Twofolio Tag', 'twofolioposttype' ),
		'add_new_item' => _x( 'Add New Twofolio Tag', 'twofolioposttype' ),
		'new_item_name' => _x( 'New Twofolio Tag Name', 'twofolioposttype' ),
		'separate_items_with_commas' => _x( 'Separate twofolio tags with commas', 'twofolioposttype' ),
		'add_or_remove_items' => _x( 'Add or remove twofolio tags', 'twofolioposttype' ),
		'choose_from_most_used' => _x( 'Choose from the most used twofolio tags', 'twofolioposttype' ),
		'menu_name' => _x( 'Twofolio Tags', 'twofolioposttype' )
	);
	
	$taxonomy_twofolio_tag_args = array(
		'labels' => $taxonomy_twofolio_tag_labels,
		'public' => true,
		'show_in_nav_menus' => true,
		'show_ui' => true,
		'show_tagcloud' => true,
		'hierarchical' => false,
		'rewrite' => array( 'slug' => 'twofolio_tag' ),
		'show_admin_column' => true,
		'query_var' => true
	);
	
	register_taxonomy( 'twofolio_tag', array( 'twofolio' ), $taxonomy_twofolio_tag_args );*/
	
	/**
	 * Register a taxonomy for Twofolio Categories
	 * http://codex.wordpress.org/Function_Reference/register_taxonomy
	 */

    $taxonomy_twofolio_category_labels = array(
		'name' => _x( 'Twofolio Categories', 'twofolioposttype' ),
		'singular_name' => _x( 'Twofolio Category', 'twofolioposttype' ),
		'search_items' => _x( 'Search Twofolio Categories', 'twofolioposttype' ),
		'popular_items' => _x( 'Popular Twofolio Categories', 'twofolioposttype' ),
		'all_items' => _x( 'All Twofolio Categories', 'twofolioposttype' ),
		'parent_item' => _x( 'Parent Twofolio Category', 'twofolioposttype' ),
		'parent_item_colon' => _x( 'Parent Twofolio Category:', 'twofolioposttype' ),
		'edit_item' => _x( 'Edit Twofolio Category', 'twofolioposttype' ),
		'update_item' => _x( 'Update Twofolio Category', 'twofolioposttype' ),
		'add_new_item' => _x( 'Add New Twofolio Category', 'twofolioposttype' ),
		'new_item_name' => _x( 'New Twofolio Category Name', 'twofolioposttype' ),
		'separate_items_with_commas' => _x( 'Separate twofolio categories with commas', 'twofolioposttype' ),
		'add_or_remove_items' => _x( 'Add or remove twofolio categories', 'twofolioposttype' ),
		'choose_from_most_used' => _x( 'Choose from the most used twofolio categories', 'twofolioposttype' ),
		'menu_name' => _x( 'Twofolio Categories', 'twofolioposttype' ),
    );
	
    $taxonomy_twofolio_category_args = array(
		'labels' => $taxonomy_twofolio_category_labels,
		'public' => true,
		'show_in_nav_menus' => true,
		'show_ui' => true,
		'show_admin_column' => true,
		'show_tagcloud' => true,
		'hierarchical' => true,
		'rewrite' => array( 'slug' => 'twofolio_category' ),
		'query_var' => true
    );
	
    register_taxonomy( 'twofolio_category', array( 'twofolio' ), $taxonomy_twofolio_category_args );
	
}
 
/**
 * Add Columns to Twofolio Edit Screen
 * http://wptheming.com/2010/07/column-edit-pages/
 */

function twofolio_add_thumbnail_column( $columns ) {

	$column_thumbnail = array( 'thumbnail' => __('Thumbnail','twofolioposttype' ) );
	$columns = array_slice( $columns, 0, 2, true ) + $column_thumbnail + array_slice( $columns, 1, NULL, true );
	return $columns;
}
function twofolio_display_thumbnail( $column ) {
	global $post;
	switch ( $column ) {
		case 'thumbnail':
			echo get_the_post_thumbnail( $post->ID, array(50, 50) );
			break;
	}
}

/**
 * Adds taxonomy filters to the twofolio admin page
 * Code artfully lifed from http://pippinsplugins.com
 */
 
function twofolio_add_taxonomy_filters() {

	global $typenow;
	
	// An array of all the taxonomyies you want to display. Use the taxonomy name or slug
	$taxonomies = array( 'twofolio_category' );
 
	// must set this to the post type you want the filter(s) displayed on
	if ( $typenow == 'twofolio' ) {
 
		foreach ( $taxonomies as $tax_slug ) {
			$current_tax_slug = isset( $_GET[$tax_slug] ) ? $_GET[$tax_slug] : false;
			$tax_obj = get_taxonomy( $tax_slug );
			$tax_name = $tax_obj->labels->name;
			$terms = get_terms($tax_slug);
			if ( count( $terms ) > 0) {
				echo "<select name='$tax_slug' id='$tax_slug' class='postform'>";
				echo "<option value=''>$tax_name</option>";
				foreach ( $terms as $term ) {
					echo '<option value=' . $term->slug, $current_tax_slug == $term->slug ? ' selected="selected"' : '','>' . $term->name .' (' . $term->count .')</option>';
				}
				echo "</select>";
			}
		}
	}
}

/**
 * Add Twofolio count to "Right Now" Dashboard Widget
 */

function twofolio_add_folio_counts() {
        if ( ! post_type_exists( 'twofolio' ) ) {
             return;
        }

        $num_posts = wp_count_posts( 'twofolio' );
        $num = number_format_i18n( $num_posts->publish );
        $text = _n( 'Twofolio Item', 'Twofolio Items', intval($num_posts->publish) );
        if ( current_user_can( 'edit_posts' ) ) {
            $num = "<a href='edit.php?post_type=twofolio'>$num</a>";
            $text = "<a href='edit.php?post_type=twofolio'>$text</a>";
        }
        echo '<td class="first b b-twofolio">' . $num . '</td>';
        echo '<td class="t twofolio">' . $text . '</td>';
        echo '</tr>';

        if ($num_posts->pending > 0) {
            $num = number_format_i18n( $num_posts->pending );
            $text = _n( 'Twofolio Item Pending', 'Twofolio Items Pending', intval($num_posts->pending) );
            if ( current_user_can( 'edit_posts' ) ) {
                $num = "<a href='edit.php?post_status=pending&post_type=twofolio'>$num</a>";
                $text = "<a href='edit.php?post_status=pending&post_type=twofolio'>$text</a>";
            }
            echo '<td class="first b b-twofolio">' . $num . '</td>';
            echo '<td class="t twofolio">' . $text . '</td>';

            echo '</tr>';
        }
}

/**
 * Displays the custom post type icon in the dashboard
 */
 
function twofolio_icon() { ?>
    <style type="text/css" media="screen">
        #menu-posts-twofolio .wp-menu-image {
            background: url(<?php echo plugin_dir_url( __FILE__ ); ?>../images/twofolio.png) no-repeat 7px 7px !important;
        }
		#menu-posts-twofolio:hover .wp-menu-image {
            background-position: -26px 7px !important;
        }
        #menu-posts-twofolio.wp-has-current-submenu .wp-menu-image {
            background-position: -58px 7px !important;
        }
    </style>

<?php } ?>