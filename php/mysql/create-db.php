<?php

$host = "localhost";
$user = "gost1k";
$password = "a903560";

$db = new mysqli($host, $user, $password);

if ($db->connect_error){
    die("Connection failed:". $db->connect_error);
}

$sql = "CREATE DATABASE testdb";

if($db->query($sql)===TRUE) {
    echo "Database create successful";
}
else {
    echo "Error".$db->connect_error;
}


///v2
$db = mysqli_connect($host, $user, $password);

if ($db->connect_error){
    die("Connection failed:". mysqli_connect_error());
}

$sql = "CREATE DATABASE testdb";

if(mysqli_query($db, $sql)) {
    echo "Database create successful";
}
else {
    echo "Error" . mysqli_error($db);
}

mysqli_close($db);