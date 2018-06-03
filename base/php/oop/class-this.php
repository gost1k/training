<?php

class User
{
    public $name;
    public $password;
    public $email;
    public $city;

    public function getName() {
        echo $this->name;
        $this->test();
    }
    public function test() {
        echo "Test";
    }
}

$user1 = new User();
$user1->name = "Alexey";
$user1->getName();

$user2 = new User();
$user2->name = "Ivan";
$user2->getName();


?>