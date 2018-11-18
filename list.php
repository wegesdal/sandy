<?php
$directory = 'assets';
$scanned_directory = scandir($directory);
echo('[');
for($i = 2; $i < sizeof($scanned_directory); $i++)
    {
    echo('"');
    echo($scanned_directory[$i]);
    echo('"');
    if ($i < sizeof($scanned_directory))
    {
    	echo(',');
    }
}
echo(']');
?>