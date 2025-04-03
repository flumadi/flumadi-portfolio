<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = ""; // Empty password is default for XAMPP
$dbname = "portfolio_db";

// Create connection with improved error handling
try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }
    
    // Set charset to utf8mb4 for proper Unicode support
    $conn->set_charset("utf8mb4");
    
} catch (Exception $e) {
    // Log the error securely in production
    error_log($e->getMessage());
    
    // Display user-friendly message
    die("We're experiencing technical difficulties. Please try again later.");
}
?>