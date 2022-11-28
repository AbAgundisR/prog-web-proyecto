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

// Prepare a select statement
$sql = "SELECT * FROM Pedidos";

if ($result = mysqli_query($db, $sql)) {
    $pedidos_arr = array();
    $pedidos_arr["pedidos"] = array();

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            extract($row);

            $pedido_item = array(
                'user_ID' => $user_ID,
                'subtotal' => $subtotal,
                'iva' => $iva,
                'total' => $total,
                'direccion' => $direccion,
                'ciudad' => $ciudad,
                'estado' => $estado,
                'cp' => $cp,
                'telefono' => $telefono
            );

            array_push($pedidos_arr["pedidos"], $pedido_item);
        }

        // set response code - 200 OK
        http_response_code(200);

        // show products data in json format
        echo json_encode($pedidos_arr);
    }
} else {
    echo 'a';
}
