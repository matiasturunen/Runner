<?php

function getPDO($settings) {
    
    $dns = $settings['db']['driver'] .
            ':host=' . $settings['db']['host'] .
            (!empty($settings['db']['port']) ? (';port=' . $settings['db']['port']) : '') .
            ';dbname=' . $settings['db']['database'];
    
    try {
        $PDO = new PDO(
                $dns, $settings['db']['user'], $settings['db']['pass'], array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8')
        );
    } catch (PDOException $e) {
        echo 'DB error!';
    }
    
    // some error handling stuff
    $PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    return $PDO;
}
