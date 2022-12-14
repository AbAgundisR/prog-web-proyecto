<?php
class Database
{
    // get the database connection
    public function getConnection()
    {
        /* Database credentials. Assuming you are running MySQL
        server with default setting (user 'root' with no password) */
        $DB_SERVER = 'localhost';
        $DB_USERNAME = 'root';
        $DB_PASSWORD = '';
        $DB_NAME = 'bd_proyectophp';

        $this->conn = null;

        try {
            $this->conn = mysqli_connect($DB_SERVER, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

    /* Attempt to connect to MySQL database */
    /*$link = mysqli_connect($DB_SERVER, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);
    
    // Check connection
    if($link === false){
        die("ERROR: Could not connect. " . mysqli_connect_error());
    }*/
}
