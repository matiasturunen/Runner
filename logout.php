<?php
require_once __DIR__ . '/lib/authlib.php';
if (AUTH::checkLogin()) {
	session_unset();
	session_destroy();
	setcookie('userloggedin', '', time()-3600); // Set cookie to expire 1 hour ago
}
header('Location: index.php');
die();
