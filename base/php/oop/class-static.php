<?php

class User {
    public static $name;

    public static function hello() {
        echo "hello ".self::$name." ";
    }
}

user::$name="Alexey";

echo user::$name;
user::hello();