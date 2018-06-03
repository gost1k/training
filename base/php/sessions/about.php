<?php
session_start();

echo "Hi, ".$_SESSION['name'];

//session_destroy();  Уничтожить сессию
//unset($_SESSION['name']); уничтожить элемент в сессии

?>