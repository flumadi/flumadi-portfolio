<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'db-config.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Invalid request method");
    }

    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['name']) || empty($data['email']) || empty($data['subject']) || empty($data['message'])) {
        throw new Exception("All fields are required");
    }

    $stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $data['name'], $data['email'], $data['subject'], $data['message']);
    
    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Thank you! Your message has been sent."
        ]);
    } else {
        throw new Exception("Database error: " . $stmt->error);
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}
?>