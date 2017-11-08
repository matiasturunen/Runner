<?php

/* 
 * App configuration settings as well as some globals
 */

// application name. Will be used as default page title
$APPNAME = "LUT WWW";

// root folder
$APPROOT = dirname(__FILE__);

// web root 
$WEBROOT = '/lutwww';

require_once "$APPROOT/db/connection.php";

$SETTINGS = array(
    // database settings
    'db' => array(
        'user' => 'lut_www',               // database username
        'pass' => 'lut_www',                   // database password
        'database' => 'lut_www',    // database name
        'port' => '',                   // database port number, leave empty to use default
        'host' => 'localhost',          // database host
        'driver' => 'mysql',            // database driver
    ),
    // admin settings
    'admin' => array(
        'username' => 'admin',              // admin username
        'defaultpassword' => 'admin',       // admin default password
    )
);

$PDO = getPDO($SETTINGS);

require_once "$APPROOT/lib/outputlib.php";
$OUTPUT = new PageRenderer();
