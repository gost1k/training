<?php
//Массивы
$lang[] = "html";
$lang[] = "css";
$lang[] = "php";
$lang[12] = 'javascript';



echo "$lang[0]<br>";
echo "$lang[1]<br>";
echo "$lang[2]<br>";


echo '<br>Array 1<br>';
echo "<pre>";
print_r($lang);
echo "<pre>";


$lang2 = array('HTML', 'CSS', 'PHP');

echo '<br>Array 2<br>';
echo "<pre>";
print_r($lang2);
echo "<pre>";

$lang3 = array(
    3 => 'html',
    9 => 'css',
    12 => 'php');

echo '<br>Array 3<br>';
echo "<pre>";
print_r($lang3);
echo "<pre>";

echo '<br><br>';
echo "Каскадные таблицы стилей: $lang3[9]<br>";
?>