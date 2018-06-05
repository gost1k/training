<?php

$host = "localhost";
$user = "gost1k";
$password = "a903560";
$dbname = "NewDB";

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

    echo "Connect to DB success";
}
catch (PDOException $e) {
    echo "Connection faild: " . $e->getMessage();
}