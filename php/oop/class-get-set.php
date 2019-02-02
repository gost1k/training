<?php


class GetSet {
    private $nubmer;

    function __get($name){
        echo "You get {$name}";
    }

    function __set($name, $value)
    {
        echo "You set {$name} value is {$value}";
    }
}

$obj = new GetSet();
echo $obj->name;
echo $obj->name = 222;