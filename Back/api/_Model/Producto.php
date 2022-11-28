<?php
class Producto
{

    // database connection and table name
    private $conn;
    private $table_name = "Productos";

    // object properties
    public $ID;
    public $nombre;
    public $precio;
    public $descripcion;
    public $in_stock;
    public $imagen;
    public $blanco_negro;

    // constructor with $db as database connection
    public function __construct()
    {
    }
}
