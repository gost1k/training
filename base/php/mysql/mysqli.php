<?php

$host = "localhost";
$user = "root";
$password = "";

$connection = new mysqli($host, $user, $password);

if($connection->connect_error) {
    die("Connection faild".$connection->connect_error);
}
echo "connection Success";