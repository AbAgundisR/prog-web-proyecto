<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// database connection will be here
// include database and object files
include_once '../_Config/config.php';
include_once '../_Config/cors_handler.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// Prepare a select statement
$sql = "SELECT * FROM Users";

if ($result = mysqli_query($db, $sql)) {
    $users_arr = array();
    $users_arr["users"] = array();

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            extract($row);

            $user_item = array(
                "ID" => $ID,
                "is_superusuario" => $is_superusuario,
                "email" => $email,
                "nombre_completo" => $nombre_completo,
                "direccion" => $direccion,
                "ciudad" => $ciudad,
                "estado" => $estado,
                "cp" => $cp,
                "telefono" => $telefono,
            );

            array_push($users_arr["users"], $user_item);
        }

        // set response code - 200 OK
        http_response_code(200);

        // show products data in json format
        echo json_encode($users_arr);
    }
} else {
    echo 'a';
}
