<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'db-config.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Invalid request method");
    }

    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['email'])) {
        throw new Exception("Email is required");
    }

    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format");
    }

    $check = $conn->prepare("SELECT id FROM newsletter WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    
    if ($check->get_result()->num_rows > 0) {
        echo json_encode([
            "success" => false,
            "message" => "This email is already subscribed!"
        ]);
    } else {
        $stmt = $conn->prepare("INSERT INTO newsletter (email) VALUES (?)");
        $stmt->bind_param("s", $email);
        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Thanks for subscribing!"
            ]);
        } else {
            throw new Exception("Database error: " . $stmt->error);
        }
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}
?>