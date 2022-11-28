<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// database connection will be here
// include database and object files
include_once '../_Config/config.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$pedido_ID = 0;

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->pedido_ID)) {
    // set product property values
    $pedido_ID = $data->pedido_ID;
}

// Prepare a select statement
$sql = "SELECT * FROM Pedidos_productos WHERE pedido_ID = ?";

if ($stmt = mysqli_prepare($db, $sql)) {
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "i", $param_pedido_ID);

    // Set parameters
    $param_pedido_ID = $pedido_ID;

    // Attempt to execute the prepared statement
    if ($result = mysqli_stmt_execute($stmt)) {
        $result = mysqli_stmt_get_result($stmt);

        $pedido_productos_arr = array();
        $pedido_productos_arr["pedido_productos"] = array();

        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_array($result)) {
                extract($row);

                $pedido_producto_item = array(
                    "pedido_ID" => $pedido_ID,
                    "producto_id" => $producto_id,
                    "cantidad" => $cantidad
                );

                array_push($pedido_productos_arr["pedido_productos"], $pedido_producto_item);
            }

            // set response code - 200 OK
            http_response_code(200);

            // show products data in json format
            echo json_encode($pedido_productos_arr);
        }
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

    // Close statement
    mysqli_stmt_close($stmt);
}
