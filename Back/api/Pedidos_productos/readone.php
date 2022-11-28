<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// database connection will be here
// include database and object files
include_once '../_Config/config.php';
include_once '../_Model/Pedido_producto.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$pedido_ID = 0;
$producto_id = 0;

if (!empty($data->pedido_ID) && !empty($data->producto_id)) {
    // set product property values
    $pedido_ID = $data->pedido_ID;
    $producto_id = $data->producto_id;
}

// Prepare a select statement
$sql = "SELECT * FROM Pedido_productos WHERE pedido_ID = ? AND producto_id = ?";

if ($stmt = mysqli_prepare($db, $sql)) {
    mysqli_stmt_bind_param($stmt, "ii", $param_pedido_ID, $param_producto_id);

    // Set parameters
    $param_pedido_ID = $pedido_ID;
    $param_producto_id = $producto_id;

    if ($result = mysqli_stmt_execute($stmt)) {
        $pedido_producto = new Pedido_producto();

        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

            // Retrieve individual field value
            $pedido_producto->pedido_ID = $row["pedido_ID"];
            $pedido_producto->producto_id = $row["producto_id"];
            $pedido_producto->cantidad = $row["cantidad"];

            // set response code - 200 OK
            http_response_code(200);

            // show products data in json format
            echo json_encode($pedido_producto);
        }
    } else {
        echo 'a';
    }
}
