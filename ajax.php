<?php

require_once './config.php';
require_once './lib/dblib.php';
require_once './lib/authlib.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	if (!isset($_POST['m'])) {
		http_response_code(500);
		die();
	}

	switch ($_POST['m']) {
		case 'score':
			addScore($_POST);
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
	if (AUTH::checkLogin()) {
		$user = AUTH::getUser();
		if ($user !== null) {
			// Add score
			$scoreData = new stdClass();
			$scoreData->score = $post['score'];
			$scoreData->user = $user->id;

			DB::addScore($scoreData);
			
		}
	}
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
