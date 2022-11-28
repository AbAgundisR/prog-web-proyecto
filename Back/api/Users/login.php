<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

// database connection will be here
// include database and object files
include_once '../_Config/config.php';
include_once '../_Model/User.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$username = "";
$password = "";

if (!empty($data->username) && !empty($data->password)) {
    // set product property values
    $username = $data->username;
    $password = $data->password;
}

// Prepare a select statement
$sql = "SELECT * FROM Users WHERE username = ?";

if ($stmt = mysqli_prepare($db, $sql)) {
    mysqli_stmt_bind_param($stmt, "s", $param_username);

    // Set parameters
    $param_username = $username;
    //$param_password = password_hash($password, PASSWORD_DEFAULT);

    if ($result = mysqli_stmt_execute($stmt)) {
        $user = new User();

        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

            // Retrieve indivIDual field value
            $user->ID = $row["ID"];
            $user->is_superusuario = $row["is_superusuario"];
            $user->email = $row["email"];
            $user->nombre_completo = $row["nombre_completo"];
            $user->direccion = $row["direccion"];
            $user->ciudad = $row["ciudad"];
            $user->estado = $row["estado"];
            $user->cp = $row["cp"];
            $user->telefono = $row["telefono"];

            $user->password = $row["password"];

            if (password_verify($password, $user->password)) {
                // set response code - 200 OK
                http_response_code(200);

                // show products data in json format
                echo json_encode($user);
            } else {
                echo json_encode(array(
                    'Invalid password.'
                ));
            }
        } else {
            echo json_encode(array("message" => "Usuiro no existe."));
        }
    } else {
        echo 'a';
    }
}
