<?php
/**
 * The footer of the theme
 */
?>
		<!-- Close main wrapper -->
		</div>

		<!-- Top Footer -->
		<footer class="footer" id="topFooter">
			<?php if(is_active_sidebar('rb_top_footer_widget_left')) : ?>
				<div class="left">
					<?php dynamic_sidebar('rb_top_footer_widget_left'); ?>
				</div>
			<?php endif; ?>
			<?php if(is_active_sidebar('rb_top_footer_widget_right')) : ?>
				<div class="right">
					<?php dynamic_sidebar('rb_top_footer_widget_right'); ?>
				</div>
			<?php endif; ?>
		</footer>

		<!-- Bottom Footer -->
		<footer class="footer" id="bottomFooter">
			<?php if(is_active_sidebar('rb_bottom_footer_widget_left')) : ?>
				<div class="left">
					<?php dynamic_sidebar('rb_bottom_footer_widget_left'); ?>
				</div>
			<?php endif; ?>
			<a href="#" id="top">Go to Top <span>&uarr;</span></a>
		</footer>

	</div>
	<!-- Everything ended here -->

	<!-- IE7 Message Start -->
	<div id="oldie">
		<p><?php _e('This is a unique website which will require a more modern browser to work!', 'wowway'); ?><br /><br />
		<a href="https://www.google.com/chrome/" target="_blank"><?php _e('Please upgrade today!', 'wowway'); ?></a>
		</p>
	</div>
	<!-- IE7 Message End -->

	<!-- No Scripts Message Start -->
	<noscript id="scriptie">
		<div>
			<p><?php _e('This is a modern website which will require Javascript to work. <br />Please turn it on!', 'wowway'); ?>
			</p>
		</div>
	</noscript>
	<!-- No Scripts Message End -->

	<div id="loader"><i class="krown-icon-spin6 animate-spin"></i></div>

	<?php wp_footer(); ?>

</body>
</html>