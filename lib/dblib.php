<?php

/*
 * Database library file. All db related functions should go here
 */
class DB {
    
    /**
     * Get items with raw sql. Only for internal use
     * 
     * @param string $sql - SQL query
     * @param array $params - Query parameters
     * @return array - resulted rows
     */
    private static function sqlSelect($sql, $params = array()) {
        global $PDO;
        
        $query = $PDO->prepare($sql);
        $query->execute($params);
        
        $result = array();
        while($row = $query->fetch(PDO::FETCH_ASSOC)) {
            
            $result[] = (object) $row;      // convert row to object
        }
        return $result;
    }
    
    /**
     * Execute sql query in database. Does not return anything.
     * 
     * @param type $sql - SQL to be executed
     * @param type $params - Query parameters
     */
    private static function sqlExecute($sql, $params = array()) {
        global $PDO;
        
        $query = $PDO->prepare($sql);
        $query->execute($params);
        
    }
    
    /**
     * Get all memos
     */
    public static function getToplist() {
        $sql = "SELECT s.score, s.achieved, u.username
            FROM scores s INNER JOIN user u ON s.userId = u.id
            ORDER BY s.score DESC LIMIT 10";

        return DB::sqlSelect($sql);
    }

    /**
     * Add new memo
     */
    public static function addScore($data) {
        $sql = "INSERT INTO scores (score, userId) VALUES (:score, :user)";

        $params = [
            ':score' => $data->score,
            ':user' => $data->user
        ];
        DB::sqlExecute($sql, $params);
    }

    /**
     * Delete memo
     */
    public static function addUser($data) {
        $sql = "INSERT INTO User (username, email, password) VALUES (:uname, :email, :pass";
        $params = [
            ':uname' => $data->username,
            ':email' => $data->email,
            ':pass' => $data->password
        ];
        DB::sqlExecute($sql, $params);
    }

    public static function getUser($username) {
        $sql = "SELECT * FROM User WHERE username=:uname";
        $params = [
            ':uname' => $username
        ];
        return DB::sqlSelect($sql, $params);
    }
}