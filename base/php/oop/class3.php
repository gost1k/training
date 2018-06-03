<html>
<head>
    <meta charset="UTF-8">
</head>
<body>


<?php

class User {
    public $name = "Имя";
    public $password = "Пароль";
    public $email = "Email";
    public $city = "Город";

    public function Hello() {
        echo "Hello {$this->name}";
    }

function getInfo() { // По умолчанию Public
    return "{$this->name}"."{$this->surname}";
    }
}


$admin = new User();
$admin->name="Alexey";
$admin->surname="Ivanov";
echo "Пользователь: {$admin->getInfo()}";

/*$admin = new User();
$admin->name = "Alexey";
$admin->Hello();
$admin = new User();
echo $admin->name;
$admin->name="Alexey";
$user1 = new User();
$user1->name="Andrey";
echo $admin->name;
echo $user1->name;
$user1->surname = "ivanov";
echo $user1->surname;*/

?>


</body>
</html>
