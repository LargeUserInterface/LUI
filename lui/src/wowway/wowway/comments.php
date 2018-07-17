<?php
/**
 * Comments template
 */
?>

<?php if ( post_password_required() ) : ?>
				<p><?php _e( 'This post is password protected. Enter the password to view any comments.', 'wowway' ); ?></p>
<?php
		return;
	endif;
?>

	<div class="commentsList">

		<h5 id="comments-title"><?php echo __( 'Comments ', 'wowway' ) . '(', get_comments_number() . ')'; ?></h5>
	
		<?php if ( have_comments() ) : ?>
		
			<ul class="clearfix"><?php wp_list_comments( array( 'callback' => 'krown_comment' ) ); ?></ul>

			<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : 
				previous_comments_link( __( '&larr; Older Comments', 'wowway' ) );
				next_comments_link( __( 'Newer Comments &rarr;', 'wowway' ) );
			endif; ?>

		<?php else : 

			if ( ! comments_open() ) {
				_e( 'Comments are closed.', 'wowway' );
			} else {
				echo '<p>' . __( 'Be the first to leave a reply!', 'wowway') . '</p>';
			}

		?>

		<?php endif; ?>
		
	</div>

	<div class="commentsForm">

		<?php 
		
		 
		$defaults = array( 'fields' => apply_filters( 'comment_form_default_fields', array(
			'author' => '<div class="krown-column-container span4 first"><input id="author" name="author" type="text" value="' . __( 'Name *', 'wowway' ) . '"/></div>',
			'email'  => '<div class="krown-column-container span4"><input id="email" name="email" type="text" value="' . __( 'Email*', 'wowway' ) . '" /></div>',
			'url'    => '<div class="krown-column-container span4 last"><input id="url" name="url" type="text" value="' . __( 'Website', 'wowway' ) . '" /></div>' ) ),
			'comment_field' => '<div class="krown-column-container span12 first last"><textarea id="comment" name="comment" rows="8">' . __( 'Message*', 'wowway' ) . '</textarea></div>',
			'must_log_in' => '<p style="margin-bottom:25px" class="must-log-in">' .  sprintf( __( 'You must be <a href="%s">logged in</a> to post a comment.', 'wowway' ), wp_login_url( apply_filters( 'the_permalink', get_permalink( ) ) ) ) . '</p>',
			'logged_in_as' => '<p style="margin-bottom:25px" class="logged-in-as">' . sprintf( __( 'You are logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>' ), admin_url( 'profile.php' ), $user_identity, wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) ) , 'wowway') . '</p>',
			'comment_notes_before' => '',
			'comment_notes_after' => '',
			'id_form' => 'comment-form',
			'id_submit' => 'submit',
			'title_reply' => __( 'Add Your Comment', 'wowway' ),
			'title_reply_to' => __( 'Leave a Reply to %s', 'wowway' ),
			'cancel_reply_link' => __( 'Cancel reply', 'wowway' ),
			'label_submit' => __( 'Submit Comment', 'wowway' ),
		); 
		
		comment_form($defaults); 
		
		?>
		
		<span class="asterix"><?php _e('* required', 'wowway'); ?></span>

	</div>