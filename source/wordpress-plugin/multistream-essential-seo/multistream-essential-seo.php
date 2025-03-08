<?php
/*
=== multistream-essential-seo ===
Plugin Name:  Multistream Essential SEO
Plugin URI:   https://multistreamprogramming.com/
Plugin Source: https://github.com/multistreamprogrammingltd/multistream-essential-seo
Description:  A basic SEO analsyer for Wordpress written in React
Version:      1.0.5
Author:       Peter Lackey
Author URI:   https://www.linkedin.com/in/peter-lackey
Text Domain:  multistream-essential-seo
Contributors: @multistreamprogramming
Requires at least: 2.0
Tested up to: 6.71
Stable tag: 1.0.5
Requires PHP: 7.0
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

add_action( 'admin_menu', 'register_multistream_essential_seo_menu_page' );

function multistream_essential_seo_init() {
    wp_register_script( 'multistream_essential_seo_script', '/wp-content/plugins/'.wp_basename(dirname(__FILE__)).'/app/static/js/main.c51f604b.js', array( 'jquery' ), '1.0.5' );
    wp_enqueue_script( 'multistream_essential_seo_script', '', '', true );
    wp_register_style( 'multistream_essential_seo_style', '/wp-content/plugins/'.wp_basename(dirname(__FILE__)).'/app/static/css/main.ccb5ceaf.css', array( 'jquery' ), '1.0.5' );
    wp_enqueue_style( 'multistream_essential_seo_style' );	
}
add_action( 'init', 'load_jquery' ); // end jQuery

function register_multistream_essential_seo_menu_page()
{
    add_menu_page('Essential SEO', 'Essential SEO', '8', 'multistream_essential_seo_menu_page', 'multistream_essential_seo_menu_page');
}

function multistream_essential_seo_menu_page(){
?>
<html><div id="root"></div></body></html>
<?php
}