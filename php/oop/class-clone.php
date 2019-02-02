<?php

class User {
    private $name;
    private $city;
    private $id;

    function __construct($name, $city)
    {
        $this->name = $name;
        $this->city = $city;
    }

    function setId($id){
        $this->id = $id;
    }

    function __clone()
    {
        $this->id = 0;
    }
}

$user1 = new User("Alexey", "Kiev");
$user1->setId(5782);

$user2 = clone $user1;

var_dump($user1);
var_dump($user2);