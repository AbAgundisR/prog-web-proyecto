<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

// ini_set("log_errors", 1);
// ini_set("error_log", "./php-error.log");
// error_log("Hello, errors!");

try {
    // database connection will be here
    // include database and object files
    include_once '../_Config/config.php';

    file_put_contents("./php-error.log", "1", FILE_APPEND);

    // instantiate database and product object
    $database = new Database();
    $db = $database->getConnection();

    // Prepare a select statement
    $sql = "SELECT * FROM Productos";

    file_put_contents("./log.log", "2", FILE_APPEND);

    if ($result = mysqli_query($db, $sql)) {

        file_put_contents("./log.log", "3", FILE_APPEND);

        $productos_arr = array();
        $productos_arr["productos"] = array();

        if (mysqli_num_rows($result) > 0) {

            file_put_contents("./log.log", "4", FILE_APPEND);

            while ($row = mysqli_fetch_array($result)) {
                file_put_contents("./log.log", "5", FILE_APPEND);

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
} catch (Exception $th) {
    echo $th;
    //throw $th;
}
