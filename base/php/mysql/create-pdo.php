<?php

$host = "localhost";
$user = "gost1k";
$password = "a903560";

try {
    $db = new PDO("mysql:host=$host;dbname=testdb", $user, $password);
    $sql = "CREATE DATABASE testdb2";
    $db->exec($sql);
    echo "DATABASE Create successfully";

}
catch (PDOException $e) {
    echo $sql . $e->getMessage();
}