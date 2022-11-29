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
include_once '../_Model/User.php';
include_once '../_Config/cors_handler.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$user = new User();

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->ID) && !empty($data->is_superusuario) && !empty($data->email)
    && !empty($data->nombre_completo) && !empty($data->direccion) && !empty($data->ciudad)
    && !empty($data->estado) && !empty($data->cp) && !empty($data->telefono)
) {
    // set product property values
    $user->ID = $data->ID;
    $user->is_superusuario = $data->is_superusuario;
    $user->email = $data->email;
    $user->nombre_completo = $data->nombre_completo;
    $user->direccion = $data->direccion;
    $user->ciudad = $data->ciudad;
    $user->estado = $data->estado;
    $user->cp = $data->cp;
    $user->telefono = $data->telefono;
}

// Prepare a select statement
$sql = "UPDATE Users SET is_superusuario = ?, email = ?, 
    nombre_completo = ?, direccion = ?, ciudad = ?, 
    estado = ?, cp = ?, telefono = ? WHERE ID = ?";

if ($stmt = mysqli_prepare($db, $sql)) {
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param(
        $stmt,
        "isssssssi",
        $param_is_superusuario,
        $param_email,
        $param_nombre_completo,
        $param_direccion,
        $param_ciudad,
        $param_estado,
        $param_cp,
        $param_telefono,
        $param_ID
    );

    // Set parameters
    $param_ID = $user->ID;
    $param_is_superusuario = $user->is_superusuario;
    $param_email = $user->email;
    $param_nombre_completo = $user->nombre_completo;
    $param_direccion = $user->direccion;
    $param_ciudad = $user->ciudad;
    $param_estado = $user->estado;
    $param_cp = $user->cp;
    $param_telefono = $user->telefono;

    // Attempt to execute the prepared statement
    if (mysqli_stmt_execute($stmt)) {
        // tell the user
        echo json_encode(array("message" => "User actualizado."));
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

    // Close statement
    mysqli_stmt_close($stmt);
}

// Close connection
mysqli_close($db);
