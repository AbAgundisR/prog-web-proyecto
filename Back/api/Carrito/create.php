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

include_once '../_config/config.php';
include_once '../_Model/Carrito.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$carrito = new Carrito();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_ID) && !empty($data->producto_id) && !empty($data->cantidad)) {
    // set product property values
    $carrito->user_ID = $data->user_ID;
    $carrito->producto_id = $data->producto_id;
    $carrito->cantidad = $data->cantidad;
}

// Prepare a select statement
$sql = "INSERT INTO Carrito (user_ID, producto_id, cantidad) VALUES (?, ?, ?)";

if ($stmt = mysqli_prepare($db, $sql)) {
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "iii", $param_user_ID, $param_producto_id, $param_cantidad);

    // Set parameters
    $param_user_ID = $carrito->user_ID;
    $param_producto_id = $carrito->producto_id;
    $param_cantidad = $carrito->cantidad;

    // Attempt to execute the prepared statement
    if (mysqli_stmt_execute($stmt)) {
        // tell the user
        echo json_encode(array("message" => "Carrito creado."));
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

    // Close statement
    mysqli_stmt_close($stmt);
}

// Close connection
mysqli_close($db);
