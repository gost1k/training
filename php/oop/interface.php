<?php

interface FirstInterface {
    public function getName();
}

interface SecondInterface {
    public function getStatus();
}

interface ThirdInterface extends FirstInterface, SecondInterface { // 3 интерфейс расширение первого и второго
    public function getTime();
}

class test implements ThirdInterface {
    public $name = "Alexey";
    public $status = "Admin";

    public function getName() {
        echo $this->name;
    }

    public function getStatus()
    {
     echo $this->status;
    }

    public function getTime()
    {
     echo time();
    }
}

$user1 = new Test;
$user1->getStatus();
$user1->getName();
$user1->getTime();