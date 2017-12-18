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

$fbsecret = file_get_contents('../fbsecret.txt');
if ($fbsecret == null || $fbsecret == '' || $fbsecret == false) {
    $fbsecret = getenv('FBSECRET');
}

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
    ),
    'fb' => array(
        'app_id' => '171609496773366',
        'app_secret' => $fbsecret, // facebook app secret
    )
);

// Start session
session_start();

$PDO = getPDO($SETTINGS);

require_once "$APPROOT/lib/outputlib.php";
$OUTPUT = new PageRenderer();
