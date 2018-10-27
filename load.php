<?php 
     $conn = new mysqli("localhost", "wegesdal_will", "Taylor2016", "wegesdal_sandy");

     if ($mysqli->connect_errno) {
        printf("Connect failed: %s\n", $mysqli->connect_error);
        exit();
    }

    $query = "SELECT * FROM projects ORDER by title DESC";
    $result = mysqli_query($conn, $query) or die('Query failed: ' . mysqli_error());

    //We find our number of rows
    $result_length = mysqli_num_rows($result); 
    
    //And now iterate through our results
    echo('[');
    for($i = 0; $i < $result_length; $i++)
    {
        $row = mysqli_fetch_array($result);
        $arr = array('title' => $row['title'], 'creator' => $row['creator'], 'avatar' => $row['avatar'], 'html' => $row['html'], 'css' => $row['css'], 'js' => $row['js'], 'readme' => $row['readme'], 'tags' => $row['tags'], 'parent' => $row['parent']);
        echo (json_encode($arr));
        if ($i < $result_length-1){
            echo(',');
        }
     }
     echo(']');
 
$conn->close();

?>