<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database configuration
require_once 'db-config.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    
    // Check existing
    $check = $conn->prepare("SELECT id FROM newsletter WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    
    if ($check->get_result()->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Already subscribed!"]);
    } else {
        $stmt = $conn->prepare("INSERT INTO newsletter (email) VALUES (?)");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        echo json_encode(["success" => true, "message" => "Subscription successful!"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>