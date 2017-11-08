<?php

// make sure that it is a POST
if ($_SERVER['REQUEST_METHOD'] == "POST") {
	require_once './config.php';
	require_once './lib/dblib.php';

	if (isset($_POST['delete_memo'])) {
		DB::deleteMemo($_POST['delete_memo']);
	}
}
//header('Location: index.php');
die();
