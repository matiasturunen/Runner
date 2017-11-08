<?php

require_once './config.php';
require_once './lib/dblib.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	if (!isset($_POST['m'])) {
		die();
	}

	switch ($_POST['m']) {
		case 'login':
			login($_POST);
			break;
		
		case 'score':
			addScore($_POST);
			break;

		default:
			header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
			break;
	}
	
} else if ($_SERVER['REQUEST_METHOD'] == "GET") {
	if (!isset($_REQUEST['m'])) {
		die();
	}

	switch ($_REQUEST['m']) {
		case 'toplist':
			topList();
			break;
		
		default:
			header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
			break;
	}
}

die();

function addScore($post) {
	// TOOD: Session user check
	// TODO : safety check
	$data = new stdClass();
	$data->score = $post['score'];
	$data->user = $post['user'];

	DB::addScore($data);
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

function login() {
	return 0;
}
