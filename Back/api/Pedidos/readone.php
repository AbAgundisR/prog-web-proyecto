<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// database connection will be here
// include database and object files
include_once '../_Config/config.php';
include_once '../_Model/Pedido.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$pedido_ID = "";

if (!empty($data->id)) {
    // set product property values
    $pedido_ID = $data->id;
}

// Prepare a select statement
$sql = "SELECT * FROM Reticula WHERE id = ?";

if ($stmt = mysqli_prepare($db, $sql)) {
    mysqli_stmt_bind_param($stmt, "s", $param_pedido_ID);

    // Set parameters
    $param_pedido_ID = $pedido_ID;

    if ($result = mysqli_stmt_execute($stmt)) {
        $pedido = new Pedido();

        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

            // Retrieve individual field value
            $pedido->pedido_ID = $row["pedido_ID"];
            $pedido->user_ID = $row["user_ID"];
            $pedido->subtotal = $row["subtotal"];
            $pedido->iva = $row["iva"];
            $pedido->total = $row["total"];
            $pedido->direccion = $row["direccion"];
            $pedido->ciudad = $row["ciudad"];
            $pedido->estado = $row["estado"];
            $pedido->cp = $row["cp"];
            $pedido->telefono = $row["telefono"];

            // set response code - 200 OK
            http_response_code(200);

            // show products data in json format
            echo json_encode($pedido);
        }
    } else {
        echo 'a';
    }
}
