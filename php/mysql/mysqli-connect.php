<?php

$host = "localhost";
$user = "root";
$password = "";

$connection = mysqli_connect($host, $user, $password);

if(!$connection) {
   die("Connaction field" . mysqli_connect_error());
}
echo "connection Success";