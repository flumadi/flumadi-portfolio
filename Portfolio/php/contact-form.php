<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database configuration
require_once 'db-config.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $data['name'], $data['email'], $data['phone'], $data['message']);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Thank you for your message!"]);
    } else {
        throw new Exception("Database error");
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>