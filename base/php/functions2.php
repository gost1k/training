<?php
$a = 3;

if(isset($a)) echo '$a существиует';
else echo '$a не существует';

echo '<br><br>';

if(isset($b)) echo '$b существует';
else echo '$b не существует';

unset($a);

echo '<br><br>';

if(isset($a)) echo '$a существиует';
else echo '$a не существует';

echo '<br><br>';

if(is_numeric(17)) echo '17 - число';
else echo '17 - не число';

echo '<br><br>';

if(is_numeric(17.25)) echo '17.25 - число';
else echo '17.25 - не число';

echo '<br><br>';

if(is_numeric('17')) echo '"17" - число';
else echo '"17" - не число';

echo '<br><br>';

if(is_int(17.1)) echo '17.1 - целое';
else echo '17.1 - не целое';

echo '<br><br>';

if(is_float(17)) echo '17.1 - дробное';
else echo '17 - не дробное';
?>