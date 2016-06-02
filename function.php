<?php

include('func_descr.php');

func1();

echo '<br>';

func2(12,6);

$a = 8;
$b = 4;

func2($a,$b);

$c = func3(6,4);
echo '$c = '.$c.'<br>';

echo func3(7,8);
echo '<br>';

echo '<pre>';
print_r(func4());
echo '</pre>';

func5(5);
func5(5,2);
func5(5,2,3);
//func5(); Не правильная функция
echo '<br>';
func6(5);

$var2 = 2;

?>