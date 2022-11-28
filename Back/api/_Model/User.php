<?php
class User
{

    // database connection and table name
    private $conn;
    private $table_name = "Users";

    // object properties
    public $ID;
    public $is_superusuario;
    public $username;
    public $email;
    public $password;
    public $nombre_completo;
    public $direccion;
    public $ciudad;
    public $estado;
    public $cp;
    public $telefono;

    // constructor with $db as database connection
    public function __construct()
    {
    }
}
