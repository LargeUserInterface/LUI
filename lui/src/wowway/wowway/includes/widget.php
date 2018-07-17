<?php

//Add an action that will load all widgets
add_action( 'widgets_init', 'rb_load_widgets' );

//Function that registers the widgets
function rb_load_widgets() {
	register_widget('rb_phone_widget');
	register_widget('rb_separator_widget');
}

/*-----------------------------------------------------------------------------------

	Plugin Name: Krown Twitter Widget
	Plugin URI: http://www.rubenbristian.com
	Description: A widget that displays your latest tweets
	Version: 1.0
	Author: Ruben Bristian
	Author URI: http://www.rubenbristian.com

-----------------------------------------------------------------------------------*/

class rb_twitter_widget extends WP_Widget {
	
	function __construct() {
		parent::__construct( false, 'Krown Twitter Widget' );
	}
		
	function widget($args, $instance){
			
		extract($args);
			
		$title = apply_filters('widget_title', $instance['title']);
		$username = $instance['username'];
		$intro = $instance['intro'];
			
		echo $before_widget;
			
		echo $before_title.$title.$after_title;

		$tweets = getTweets(1, $username);

		echo '<p class="twitterIntro">', $intro, ' ', rbTwitterFilter($tweets[0]['text']), '</p>';

		echo $after_widget;
			
	}
				
	function update($new_instance, $old_instance){
		
		$instance = $old_instance;
			
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['username'] = strip_tags($new_instance['username']);
		$instance['intro'] = strip_tags($new_instance['intro']);
			
		return $instance;
			
	}
		
	function form($instance){
		
		$defaults = array( 'title' => 'Twitter', 'username' => '', 'intro' => 'Latest tweet:' );
			
		$instance = wp_parse_args((array) $instance, $defaults);
			
		?>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e('Title:', 'corvius'); ?></label>
				<input id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
			</p>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'username' ); ?>"><?php _e('Username:', 'corvius'); ?></label>
				<input id="<?php echo $this->get_field_id( 'username' ); ?>" name="<?php echo $this->get_field_name( 'username' ); ?>" value="<?php echo $instance['username']; ?>" style="width:100%;" />
			</p>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'intro' ); ?>"><?php _e('Label:', 'corvius'); ?></label>
				<input id="<?php echo $this->get_field_id( 'intro' ); ?>" name="<?php echo $this->get_field_name( 'intro' ); ?>" value="<?php echo $instance['intro']; ?>" style="width:100%;" />
			</p>
			
		<?php
			
	}
		
}

/*-----------------------------------------------------------------------------------

	Plugin Name: Krown Phone Widget
	Plugin URI: http://www.rubenbristian.com
	Description: A widget that displays your phone number
	Version: 1.0
	Author: Ruben Bristian
	Author URI: http://www.rubenbristian.com

-----------------------------------------------------------------------------------*/

class rb_phone_widget extends WP_Widget {
	
	function __construct() {
		parent::__construct( false, 'Krown Phone Widget' );
	}
	
	function widget($args, $instance){
			
		extract($args);
			
		$title = apply_filters('widget_title', $instance['title']);
		$phone = $instance['number'];
		$text = $instance['text'];
			
		echo $before_widget;
			
		echo $before_title.$title.$after_title;

		echo '<p class="phoneNumber">' . $text . ' <strong>' . '<a href="callto:' . str_replace(array('(', ')', '-', ' '), '', $phone) . '">' . $phone . '</a>' . '</strong></p>';
			
		echo $after_widget;
			
	}
			
	function update($new_instance, $old_instance){
		
		$instance = $old_instance;
			
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['text'] = strip_tags($new_instance['text']);
		$instance['number'] = strip_tags($new_instance['number']);
			
		return $instance;
			
	}
		
	function form($instance){
		
		$defaults = array( 'title' => 'Phone Number', 'text' => 'Call Us', 'number' => '' );
			
		$instance = wp_parse_args((array) $instance, $defaults);
			
		?>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e('Title:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
			</p>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'text' ); ?>"><?php _e('Text:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'text' ); ?>" name="<?php echo $this->get_field_name( 'text' ); ?>" value="<?php echo $instance['text']; ?>" style="width:100%;" />
			</p>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'number' ); ?>"><?php _e('Phone number:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'number' ); ?>" name="<?php echo $this->get_field_name( 'number' ); ?>" value="<?php echo $instance['number']; ?>" style="width:100%;" />
			</p>
			
		<?php
			
	}
		
}
		
/*-----------------------------------------------------------------------------------

	Plugin Name: Krown Social Icons Widget
	Plugin URI: http://www.rubenbristian.com
	Description: A widget that displays your social links
	Version: 1.0
	Author: Ruben Bristian
	Author URI: http://www.rubenbristian.com

-----------------------------------------------------------------------------------*/

class rb_social_widget extends WP_Widget {
	
	function __construct() {
		parent::__construct( false, 'Krown Social Widget' );
	}
	
	function widget($args, $instance){
			
		extract($args);
			
		$title = (isset($instance['title']) ? apply_filters('widget_title', $instance['title']) : '');

		$twitter = $instance['twitter'];
		$facebook = $instance['facebook'];
		$googleplus = $instance['googleplus'];
		$pinterest = $instance['pinterest'];
		$flickr = $instance['flickr'];
		$dribbble = $instance['dribbble'];
		$linkedin = $instance['linkedin'];
		$vimeo = $instance['vimeo'];
		$youtube = $instance['youtube'];
		$skype = $instance['skype'];
		$google = $instance['google'];
		$digg = $instance['digg'];
		$stumbleupon = $instance['stumbleupon'];
		$delicious = $instance['delicious'];
		$rss = $instance['rss'];
			
		echo $before_widget;
			
		echo $before_title.$title.$after_title;
			
		echo '<ul class="socialList clearfix">';

		if($twitter)
			echo '<li><a target="_blank" class="twitter" href="' . $twitter . '">twitter icon</a></li>';
		if($facebook)
			echo '<li><a target="_blank" class="facebook" href="' . $facebook . '">facebook icon</a></li>';
		if($googleplus)
			echo '<li><a target="_blank" class="google" href="' . $googleplus . '">google plus icon</a></li>';
		if($pinterest)
			echo '<li><a target="_blank" class="pinterest" href="' . $pinterest . '">pinterest icon</a></li>';
		if($flickr)
			echo '<li><a target="_blank" class="flickr" href="' . $flickr . '">flickr icon</a></li>';
		if($dribbble)
			echo '<li><a target="_blank" class="dribbble" href="' . $dribbble . '">dribbble icon</a></li>';
		if($linkedin)
			echo '<li><a target="_blank" class="linkedin" href="' . $linkedin . '">linkedin icon</a></li>';
		if($vimeo)
			echo '<li><a target="_blank" class="vimeo" href="' . $vimeo . '">vimeo icon</a></li>';
		if($youtube)
			echo '<li><a target="_blank" class="youtube" href="' . $youtube . '">youtube icon</a></li>';
		if($skype)
			echo '<li><a target="_blank" class="skype" href="' . $skype . '">skype icon</a></li>';
		if($google)
			echo '<li><a target="_blank" class="google2" href="' . $google . '">google icon</a></li>';
		if($digg)
			echo '<li><a target="_blank" class="digg" href="' . $digg . '">digg icon</a></li>';
		if($stumbleupon)
			echo '<li><a target="_blank" class="stumbleupon" href="' . $stumbleupon . '">stumbleupon icon</a></li>';
		if($delicious)
			echo '<li><a target="_blank" class="delicious" href="' . $delicious . '">delicious icon</a></li>';
		if($rss)
			echo '<li><a target="_blank" class="rss" href="' . $rss . '">rss icon</a></li>';

		echo '</ul>';
			
		echo $after_widget;
			
	}
			
	function update($new_instance, $old_instance){
		
		$instance = $old_instance;

		$instance['twitter'] = strip_tags($new_instance['twitter']);
		$instance['facebook'] = strip_tags($new_instance['facebook']);
		$instance['googleplus'] = strip_tags($new_instance['googleplus']);
		$instance['pinterest'] = strip_tags($new_instance['pinterest']);
		$instance['flickr'] = strip_tags($new_instance['flickr']);
		$instance['dribbble'] = strip_tags($new_instance['dribbble']);
		$instance['linkedin'] = strip_tags($new_instance['linkedin']);
		$instance['vimeo'] = strip_tags($new_instance['vimeo']);
		$instance['youtube'] = strip_tags($new_instance['youtube']);
		$instance['skype'] = strip_tags($new_instance['skype']);
		$instance['google'] = strip_tags($new_instance['google']);
		$instance['digg'] = strip_tags($new_instance['digg']);
		$instance['stumbleupon'] = strip_tags($new_instance['stumbleupon']);
		$instance['delicious'] = strip_tags($new_instance['delicious']);
		$instance['rss'] = strip_tags($new_instance['rss']);
			
		return $instance;
			
	}
		
	function form($instance){
		
		$defaults = array( 'title' => 'Social Links', 'flickr' => '', 'facebook' => '', 'google' => '', 'linkedin' => '', 'twitter' => '', 'skype' => '', 'googleplus' => '', 'pinterest' => '', 'dribbble' => '', 'vimeo' => '', 'youtube' => '', 'digg' => '', 'delicious' => '', 'rss' => '', 'stumbleupon' => '' );
			
		$instance = wp_parse_args((array) $instance, $defaults);
			
		?>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e('Title:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
			</p>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'twitter' ); ?>"><?php _e('Twitter link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'twitter' ); ?>" name="<?php echo $this->get_field_name( 'twitter' ); ?>" value="<?php echo $instance['twitter']; ?>" style="width:100%;" />
			</p>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'facebook' ); ?>"><?php _e('Facebook link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'facebook' ); ?>" name="<?php echo $this->get_field_name( 'facebook' ); ?>" value="<?php echo $instance['facebook']; ?>" style="width:100%;" />
			</p>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'googleplus' ); ?>"><?php _e('Google Plus link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'googleplus' ); ?>" name="<?php echo $this->get_field_name( 'googleplus' ); ?>" value="<?php echo $instance['googleplus']; ?>" style="width:100%;" />
			</p>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'pinterest' ); ?>"><?php _e('Pinterest link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'pinterest' ); ?>" name="<?php echo $this->get_field_name( 'pinterest' ); ?>" value="<?php echo $instance['pinterest']; ?>" style="width:100%;" />
			</p>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'flickr' ); ?>"><?php _e('Flickr link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'flickr' ); ?>" name="<?php echo $this->get_field_name( 'flickr' ); ?>" value="<?php echo $instance['flickr']; ?>" style="width:100%;" />
			</p>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'dribbble' ); ?>"><?php _e('Dribbble link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'dribbble' ); ?>" name="<?php echo $this->get_field_name( 'dribbble' ); ?>" value="<?php echo $instance['dribbble']; ?>" style="width:100%;" />
			</p>
			
			<p>
				<label for="<?php echo $this->get_field_id( 'linkedin' ); ?>"><?php _e('LinkedIn link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'linkedin' ); ?>" name="<?php echo $this->get_field_name( 'linkedin' ); ?>" value="<?php echo $instance['linkedin']; ?>" style="width:100%;" />
			</p>

			<p>
				<label for="<?php echo $this->get_field_id( 'vimeo' ); ?>"><?php _e('Vimeo link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'vimeo' ); ?>" name="<?php echo $this->get_field_name( 'vimeo' ); ?>" value="<?php echo $instance['vimeo']; ?>" style="width:100%;" />
			</p>

			<p>
				<label for="<?php echo $this->get_field_id( 'youtube' ); ?>"><?php _e('YouTube link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'youtube' ); ?>" name="<?php echo $this->get_field_name( 'youtube' ); ?>" value="<?php echo $instance['youtube']; ?>" style="width:100%;" />
			</p>

			<p>
				<label for="<?php echo $this->get_field_id( 'skype' ); ?>"><?php _e('Skype link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'skype' ); ?>" name="<?php echo $this->get_field_name( 'skype' ); ?>" value="<?php echo $instance['skype']; ?>" style="width:100%;" />
			</p>

			<p>
				<label for="<?php echo $this->get_field_id( 'google' ); ?>"><?php _e('Google link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'google' ); ?>" name="<?php echo $this->get_field_name( 'google' ); ?>" value="<?php echo $instance['google']; ?>" style="width:100%;" />
			</p>

			<p>
				<label for="<?php echo $this->get_field_id( 'digg' ); ?>"><?php _e('Digg link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'digg' ); ?>" name="<?php echo $this->get_field_name( 'digg' ); ?>" value="<?php echo $instance['digg']; ?>" style="width:100%;" />
			</p>

			<p>
				<label for="<?php echo $this->get_field_id( 'stumbleupon' ); ?>"><?php _e('StumbleUpon link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'stumbleupon' ); ?>" name="<?php echo $this->get_field_name( 'stumbleupon' ); ?>" value="<?php echo $instance['stumbleupon']; ?>" style="width:100%;" />
			</p>

			<p>
				<label for="<?php echo $this->get_field_id( 'delicious' ); ?>"><?php _e('Delicious link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'delicious' ); ?>" name="<?php echo $this->get_field_name( 'delicious' ); ?>" value="<?php echo $instance['delicious']; ?>" style="width:100%;" />
			</p>

			<p>
				<label for="<?php echo $this->get_field_id( 'rss' ); ?>"><?php _e('RSS link:', 'wowway'); ?></label>
				<input id="<?php echo $this->get_field_id( 'rss' ); ?>" name="<?php echo $this->get_field_name( 'rss' ); ?>" value="<?php echo $instance['rss']; ?>" style="width:100%;" />
			</p>
			
		<?php
			
	}
		
}

/*-----------------------------------------------------------------------------------

	Plugin Name: Krown Separator Widget
	Plugin URI: http://www.rubenbristian.com
	Description: A widget that simply adds a separator to the page(to be used in the sidebar)
	Version: 1.0
	Author: Ruben Bristian
	Author URI: http://www.rubenbristian.com

-----------------------------------------------------------------------------------*/

class rb_separator_widget extends WP_Widget {
	
	function __construct() {
		parent::__construct( false, 'Krown Separator Widget' );
	}
		
	function widget($args, $instance){
			
		echo '<hr class="widget_separator" />';
		
	}
			
	function update($new_instance, $old_instance){
		
		$instance = $old_instance;
			
		return $instance;
			
	}
		
	function form($instance){
			
	}
		
}

?>