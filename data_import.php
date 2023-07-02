<?php
    header("Access-Control-Allow-Origin: *");
    $mysqli=new mysqli("localhost","root","","db_2066031");
    
    // Select weather data for past week
    $sqli = "SELECT * FROM weather WHERE weather_when >= DATE_SUB(NOW(), INTERVAL 7 DAY) ORDER BY weather_when ASC";
    $result = $mysqli -> query($sqli);

    // If no records found, display error message
    if ($result->num_rows == 0) {
        echo("<h4>No weather data found for the past week.</h4>");
    }
    else {
        $weatherData = array();
        
        // Loop through each record and add to $weatherData array
        while ($row = $result->fetch_assoc()) {
            $weatherData[] = array(
                'timestamp' => $row['weather_when'],
                'weather_description' => $row['weather_description'],
                'temperature' => $row['weather_temperature'],
                'wind_speed' => $row['weather_wind'],
                'wind_deg' => $row['wind_Deg'],
                'pressure' => $row['pressure'],
                'humidity' => $row['Humidity'],
                'city' => $row['city']
            );
        }

        // Build JSON object containing weather data array
        $response = array(
            'weatherData' => $weatherData
        );
        
        // Send JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
        
    }
?>
