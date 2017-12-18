<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/lib/authlib.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}


// page header
$OUTPUT->phead();

$loginUrl = AUTH::getFBLoginUrl();

$link = '<a href="' . htmlspecialchars($loginUrl) . '">Log in with Facebook!</a>';

?>
<div class="container">
	<?php echo $link; ?>
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


