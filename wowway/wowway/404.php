<?php
/*---------------------------------
	Search Page Template
------------------------------------*/

get_header(); 

?>

	<section id="page">

		<header id="pageHeader">
			<h1><?php _e( '404 Error', 'wowway' ); ?></h1>
			<a href="#" class="actionButton minimize" data-content=".contentHolder" data-speed="600">minimize</a>
		</header>

		<div class="contentHolder clearfix">

			<p><?php _e( 'Apologies, but the page you requested could not be found. Perhaps searching will help. Additionally you can return to our home page and start over.', 'wowway' ); ?>

		</div>

	</section>
	
<?php get_footer(); ?>

