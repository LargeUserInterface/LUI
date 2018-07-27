<?php

/* This file should contain all the functions of the child theme. Most of the theme's functions can be overwritten (some are critical and shouldn't be tampered with). 

--- Below you have a full list of the ones which you can look up in the parent theme's functions.php file and redeclare here:

- krown_retina (to disable retina images by setting the cookie always to False)
- krown_setup (to add things at theme setup - should be modified with care)
- krown_analytics
- krown_filter_wp_title (to change how the theme's title appears)
- krown_comment (to change the structure of the comments)
- krown_excerptlength_small (to change the lenght of the post's excerpt)
- krown_excerptlength_large (to change the lenght of the post's excerpt)
- krown_excerptmore (to change the chars which appear after the post's excerpt)
- krown_excerpt
- krown_search_form (to modify the structure of the search form)
- krown_pagination (pagination which is used in portfolio/blog pages)
- krown_post_thumbnail (returns a thumbnail in blog posts)
- krown_post_header (it refers to the custom header - iframe or slider, available in any post/page)
- krown_cpt_cat_count (handles category count - in menu items)
- krown_gravatar (to use your own custom gravatar)
- krown_custom_background (returns the body background available in any post/page)
- krown_contact_lines (handles contact page template information lines)
- krown_check_portfolio (useful for multiple portfolios done in the child theme)

--- Below you have a list of the ones which you can look up in the parent theme's includes/custom-styles.php file and redeclare here:

- krown_custom_css (if you want to get rid of the custom css output in the DOM and move everything here)
- krown_custom_admin_bar_soft

--- You can also redeclare shortcode functions in here. For a reference, see how i've done it in the theme's parent includes/krown-shortcodes.php file


If you want to create more portfolios than just one you can use this method to duplicate it as many times as you wish. The steps are easy:

	1. Duplicate the "includes/twofolio.php", rename it and replace all occurencies of "twofolio" with your own custom post type name ("shop", "product", etc.). Also, read the comment at the top and do what it says.

	2. Duplicate the "includes/twofolio-meta.php", rename it and replace all occurencies of "twofolio" with your own custom post type name ("shop", "product", etc.).

	3. Duplicate the "includes/twofolio-functions.php", rename it and make sure you do what the four comments say.

	4. Include the three files below, just like the the other inclusion which is commented right now.

	5. Duplicate the "template-twofolio.php" file and rename it to something else. Also, be sure to rename the "Page Template Name" at the top. Also, please read the instructions in it.

	6. Duplicate the "single-twofolio.php" file and replace all occurencies of "twofolio" with your own custom post type name ("shop", "product", etc.).

	7. If all these steps were done properly, you should now have a third portfolio!

Please note that the steps above are for more than two portfolios. If you want two portfolios (plus the gallery which cannot be duplicated), just uncomment the three lines of code below (and maybe change the slug of the portfolio in the twofolio.php file).

If you have to visualize the steps explained here, check out these screencasts: http://www.screenr.com/TQ5H & http://www.screenr.com/xQ5H - the videos are for a different theme (Huge), but the framework is the same, so the steps are quite similar

*/

include 'includes/twofolio.php';
include 'includes/twofolio-meta.php';
include 'includes/twofolio-functions.php';

// Below you should have all of your post types (in order to activate featured images)

add_theme_support( 'post-thumbnails', array( 'twofolio', 'gallery', 'portfolio' ) );

?>