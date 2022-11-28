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
include_once '../_Model/Pedido.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$pedido = new Pedido();

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->user_ID) && !empty($data->subtotal) && !empty($data->iva)
    && !empty($data->total) && !empty($data->direccion) && !empty($data->ciudad)
    && !empty($data->estado) && !empty($data->cp) && !empty($data->telefono)
) {
    // set product property values
    $pedido->user_ID = $data->user_ID;
    $pedido->subtotal = $data->subtotal;
    $pedido->iva = $data->iva;
    $pedido->total = $data->total;
    $pedido->direccion = $data->direccion;
    $pedido->ciudad = $data->ciudad;
    $pedido->estado = $data->estado;
    $pedido->cp = $data->cp;
    $pedido->telefono = $data->telefono;
}

// Prepare a select statement
$sql = "INSERT INTO Pedidos (user_ID, subtotal, iva, 
    total, direccion, ciudad,
    estado, cp, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

if ($stmt = mysqli_prepare($db, $sql)) {
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param(
        $stmt,
        "idddsssss",
        $param_user_ID,
        $param_subtotal,
        $param_iva,
        $param_total,
        $param_direccion,
        $param_ciudad,
        $param_estado,
        $param_cp,
        $param_telefono
    );

    // Set parameters
    $param_user_ID = $pedido->user_ID;
    $param_subtotal = $pedido->subtotal;
    $param_iva = $pedido->iva;
    $param_total = $pedido->total;
    $param_direccion = $pedido->direcc;
    $param_ciudad = $pedido->ciudad;
    $param_estado = $pedido->estado;
    $param_cp = $pedido->cp;
    $param_telefono = $pedido->telefono;

    // Attempt to execute the prepared statement
    if (mysqli_stmt_execute($stmt)) {
        // tell the user
        echo json_encode(array("message" => "Pedido creada."));
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

    // Close statement
    mysqli_stmt_close($stmt);
}

// Close connection
mysqli_close($db);
