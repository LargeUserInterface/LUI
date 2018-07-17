<!DOCTYPE html>
<!--[if lt IE 8]>    <html <?php language_attributes(); ?> class="ie8" xmlns="http://www.w3.org/1999/xhtml"> <![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes(); ?> xmlns="http://www.w3.org/1999/xhtml"> <!--<![endif]-->
<head>

	<!-- META -->

	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
	<meta name="format-detection" content="telephone=no">

	<!-- LINKS -->

	<link rel="profile" href="http://gmpg.org/xfn/11" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

	<?php if( get_option('krown_fav' ) != '' ) : ?>

	<link rel="shortcut icon" type="image/x-icon" href="<?php echo get_option( 'krown_fav' ); ?>" />

	<?php endif; ?>

	<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->

	<!-- WP HEAD -->

	<?php wp_head(); ?>
		
</head>

<?php 

// Get sidebar cookie

$sidebar_cookie_2_css = '';
if ( isset($_COOKIE['sidebar_cookie_2'] ) && $_COOKIE['sidebar_cookie_2'] != '' && get_option( 'krown_sidebar_behavior' ) != 'Stick' ) {
	$sidebar_cookie_2_css = $_COOKIE['sidebar_cookie_2'] . 'Skie';
}

?>

<body id="body" <?php body_class( 'closedSidebar ' . get_option(' krown_site_style' ) . ' ' . get_option( 'krown_sidebar_hide' ) . ' ' . get_option( 'krown_layout_style') . ' ' . get_option( 'krown_blog_style' ) . ' ' . $sidebar_cookie_2_css . ' ' . krown_check_portfolio() . ' no-touch' ); ?><?php krown_custom_background(); ?>>
	
	<div id="sidebar">

		<header id="header">

			<div id="logo">

				<?php 

					$logo = get_option( 'krown_logo' );
					$logo_x2 = get_option( 'krown_logo_x2' );

					if($logo == '') {
						$logo = get_template_directory_uri() . '/images/logo.png';
					}
					if($logo_x2 == '') {
						$logo_x2 = $logo;
					}

				?>

				<a href="<?php echo home_url(); ?>" style="width:<?php echo get_option( 'krown_logo_width', '136'); ?>px;height:<?php echo get_option( 'krown_logo_height', '34'); ?>px">
					<img class="default" src="<?php echo $logo; ?>" alt="<?php bloginfo('name'); ?>" />
					<img class="retina" src="<?php echo $logo_x2; ?>" alt="<?php bloginfo('name'); ?>" />
				</a>

			</div>

			<p id="tagline"><?php bloginfo( 'description' ); ?></p>

		</header>

		<nav id="menu" data-responsive-title="<?php _e( 'Navigation', 'wowway' ); ?>">

			<?php if ( has_nav_menu( 'primary' ) ) :

				wp_nav_menu( array(
					'container' =>false,
					'menu_class' => 'main-menu',
					'echo' => true,
					'before' => '',
					'after' => '',
					'link_before' => '',
					'link_after' => '',
					'depth' => 2,
					'theme_location' => 'primary',
					'walker' => new menu_default_walker()
				) );

			else : ?>

				<ul id="menu-main-menu" class="main-menu">
					<li class="menu-item clearfix"><p><a href="<?php echo esc_url( home_url('/') ); ?>"><?php _e( 'Homepage', 'wowway' ); ?></a></p></li>
					<li class="menu-item clearfix"><p><a href="<?php echo admin_url('nav-menus.php'); ?>"><?php _e( 'Set Up Your Menu', 'wowway' ); ?></a></p></li>
				</ul>

			<?php endif; ?>

		</nav>

		<?php if ( is_active_sidebar( 'rb_side_footer_widget' ) ) : ?>
			<div class="sidewidget">
				<?php dynamic_sidebar( 'rb_side_footer_widget' ); ?>
			</div>
		<?php endif; ?>

		<footer id="copy">
			<p><?php echo get_option( 'krown_footer_copy' ); ?></p>
		</footer>

		<a href="#" id="close"<?php echo $sidebar_cookie_2_css != 'openedSkie' ? ' class="openIcon"' : ''; ?>>x</a>

	</div>
		
	<div id="content" class="clearfix">

		<div>