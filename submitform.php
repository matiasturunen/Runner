<?php

// make sure that it is a POST
if ($_SERVER['REQUEST_METHOD'] == "POST") {
	require_once './config.php';
	require_once './lib/dblib.php';

	// Create note
	if (isset($_POST['note'])) {
		DB::addMemo($_POST['note']);
	}

	// If its ajax, send note info back
	if (isset($_POST['ajax'])) {
		$memos = DB::getMemos();
		
		foreach ($memos as $memo) {
		    ?>
		    <li class="note" data-id="<?php echo $memo->memoId ?>">
		        <?php echo $memo->data ?>
		    </li>
		    <?php
		}
	}
}
//header('Location: index.php');
die();

