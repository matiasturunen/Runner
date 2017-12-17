<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . './dblib.php';
require_once __DIR__ . '/../vendor/autoload.php';

class AUTH {
	private static function ensureSession() {
		if (session_status() == PHP_SESSION_NONE) {
		    session_start();
		}
	}

	public static function checkLogin() {
		AUTH::ensureSession();
		$userid = $_SESSION['USERID'];
		if (isset($userid)) {
			return true;
		}
		return false;
	}

	public static function getFBLoginUrl() {
		global $SETTINGS;
		AUTH::ensureSession();
		$fb = new Facebook\Facebook([
		  'app_id' => $SETTINGS['fb']['app_id'], // Replace {app-id} with your app id
		  'app_secret' =>  $SETTINGS['fb']['app_secret'],
		  'default_graph_version' => 'v2.2',
		  ]);

		$helper = $fb->getRedirectLoginHelper();

		$permissions = ['email']; // Optional permissions
		$loginUrl = $helper->getLoginUrl('http://localhost/LUT/www-ohjelmointi/PHASER/fb-callback.php', $permissions);
		return $loginUrl;
	}

	public static function logoutFacebook() {
		AUTH::ensureSession();
		if (isset($_SESSION['fb_access_token'])) {
			$token = $_SESSION['fb_access_token'];

		}
	}

	public static function getUser() {
		AUTH::ensureSession();
		$uid = $_SESSION['USERID'];
		if (isset($uid) && $uid !== null) {
			return DB::getUser($uid);
		}
		return null;
	}
}