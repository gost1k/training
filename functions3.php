<?php

$a = file_get_contents('inc/text.txt');
echo '<pre>'.$a.'</pre>';

$b = file_get_contents('http://www.yandex.ru/');
echo $b;

?>