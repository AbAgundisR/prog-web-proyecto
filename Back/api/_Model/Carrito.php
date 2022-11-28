<?php
class Carrito
{

    // database connection and table name
    private $conn;
    private $table_name = "Carrito";

    // object properties
    public $user_ID;
    public $producto_id;
    public $cantidad;

    // constructor with $db as database connection
    public function __construct()
    {
    }
}
