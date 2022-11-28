<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// database connection will be here
// include database and object files
include_once '../_config/config.php';
include_once '../_Model/Carrito.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$user_ID = 0;
$producto_id = 0;

if (!empty($data->user_ID) && !empty($data->producto_id)) {
    // set product property values
    $user_ID = $data->user_ID;
    $producto_id = $data->producto_id;
}

// Prepare a select statement
$sql = "SELECT * FROM Carrito WHERE user_ID = ? and producto_id = ?";

if ($stmt = mysqli_prepare($db, $sql)) {
    mysqli_stmt_bind_param($stmt, "s", $param_id);

    // Set parameters
    $param_id = $id;

    if ($result = mysqli_stmt_execute($stmt)) {
        $carrito = new Carrito();

        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

            // Retrieve individual field value
            $carrito->id = $row["user_ID"];
            $carrito->nombre = $row["producto_id"];
            $carrito->semestre = $row["cantidad"];

            // set response code - 200 OK
            http_response_code(200);

            // show products data in json format
            echo json_encode($carrito);
        }
    } else {
        echo 'a';
    }
}
