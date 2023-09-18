<?php
/**
 * Plugin Name: Mizzou RichText Formats
 * Plugin URI: https://gitlab.com/university-of-missouri/mizzou-digital/wordpress/wp-plugins/miz-richtext-formats
 * Description: WordPress Plugin that adds custom RichText formats to Block Editor.
 * Version: 0.1.0
 * Author: Travis Cook, Digital Service, University of Missouri
 * Author URI: https://digitalservice.missouri.edu
 *
 * @package WordPress
 * @subpackage Mizzou RichText Formats
 * @category plugin
 * @category functions
 * @category Block Editor
 * @author Travis Cook (cooktw@missouri.edu), Digital Service, University of Missouri
 * @copyright 2023 Curators of the University of Missouri
 * @version 0.1.0
 */

// Enqueue Editor Scripts/Styles.
add_action(
	'enqueue_block_editor_assets',
	function () {
		$plugin_data = get_plugin_data( __FILE__ );

		wp_enqueue_script( 'miz-richtext-formats', plugin_dir_url( __FILE__ ) . 'build/index.js', array(), $plugin_data['Version'], true );
	}
);
