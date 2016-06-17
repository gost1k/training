<?php
echo 'Текущий часовой пояс: ';
echo date_default_timezone_get();
echo '<br><br>';

date_default_timezone_set('Europe/Moscow');

echo 'Текущий часовой пояс: ';
echo date_default_timezone_get();
echo '<br><br>';

echo 'Текущая дата: ';
echo date('d.m.Y H:i:s');
echo '<br><br>';


?>