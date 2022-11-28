<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

// database connection will be here
// include database and object files
include_once '../_Config/config.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// Prepare a select statement
$sql = "SELECT * FROM Productos";

if ($result = mysqli_query($db, $sql)) {
    $productos_arr = array();
    $productos_arr["productos"] = array();

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            extract($row);

            $producto_item = array(
                "ID" => $ID,
                "nombre" => $nombre,
                "precio" => $precio,
                "descripcion" => $descripcion,
                "in_stock" => $in_stock,
                "imagen" => $imagen,
                "blanco_negro" => $blanco_negro
            );

            array_push($productos_arr["productos"], $producto_item);
        }

        // set response code - 200 OK
        http_response_code(200);

        // show products data in json format
        echo json_encode($productos_arr);
    }
} else {
    echo 'a';
}
