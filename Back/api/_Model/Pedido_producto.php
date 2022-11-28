<?php
class Pedido_producto
{

    // database connection and table name
    private $conn;
    private $table_name = "Pedidos_productos";

    // object properties
    public $pedido_ID;
    public $producto_id;
    public $cantidad;

    // constructor with $db as database connection
    public function __construct()
    {
    }
}
