<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// database connection will be here
// include database and object files
include_once '../_Config/config.php';
include_once '../_Model/Producto.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$ID = "";

if (!empty($data->ID)) {
    // set product property values
    $ID = $data->ID;
}

// Prepare a select statement
$sql = "SELECT * FROM Productos WHERE ID = ?";

if ($stmt = mysqli_prepare($db, $sql)) {
    mysqli_stmt_bind_param($stmt, "i", $param_ID);

    // Set parameters
    $param_ID = $ID;

    if ($result = mysqli_stmt_execute($stmt)) {
        $producto = new Producto();

        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

            // Retrieve indivIDual field value
            $producto->ID = $row["ID"];
            $producto->nombre = $row["nombre"];
            $producto->precio = $row["precio"];
            $producto->descripcion = $row["descripcion"];
            $producto->in_stock = $row["in_stock"];
            $producto->imagen = $row["imagen"];
            $producto->blanco_negro = $row["blanco_negro"];

            // set response code - 200 OK
            http_response_code(200);

            // show products data in json format
            echo json_encode($producto);
        }
    } else {
        echo 'a';
    }
}
