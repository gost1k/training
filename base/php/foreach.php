<?php

$code = array('Москва' => 495, 'Санкт-Петербург' => 812, 'Челябинск' => 351);

foreach($code as $key => $val)
{
    echo "Город: $key - код: $val<br>";
}

echo '<br>';

$numbers = array('one', 'two', 'three', 'four', 'five');

foreach($numbers as $num)
{
    echo $num.'<br>';
}

echo '<br>';

$plants = array(
    'Фрукты' => array('Яблоко', 'Банан', 'Груша'),
    'Овощи' => array('Капуста', 'Картофель'),
    'Ягоды' => array('Клубника', 'Ежевика', 'Галубика', 'Смородина')
);

foreach($plants as $key => $kind)
{
    echo "$key:<br>";

    echo '<ul>';
    foreach($kind as $value)
    {
        echo "<li>".$value;
    }
    echo '</ul>';
}
?>