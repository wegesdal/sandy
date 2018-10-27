<?php 
     $conn = new mysqli("localhost", "wegesdal_will", "Taylor2016", "wegesdal_sandy");

     $title = $_POST['title']; 
     $creator = $_POST['creator'];
     $avatar = $_POST['avatar'];
     $html = $_POST['html'];
     $css = $_POST['css'];
     $js = $_POST['js'];
     $password = $_POST['password'];
     $tags = $_POST['tags'];
     $parent = $_POST['parent'];
     $hash = $_POST['hash'];

     if ($mysqli->connect_errno) {
    	printf("Connect failed: %s\n", $mysqli->connect_error);
    	exit();
    }

		//This is your key. You have to fill this in! Go and generate a strong one.
        $secretKey='molly';
        
        //We md5 hash our results.
        $expected_hash = md5($title . $creator . $password . $secretKey);
        
        //If what we expect is what we have:
        if($expected_hash == $hash) { 

    $sql = "INSERT INTO projects
    SET title = '$title'
    , creator = '$creator'
    , ts = CURRENT_TIMESTAMP
    , avatar = '$avatar'
    , html = '$html'
    , css = '$css',
    js = '$js',
    password = '$password',
    tags = '$tags',
    parent = '$parent'
    ON DUPLICATE KEY UPDATE
    ts = if('$password'=password,CURRENT_TIMESTAMP,ts), html = if('$password'=password,'$html',html), css = if('$password'=password,'$css',css), js = if('$password'=password,'$js',js), tags = if('$password'=password,'$tags',tags), parent = if('$password'=password,'$parent',parent);";
    }
   	if ($conn->query($sql) === TRUE) {
        echo "🖖";
	} else {
    	echo "Error: " . $sql . "<br>" . $conn->error;
	}
$conn->close();
?>