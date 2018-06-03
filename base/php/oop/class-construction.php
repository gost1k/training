<?php

class User {
    public $name;
    public $password;
    public $email;
    public $city;

    function __construct($name, $password, $email, $city)
    {
        $this->name = $name;
        $this->password = $password;
        $this->email = $email;
        $this->city = $city;
    }

    function getInfo() {
        return "{$this->name}"."{$this->password}"."{$this->email}"."{$this->city}";
    }

}

$user1 = new User("Alex", "123456", "Alexey@gmail.com", "Kiev");

/*var_dump($user1);*/

echo $user1->getInfo();

?>