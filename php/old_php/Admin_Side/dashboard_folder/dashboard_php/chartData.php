<?php
// This is like opening your candy jar!
$colors = ['Red', 'Blue', 'Green'];
$candies = [5, 3, 2];

// We make a box to hold our data
$data = [
    'labels' => $colors, // Candy colors
    'data' => $candies   // Number of candies for each color
];

// We tell the world about our candies
echo json_encode($data);
?>
