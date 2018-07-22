<?php

    function krown_wp_path() {

        $base = dirname( __FILE__ );
        $path = false;

        if ( @file_exists( dirname( dirname( $base ) ) . "/wp-load.php" ) ) {
            $path = dirname( dirname( $base ) ) . "/wp-load.php";
        } else if ( @file_exists( dirname( dirname( dirname( $base ) ) ) . "/wp-load.php" ) ) {
            $path = dirname( dirname( dirname( $base ) ) ) . "/wp-load.php";
        } else if ( @file_exists( dirname( dirname( dirname( dirname( $base ) ) ) ) . "/wp-load.php" ) ) {
            $path = dirname( dirname( dirname( dirname( $base ) ) ) ) . "/wp-load.php";
        } else {
            $path = false;
        }

        if ( $path != false ) {
            $path = str_replace( "\\", "/", $path );
        }

        return $path;

    }
         
    function krown_clean_string( $string ) {
        $bad = array( "content-type", "bcc:", "to:", "cc:", "href" );
        return str_replace( $bad, "", $string );
    }
    require( krown_wp_path() );

    if( isset( $_POST['fred'] ) && $_POST['fred'] != '' ) {
        die();
    }

    if( isset( $_POST['email'] ) )  {

        if ( ! isset( $_POST['name'] ) ||
            ! isset( $_POST['email'] ) ||
            ! isset( $_POST['dlo128'] ) ||
            ! isset( $_POST['message'] ) ) {
            die();      
        }
         
        $name = $_POST['name']; 
        $email = $_POST['email'];
        $message = $_POST['message'];
        $email_to = $_POST['dlo128'];
         
        $email_message = "Form details below.\n\n";
         
        $email_message .= "Name: " . krown_clean_string( $name ) . "\n";
        $email_message .= "Email: " . krown_clean_string( $email ) . "\n";
        $email_message .= "Message: " . krown_clean_string( $message );
         
        $headers[] = 'From: ' . $name . ' <' . $email . '>' . "\r\n";
        $headers[] = 'Reply-To: ' . $email . "\r\n";

        echo wp_mail($email_to, __( "You've received an email from your website", 'wowwway' ), $email_message, $headers);
        
    }

?>