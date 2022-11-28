<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// database connection will be here
// include database and object files
include_once '../_config/config.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$user_ID = 0;

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->user_ID)) {
    // set product property values
    $user_ID = $data->user_ID;
}

// Prepare a select statement
$sql = "SELECT * FROM Carrito WHERE user_ID = ?";

if ($stmt = mysqli_prepare($db, $sql)) {
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "i", $param_user_ID);

    // Set parameters
    $param_user_ID = $user_ID;

    // Attempt to execute the prepared statement
    if ($result = mysqli_stmt_execute($stmt)) {
        $result = mysqli_stmt_get_result($stmt);

        $carritos_arr = array();
        $carritos_arr["carritos"] = array();

        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_array($result)) {
                extract($row);

                $carrito_item = array(
                    "user_ID" => $user_ID,
                    "producto_id" => $producto_id,
                    "cantidad" => $cantidad
                );

                array_push($carritos_arr["carritos"], $carrito_item);
            }

            // set response code - 200 OK
            http_response_code(200);

            // show products data in json format
            echo json_encode($carritos_arr);
        }
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

    // Close statement
    mysqli_stmt_close($stmt);
}
