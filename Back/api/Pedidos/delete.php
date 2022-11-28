<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER["REQUEST_METHOD"] != "DELETE") {
    echo 'not delete';
}

include_once '../_Config/config.php';
include_once '../_Model/Pedido.php';

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
$sql = "DELETE FROM Pedidos WHERE pedido_ID = ?";

if ($stmt = mysqli_prepare($db, $sql)) {
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "i", $param_pedido_ID);

    // Set parameters
    $param_pedido_ID = $pedido_ID;

    // Attempt to execute the prepared statement
    if (mysqli_stmt_execute($stmt)) {
        // tell the user
        echo json_encode(array("message" => "Pedido borrado."));
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

    // Close statement
    mysqli_stmt_close($stmt);
}

// Close connection
mysqli_close($db);
