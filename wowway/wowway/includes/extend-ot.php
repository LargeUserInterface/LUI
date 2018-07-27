<?php

/**
 * Add Photographer Name and URL fields to media uploader
 *
 * @param $form_fields array, fields to include in attachment form
 * @param $post object, attachment record in database
 * @return $form_fields, modified form fields
 */
 
function be_attachment_field_credit( $form_fields, $post ) {

    $form_fields['video-desc'] = array(
        'label' => '<strong>Attaching Videos</strong>',
        'input' => 'text',
        'value' => get_post_meta( $post->ID, '_video_desc', true ),
        'helps' => 'Video files attached to poster images will only work in modal & vertical projects. They don\'t work in the galleries, horizontal projects and any other instance except the two mentioned.<br/><br/>You can either use an embedding url from sites like YouTube or Vimeo, or you can add a link to an mp4/webm file.',
    );

    $form_fields['video-code'] = array(
        'label' => 'Embed URL',
        'input' => 'textarea',
        'value' => get_post_meta( $post->ID, 'video_code', true ),
        'helps' => '',
    );

    $form_fields['video-file'] = array(
        'label' => 'MP4 File URL',
        'input' => 'text',
        'value' => get_post_meta( $post->ID, 'video_file', true ),
        'helps' => '',
    );

    return $form_fields;
}

add_filter( 'attachment_fields_to_edit', 'be_attachment_field_credit', 10, 2 );

/**
 * Save values of Photographer Name and URL in media uploader
 *
 * @param $post array, the post data for database
 * @param $attachment array, attachment fields from $_POST form
 * @return $post array, modified post data
 */

function be_attachment_field_credit_save( $post, $attachment ) {

    if( isset( $attachment['video-code'] ) )
        update_post_meta( $post['ID'], 'video_code', $attachment['video-code'] );

    if( isset( $attachment['video-file'] ) )
update_post_meta( $post['ID'], 'video_file', esc_url( $attachment['video-file'] ) );

    return $post;
    
}

add_filter( 'attachment_fields_to_save', 'be_attachment_field_credit_save', 10, 2 );

add_action( 'wp_ajax_attachments_update', 'ot_type_attachments_ajax_update' );


?>