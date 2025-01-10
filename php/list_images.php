<!-- PHP File: list_images.php -->
<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Path to the folder containing images
$folderPath = "images/2019";

// Ensure the folder exists before scanning
if (is_dir($folderPath)) {
    // Get all files in the directory, excluding '.' and '..'
    $images = array_diff(scandir($folderPath), array('.', '..'));
    // Return the file names as JSON
    header('Content-Type: application/json');
    echo json_encode(array_values($images)); // Use array_values to reset array keys
} else {
    // Return an error if the folder does not exist
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Directory not found']);
}
?>
