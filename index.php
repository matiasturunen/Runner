<?php
require_once './config.php';
require_once './lib/dblib.php';

// page header
$OUTPUT->phead();

/*
$user = null;
if (isset($_SESSION['USER'])) {
    $username = $_SESSION['USER'];
    $user = DB::getUser($username);
}
*/

?>

<header>
    <div class="container">
        <h1>Runner</h1>
    </div>
</header>
<div id="headerfix"></div>
<div class="container">
<?php
/*
    if (isset($user)) {
        echo "<div class=\"userinfo\">";
        echo "<p>User: " . $user->username . "</p>";

        // Logout button
        echo "<a class=\"button\" id=\"logoutbutton\">Logout</a>";
        echo "</div>";
    }
*/
?>
<!--
<form id="loginform" target="">
    <input type="text" name="username" id="input-username" />
    <input type="password" name="password" id="input-password">
    <input type="submit" name="submit">
</form>-->
<form id="playername">
    <div>
    <label for="inp-playername">Pelaajan nimi</label>
    <input type="text" name="playername" id="inp-playername" />
</div>
</form>
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

