<?php


class Shop {
    // public  Как внутри класcа так и вне
    // Private Спецификатор доступа только внутри методов этого класса
    // Protecrted внутри класса или в дочернем классе
    Private $name;

    Public function naming() {
        $this -> name = "Adidas";
        echo $this->name;
    }
}


$product  = new Shop;
$product->naming();
/*$product->name = "Nike"; //Не будет работать, приватное свойство.*/

?>