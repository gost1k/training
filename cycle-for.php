<?php

//cycle - for
$n = 10;
$fact = 1;

for($i=0;$i<$n;$i++)
    $fact*=($i+1);
echo $fact;


//cycle  - while

echo '<br>';

$n = 10;
$fact = 1;
$i = 0;
while($i<$n)
{
    $fact *= ($i+1);
    $i++;
}
echo $fact;

//cycle - foreach
echo '<br>';

$a = array(1,2,3,4,5,6,7,8,9,10);
$fact = 1;
foreach($a as $value)
{
    $fact *=$value;
}
echo $fact;
?>