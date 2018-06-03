<?php

echo 'for#1:<br>';

for($i = 0; $i < 5; $i++)
{
    echo $i.'<br>';
}


echo '<br>';
echo 'for#2:<br>';

for($i = 5; $i >0; $i--)
{
    echo $i.'<br>';
}

echo '<br>';
echo 'while#1:<br>';


$i = 0;
while($i < 5)
{
    echo $i.'<br>';
    $i++;
}


echo '<br>';
echo 'while#2:<br>';

$i = 5;

while($i > 0)
{
    echo $i.'<br>';
    $i--;
}


echo '<br>';
echo 'while#3:<br>';

$i = -2;

while($i > 0)
{
    echo $i.'<br>';
    $i--;
}

echo '<br>';
echo 'while#4:<br>';

$i = -2;
do
{
    echo $i.'<br>';
    $i--;
}
while($i > 0);

echo '<br>';

$m = 1;
while($m <= 5)
{
    echo 'Цикл 1, итерация'.$m.'<br><br>';

    $n = 1;

    while($n <= 3)
    {
        echo '---Цикл 2, итерация'.$n.'<br>';
        $n++;
    }
    echo '<br>';
    $m++;
}
echo '<br>';

$i = 0;

while($i < 10)
{
    if($i == 3) break;
    echo $i.'<br>';
    $i++;
}
echo '<br>';

$i = 0;

while($i < 10)
{
    $i++;
    if($i >= 3 && $i <=7) continue;
    echo $i.'<br>';
}
?>