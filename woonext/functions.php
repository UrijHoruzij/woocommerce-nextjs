<?php
/**
 * WooNext functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WooNext
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function woonext_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on WooNext, use a find and replace
		* to change 'woonext' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'woonext', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu' => esc_html__( 'Primary', 'woonext' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'woonext_setup' );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function woonext_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'woonext' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'woonext' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'woonext_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function woonext_scripts() {
	wp_enqueue_style( 'woonext-style', get_stylesheet_uri(), array(), _S_VERSION );
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'woonext_scripts' );

function get_menu() {
    return wp_get_nav_menu_items('Menu 1');
}
function get_logo() {
	$custom_logo__url = wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ), 'full' ); 
    return $custom_logo__url[0];
}
add_action( 'rest_api_init', function () {
	register_rest_route( 'wp/v2', 'menu', array(
        'methods' => 'GET',
        'callback' => 'get_menu',
    ) );
	register_rest_route( 'wp/v2', 'logo', array(
        'methods' => 'GET',
        'callback' => 'get_logo',
    ) );
} );

function initCors( $value ) {
  header( 'Access-Control-Allow-Headers: Authorization, X-WP-Nonce,Content-Type, X-Requested-With');
  header( 'Access-Control-Allow-Origin: *' );
  header( 'Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS' );
  header( 'Access-Control-Allow-Credentials: true' );
  return $value;
}
add_action( 'rest_api_init', function() {
	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	add_filter( 'rest_pre_serve_request', 'initCors');
}, 15 );



