<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portfolio_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];

// Check if email exists
$check = $conn->prepare("SELECT id FROM newsletter WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "This email is already subscribed!"]);
} else {
    $stmt = $conn->prepare("INSERT INTO newsletter (email) VALUES (?)");
    $stmt->bind_param("s", $email);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Thank you for subscribing!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Subscription failed: " . $stmt->error]);
    }
    $stmt->close();
}

$check->close();
$conn->close();
?>