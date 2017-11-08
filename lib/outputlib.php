<?php

/**
 * This file contains common page outputting functions such as header, menu, footer
 * 
 */

class PageRenderer {
    
    /**
     * Basic constructor
     */
    public function __construct() {
    }

    /* Add page header */
    public function phead() {
        include(dirname(dirname(__FILE__)) . '/ui/header.php');
    }

    /* Add page footer */
    public function pfoot() {
        include(dirname(dirname(__FILE__)) . '/ui/footer.php');
    }
    
    /**
     * Render json response
     * 
     * @param string $json
     */
    public function renderResponse($json) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-type');
        header('Content-type: application/json; charset=utf-8');
        echo $json;

    }
}
