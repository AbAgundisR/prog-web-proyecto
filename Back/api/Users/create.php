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

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$user = new User();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->email) && !empty($data->password)) {
    // set product property values
    $user->username = $data->username;
    $user->email = $data->email;
    $user->password = $data->password;
}

// Prepare a select statement
$sql = "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";

if ($stmt = mysqli_prepare($db, $sql)) {
    // Bind variables to the prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "sss", $param_username, $param_email, $param_password);

    // Set parameters
    $param_username = $user->username;
    $param_email = $user->email;
    $param_password = password_hash($user->password, PASSWORD_DEFAULT);

    // Attempt to execute the prepared statement
    if (mysqli_stmt_execute($stmt)) {
        // tell the user
        echo json_encode(array("message" => "User creada."));
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

    // Close statement
    mysqli_stmt_close($stmt);
}

// Close connection
mysqli_close($db);
