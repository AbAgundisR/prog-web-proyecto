<?php
class Carrito
{

    // database connection and table name
    private $conn;
    private $table_name = "Carrito";

    // object properties
    private $ID;
    private $is_superusuario;
    private $username;
    private $email;
    private $password;
    private $nombre_completo;
    private $direccion;
    private $ciudad;
    private $estado;
    private $cp;
    private $telefono;

    // constructor with $db as database connection
    public function __construct()
    {
    }
}
