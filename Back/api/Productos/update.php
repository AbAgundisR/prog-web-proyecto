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
include_once '../_Model/Producto.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$producto = new Producto();

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->nombre) && !empty($data->precio) && !empty($data->descripcion)
    && !empty($data->in_stock) && !empty($data->imagen) && !empty($data->blanco_negro)
) {
    // set product property values
    $productos->nombre = $data->nombre;
    $productos->precio = $data->$precio;
    $productos->descripcion = $data->descripcion;
    $productos->in_stock = $data->in_stock;
    $productos->imagen = $data->imagen;
    $productos->blanco_negro = $data->blanco_negro;
}

// Prepare a select statement
$sql = "UPDATE Producto SET nombre = ?, precio = ?, descripcion = ?, 
    in_stock = ?, imagen = ?, blanco_negro = ? WHERE ID = ?";

if ($stmt = mysqli_prepare($db, $sql)) {
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param(
        $stmt,
        "sdsibii",
        $param_nombre,
        $param_precio,
        $param_descripcion,
        $param_in_stock,
        $param_imagen,
        $param_blanco_negro,
        $param_ID
    );

    // Set parameters
    $param_nombre = $productos->nombre;
    $param_precio = $productos->precio;
    $param_descripcion = $productos->descripcion;
    $param_in_stock = $productos->in_stock;
    $param_imagen = $productos->imagen;
    $param_blanco_negro = $productos->blanco_negro;
    $param_ID = $producto->ID;

    // Attempt to execute the prepared statement
    if (mysqli_stmt_execute($stmt)) {
        // tell the user
        echo json_encode(array("message" => "Producto actualizada."));
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

    // Close statement
    mysqli_stmt_close($stmt);
}

// Close connection
mysqli_close($db);
