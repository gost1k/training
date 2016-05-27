<?php

$a = 2;
$b = 5;

$k1 = 'Переменная $a = '.$a.'<br>';
$k2 = 'Переменная $b = '.$b.'<br>';
echo $k1, $k2;

$c = $a + $b;
$d = $a - $b;
$e = $a * $b;
$f = $a / $b;

echo 'Переменная $c = '.$c.'<br>';
echo 'Переменная $d = '.$d.'<br>';
echo 'Переменная $e = '.$e.'<br>';
echo 'Переменная $f = '.$f.'<br>';

$g = $b % $a;
echo 'Переменная $g = '.$g.'<br>';

$n = 10;

echo '<br>';

echo ++$n.'<br>';
echo $n++.'<br>';
echo $n;



echo '<br>Инкримент: <br><br>';
?>