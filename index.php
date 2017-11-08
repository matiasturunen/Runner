<?php
require_once './config.php';
require_once './lib/dblib.php';

// page header
$OUTPUT->phead();

?>

<header>
    <div class="container">
        <h1>Runner</h1>
    </div>
</header>
<div id="headerfix"></div>
<div class="container content">
    <div id="runnerGame">
    </div>
    <div>
        <ol id="toplist">
        
        </ol>
    </div>
    <div id="ajaxError"></div>
</div>

<?php

// page footer
$OUTPUT->pfoot();


die();

