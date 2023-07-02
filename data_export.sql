<?php
    header("Access-Control-Allow-Origin: *");
    $mysqli = new mysqli("localhost", "root", "", "db_2066031");
    
    // Select weather data for past week
    $sql = "SELECT *
            FROM weather
            WHERE weather_when >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            ORDER BY weather_when DESC";
    $result = $mysqli->query($sql);
    
    // If no records found, return an error message
    if ($result->num_rows == 0) {
        echo "No weather data found for the past week.";
    } else {
        // Output weather data
        while ($row = $result->fetch_assoc()) {
            echo "City: " . $row['city'] . "<br>";
            echo "Description: " . $row['weather_description'] . "<br>";
            echo "Temperature: " . $row['weather_temperature'] . "<br>";
            echo "Wind Speed: " . $row['weather_wind'] . "<br>";
            echo "Wind Degree: " . $row['wind_Deg'] . "<br>";
            echo "Pressure: " . $row['pressure'] . "<br>";
            echo "Humidity: " . $row['Humidity'] . "<br>";
            echo "Timestamp: " . $row['weather_when'] . "<br><br>";
            
        }
    }
?>
