<?php
//if-elseif-else operation

$a = 10;
$b = 15;

if($a < $b) echo '$a < $b'.'<br>';

if($a == $b) echo '$a == $b'.'<br>';
else echo '$a != $b'.'<br>';

echo '<br>';

$c = 1;
$d = 2;
$e = 3;

if ($c == 1) echo '$c == 1'.'<br>';
    elseif ($d == 2) echo '$d == 2'.'<br>';
    elseif ($e == 3) echo '$e == 3'.'<br>';
else echo 'Условия не выполнились<br>';

$a = 1;
$b = '1';

echo '<br>';
if ($a == $b) echo '$a == $b'.'<br>';
else echo '$a != $b'.'<br>';


echo '<br>';
if ($a === $b) echo '$a === $b'.'<br>';
else echo '$a !== $b'.'<br>';


if($c == 1 && $d == 2) echo 'Двойное условие выполнилось<br>';
else echo 'Двойное условие не выполнилось<br>';

if($c == 2 || $d == 2) echo 'Двойное условие выполнилось<br>';
else echo 'Двойное условие не выполнилось<br>';

if(!($c == 2 || $d == 3)) echo 'Двойное условие выполнилось<br>';
else echo 'Двойное условие не выполнилось<br>';

if($c != 2 || $d == 3) echo 'Двойное условие выполнилось<br>';
else echo 'Двойное условие не выполнилось<br>';


if($c == 1)
    {
        echo 'Строка 1 <br>';
        echo 'Строка 2 <br>';
    }
else
    {
        echo 'Строка 3 <br>';
        echo 'Строка 4 <br>';
    }

if($c == 1)
{
    if($d == 2) echo '$d == 2<br>';
    echo 'Строка 1 <br>';
    echo 'Строка 2 <br>';
}
else
{
         if($e == 3)
         {
             echo '$d == 3<br>';
         }
    echo 'Строка 3 <br>';
    echo 'Строка 4 <br>';
}

if(false) echo 'Yes<br>';
else echo 'No<br>';




echo '<br>Эта строка находится за блоком условий<br>';




?>