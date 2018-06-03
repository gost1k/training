<?php

abstract class User{ //Создает обстрактный класс заставляющий дочерние классы иметь те же наборы функций
    public $name;
    public $status;

    abstract function getStatus();
}

class Admin extends User{
    function getStatus(){
        echo "Admin";
    }
}

$user = new Admin;
echo $user->getStatus();
