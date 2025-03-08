<?php
// Allow requests from the frontend
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Get the JSON data sent from Vue.js
$data = json_decode(file_get_contents("php://input"), true);

// Check if latitude and longitude are provided
if (isset($data["latitude"]) && isset($data["longitude"])) {
    // Save location data to a JSON file (for now)
    $locations = file_exists("locations.json") ? json_decode(file_get_contents("locations.json"), true) : [];
    $locations[] = $data;
    file_put_contents("locations.json", json_encode($locations, JSON_PRETTY_PRINT));

    // Send success response
    echo json_encode(["message" => "Location saved successfully!"]);
} else {
    echo json_encode(["error" => "Invalid data"]);
}
?>
