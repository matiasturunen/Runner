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
if (isset($_SESSION['USER'])) {
    $username = $_SESSION['USER'];
    $user = DB::getUser($username);
}


?>

<div class="container">
<?php

    if (isset($user) && $user !== null) {
        echo "<div class=\"userinfo\">";
        echo "<p>User: " . $user->username . "</p>";

        // Logout button
        echo "<a class=\"button\" id=\"logoutbutton\">Logout</a>";
        echo "</div>";
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

