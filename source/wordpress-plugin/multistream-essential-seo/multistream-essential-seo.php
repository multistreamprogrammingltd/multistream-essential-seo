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

function register_multistream_essential_seo_menu_page()
{
    add_menu_page('Essential SEO', 'Essential SEO', '8', 'multistream_essential_seo_menu_page', 'multistream_essential_seo_menu_page');
}

function multistream_essential_seo_menu_page(){
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#000000"/><meta name="description" content="Multistream SEO Analyzer"/><title>Essential SEO</title>
<script defer="defer" src="/wp-content/plugins/<?php echo basename(dirname(__FILE__));?>/app/static/js/main.c51f604b.js"></script>
<link href="/wp-content/plugins/<?php echo basename(dirname(__FILE__));?>/app/static/css/main.ccb5ceaf.css" rel="stylesheet"></head><body>
<noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>
<?php
}