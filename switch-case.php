<?php
//Switch
$year = 2008;

switch($year)
{
    case 2008;
        echo 'Год 2008<br>';
        echo 'Список статей<br>';
        break;
    case 2009;
        echo 'Год 2009<br>';
        echo 'Список статей<br>';
        break;
    case 2010;
        echo 'Год 2010<br>';
        echo 'Список статей<br>';
        break;
    default:
        echo 'Неправильно указан год<br>';
}

echo 'Эта строка находится за конструкцией switch<br>';
?>