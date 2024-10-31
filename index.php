<?php
/*
 * Plugin Name: Remove jQuery from Gravity Forms
 * Version: 1.1.1
 * Plugin URI: https://aesal.net/remove-jquery-from-gravity-forms
 * Description: Use the built in REST API to submit Gravity Forms without loading jQuery.
 * Author: aesal
 * Author URI: https://aesal.net
 */

function remove_jquery_from_gravityforms_remove_jquery() {
	wp_deregister_script( 'gform_gravityforms' );
	wp_deregister_script('jquery');
	wp_deregister_script('jquery-migrate');
	wp_deregister_script('gform_gravityforms');
	wp_deregister_script('gform_json');
	wp_deregister_script('gform_placeholder');
	wp_deregister_script('gform_masked_input');
}
add_action( 'wp_enqueue_scripts', 'remove_jquery_from_gravityforms_remove_jquery', 100 );

function remove_jquery_from_gravityforms_scripts() {
	wp_enqueue_script('remove-jquery-from-gravity-forms', plugins_url('remove-jquery-from-gravity-forms.min.js', __FILE__), array(), filemtime(plugin_dir_path(__FILE__) . 'remove-jquery-from-gravity-forms.min.js'), true);
	wp_localize_script('remove-jquery-from-gravity-forms', 'remove_jquery_from_gravityforms_base_url', trailingslashit(get_site_url()));
}
add_action('gform_enqueue_scripts', 'remove_jquery_from_gravityforms_scripts', 100);


?>
