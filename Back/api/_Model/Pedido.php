<?php
class Pedido
{

    // database connection and table name
    private $conn;
    private $table_name = "Pedidos";

    // object properties
    public $pedido_ID;
    public $user_ID;
    public $subtotal;
    public $iva;
    public $total;
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
