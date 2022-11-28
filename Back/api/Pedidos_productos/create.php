<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo 'not post';
}

include_once '../_Config/config.php';
include_once '../_Model/Pedido_producto.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$pedido_producto = new Pedido_producto();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->pedido_ID) && !empty($data->producto_id) && !empty($data->cantidad)) {
    // set product property values
    $pedido_producto->pedido_ID = $data->pedido_ID;
    $pedido_producto->producto_id = $data->producto_id;
    $pedido_producto->cantidad = $data->cantidad;
}

// Prepare a select statement
$sql = "INSERT INTO Pedidos_productos (pedido_ID, producto_id, cantidad) VALUES (?, ?, ?)";

if ($stmt = mysqli_prepare($db, $sql)) {
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "iii", $param_pedido_ID, $param_producto_id, $param_cantidad);

    // Set parameters
    $param_pedido_ID = $pedido_producto->pedido_ID;
    $param_producto_id = $pedido_producto->producto_id;
    $param_cantidad = $pedido_producto->cantidad;

    // Attempt to execute the prepared statement
    if (mysqli_stmt_execute($stmt)) {
        // tell the user
        echo json_encode(array("message" => "Pedido_producto creada."));
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

    // Close statement
    mysqli_stmt_close($stmt);
}

// Close connection
mysqli_close($db);
