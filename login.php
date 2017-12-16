<?php
require_once './config.php';
require_once './lib/dblib.php';
require_once __DIR__ . '/vendor/autoload.php';

if(!session_id()) {
    session_start();
}


// page header
$OUTPUT->phead();

$fb = new Facebook\Facebook([
  'app_id' => $SETTINGS['fb']['app_id'], // Replace {app-id} with your app id
  'app_secret' => '{app-secret}',
  'default_graph_version' => 'v2.2',
  ]);

$helper = $fb->getRedirectLoginHelper();

$permissions = ['email']; // Optional permissions
$loginUrl = $helper->getLoginUrl('http://localhost/LUT/www-ohjelmointi/PHASER/fb-callback.php', $permissions);

echo '<a href="' . htmlspecialchars($loginUrl) . '">Log in with Facebook!</a>';

?>
<div class="container">
	
</div>
<!--
<div class="container">

<form id="newuserform" target="" method="POST">
	<div class="form-group row">
		<label for="input-username" class="col-sm-2 col-form-label" >Username</label>
		<div class="col-sm-10">
    		<input type="text" name="username" id="input-username" class="form-control" />
    	</div>
	</div>
	<div class="form-group row">
		<label for="input-password1" class="col-sm-2 col-form-label" >Password</label>
		<div class="col-sm-10">
    		<input type="password" name="password1" id="input-password1" class="form-control" />
    	</div>
	</div>
	<div class="form-group row">
		<label for="input-password2" class="col-sm-2 col-form-label" >Password again</label>
		<div class="col-sm-10">
    		<input type="password" name="password2" id="input-password2" class="form-control" />
    	</div>
	</div>
    <button type="submit" class="btn btn-primary">Create account</button>
</form>

</div>
-->

<?php

// page footer
$OUTPUT->pfoot();


