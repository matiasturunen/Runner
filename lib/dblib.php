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
    public static function getToplist($tspan=null) {
        $sql = "SELECT s.score, s.achieved, u.username
                FROM www_Scores s INNER JOIN www_User u ON s.userId = u.id ";
        if ($tspan == null) {
            $sql .= " ORDER BY s.score DESC LIMIT 10";    
        } elseif ($tspan == 'DAY') {
            $sql .= " WHERE s.achieved >= NOW() - INTERVAL 1 DAY
            ORDER BY s.score DESC LIMIT 10";
        } elseif ($tspan == 'MONTH') {
            $sql .= " WHERE s.achieved >= NOW() - INTERVAL 1 MONTH
            ORDER BY s.score DESC LIMIT 10";
        }
        

        return DB::sqlSelect($sql);
    }

    /**
     * Add new memo
     */
    public static function addScore($data) {
        $sql = "INSERT INTO www_Scores (score, userId) VALUES (:score, :user)";

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
        $sql = "INSERT INTO www_User (username, email, fb_id) VALUES (:uname, :email, :fbid)";
        $params = [
            ':uname' => $data->username,
            ':email' => $data->email,
            ':fbid' => $data->fbid
        ];
        DB::sqlExecute($sql, $params);
    }

    /*
     * Get existing user by id
     */
    public static function getUser($id) {
        $sql = "SELECT * FROM www_User WHERE id=:uid";
        $params = [
            ':uid' => $id
        ];
        $res = DB::sqlSelect($sql, $params);
        if (isset($res[0])) {
            return $res[0];
        } else {
            return null;
        }
    }

    /*
     * Get user by fb id
     */
    public static function getFBUser($fbid) {
        $sql = "SELECT * FROM www_User WHERE fb_id=:fbid";
        $params = [
            ':fbid' => $fbid
        ];
        $res = DB::sqlSelect($sql, $params);
        if (isset($res[0])) {
            return $res[0];
        } else {
            return null;
        }
    }

    /*
     * Get existing or create new user
     */
    public static function createGetUser($fbuser) {
        // Check if user exists
        $user = DB::getFBUser($fbuser->fbid);
        if ($user == null) {
            // Create new user
            $newUser = new stdClass();
            $newUser->username = $fbuser->name;
            $newUser->email = $fbuser->email;
            $newUser->fbid = $fbuser->fbid;
            DB::addUser($newUser);

            $user = DB::getFBUser($fbid);
        }
        return $user;
    }
}