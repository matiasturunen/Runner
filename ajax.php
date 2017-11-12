<?php

require_once './config.php';
require_once './lib/dblib.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	if (!isset($_POST['m'])) {
		http_response_code(500);
		die();
	}

	switch ($_POST['m']) {
		case 'login':
			login($_POST);
			break;
		
		case 'score':
			addScore($_POST);
			break;

		case 'logout':
			logout();
			break;

		default:
			http_response_code(500);
			break;
	}
	
} else if ($_SERVER['REQUEST_METHOD'] == "GET") {
	if (!isset($_REQUEST['m'])) {
		http_response_code(500);
		die();
	}

	switch ($_REQUEST['m']) {
		case 'toplist':
			topList();
			break;
		
		default:
			http_response_code(500);
			break;
	}
}

function getCurrentUser() {
	$user = null;
	if (isset($_SESSION['USER'])) {
	    $username = $_SESSION['USER'];
	    $user = DB::getUser($username);
	}
	return $user;
}

function addScore($post) {
	// Create new user or get existing one
	$user = DB::createGetUser($post['username']);

	// Add score
	$scoreData = new stdClass();
	$scoreData->score = $post['score'];
	$scoreData->user = $user->id;

	DB::addScore($scoreData);
}

function topList() {
	$toplist = DB::getToplist();

    foreach ($toplist as $entry) {
        echo "<li>$entry->username - $entry->score</li>";
    }
    for ($i=0; $i < 10 - count($toplist); $i++) { 
        echo "<li>---</li>";
    }
}

function login($data) {
	if(isset($data['username']) && isset($data['password'])) {
		$user = DB::getUser($data['username']);
		echo 'user';
		print_r ($user);
		if (isset($user->password) && isset($user->username)) {
			if ($user->password == $data['password']) {
				$_SESSION['USER'] = $user->$username;
			} else {
				http_response_code(401);
			}
		} else {
			http_response_code(401);
		}
	} else {
		http_response_code(401);
	}
}

function logout() {
	if (getCurrentUser() !== null) {
		unset($_SESSION['USER']);
	}
}
