<?php
require_once './config.php';
require_once './lib/dblib.php';

$scripts = [
    "js/index.js",
    "lib/phaser.min.js",
    "runner/runner.js"
];
// page header
$OUTPUT->phead($scripts);


$user = null;
if (isset($_SESSION['USERID'])) {
    $uid = $_SESSION['USERID'];
    $user = DB::getUser($uid);
}

?>

<div class="container">
<?php

    if (isset($user) && $user !== null) {
        ?>
         <div class="row">
         <div class="col-sm">
            <?php echo $user->username; ?>
         </div>
         <div class="col-sm">
            <a class="btn btn-secondary" role="button" href="logout.php" >Logout</a> 
         </div>
         </div>
         <?php
    } else {
        echo "<div class=\"userinfo\"><a href=\"login.php\">Kirjaudu</a></div>";
    }

?>

</div>
<div class="container content">
    <div id="runnerGame">
    </div>
    <ol id="toplist">
    </ol>
    <div id="ajaxError"></div>
</div>

<?php

// page footer
$OUTPUT->pfoot();


die();

