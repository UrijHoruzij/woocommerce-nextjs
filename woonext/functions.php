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
function add_subsciber_newsletter($req){
	if (class_exists(\MailPoet\API\API::class)) {
  		$mailpoet_api = \MailPoet\API\API::MP('v1');
		$email = sanitize_text_field($req['email']);
  		$error = new WP_Error();
		$subscriber = array('email ' => $req['email']);
		try {
			$mailpoet_api->addSubscriber($subscriber);
		} catch (\Exception $e) {
			$error->add(500, $e->getMessage(), array('status' => 500));
    		return $error;
		}
		return new WP_REST_Response();
	}	
}
function signup($req) {
  $response = array();
  $username = sanitize_text_field($req['username']);
  $email = sanitize_text_field($req['email']);
  $password = sanitize_text_field($req['password']);
  $error = new WP_Error();
  if (empty($username)) {
    $error->add(400, __("Username field 'username' is required.", 'wp-rest-user'), array('status' => 400));
    return $error;
  }
  if (empty($email)) {
    $error->add(401, __("Email field 'email' is required.", 'wp-rest-user'), array('status' => 400));
    return $error;
  }
  if (empty($password)) {
    $error->add(404, __("Password field 'password' is required.", 'wp-rest-user'), array('status' => 400));
    return $error;
  }
  $user_id = username_exists($username);
  if (!$user_id && email_exists($email) == false) {
    $user_id = wp_create_user($username, $password, $email);
    if (!is_wp_error($user_id)) {
      $user = get_user_by('id', $user_id);
      $user->set_role('subscriber');
      if (class_exists('WooCommerce')) {
        $user->set_role('customer');
      }
      $response['message'] = __("The user is created.", "wp-rest-user");
    } else {
      return $user_id;
    }
  } else {
    $error->add(400, __("The user exists.", 'wp-rest-user'), array('status' => 400));
    return $error;
  }
  return new WP_REST_Response($response);
}
function signin($req){
	$cred = array();
  	$error = new WP_Error();
	$username = sanitize_text_field($req['username']);
  	$password = sanitize_text_field($req['password']);
	if (empty($username)) {
		$error->add(400, __("Username field 'username' is required.", 'wp-rest-user'), array('status' => 400));
		return $error;
	}
	if (empty($password)) {
		$error->add(404, __("Password field 'password' is required.", 'wp-rest-user'), array('status' => 400));
		return $error;
	}
	$cred['user_login'] = $username;
	$cred['user_password'] =  $password;
	$cred['remember'] = true;
	$user = wp_signon($cred, false);
	if (!is_wp_error($user)){
		return array(
			"id" => $user->ID,
			"email" => $user->user_email,
		 	"name" => $user->display_name
		);
	}else{
    	$error->add(401, __("The email or password is not valid.", 'wp-rest-user'), array('status' => 401));
		return $error;
	}
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
	register_rest_route( 'wp/v2', 'newsletter', array(
        'methods' => 'POST',
        'callback' => 'add_subsciber_newsletter',
    ) );
	register_rest_route('wp/v2', 'signup', array(
    	'methods' => 'POST',
    	'callback' => 'signup',
  	));
	register_rest_route('wp/v2', 'signin', array(
    	'methods' => 'POST',
    	'callback' => 'signin',
  	));
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



