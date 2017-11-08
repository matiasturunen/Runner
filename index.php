<?php
require_once './config.php';
require_once './lib/dblib.php';

// page header
$OUTPUT->phead();

$Toplist = DB::getToplist();

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
        <?php
            if (!count($Toplist)) {
                for ($i=0; $i < 10; $i++) { 
                    echo "<li>---</li>";
                }
            }

            foreach ($Toplist as $entry) {
                ?>
                <li>
                    <?php echo $entry->score ?>
                </li>
                <?php
            }
        ?>
        </ol>
    </div>
</div>

<?php

// page footer
$OUTPUT->pfoot();


die();

