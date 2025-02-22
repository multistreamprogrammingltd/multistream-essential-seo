<?php
/*
=== multistream-essential-seo ===
Plugin Name:  Multistream Essential SEO
Plugin URI:   https://multistreamprogramming.com/
Plugin Source: https://github.com/multistreamprogrammingltd/multistream-essential-seo
Description:  A basic SEO analsyer for Wordpress written in React
Version:      1.0.4
Author:       Peter Lackey
Author URI:   https://www.linkedin.com/in/peter-lackey
Text Domain:  multistream-essential-seo
Contributors: @multistreamprogramming
Requires at least: 2.0
Tested up to: 6.71
Stable tag: 1.0.4
Requires PHP: 7.0
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

add_action( 'admin_menu', 'register_multistream_essential_seo_menu_page' );

function register_multistream_essential_seo_menu_page()
{
        add_options_page('Essential SEO', 'Essential SEO', '8', 'editglobalcustomfields', 'editglobalcustomfields');
}

function multistream_essential_seo_menu_page(){
?>
<?php
include('app/index.html');
}
?>