<?php
//Ассоциативные массивы - регистрозависимые
$code['Россия'] = 7;
$code['США'] = 1;
$code['Германия'] = 49;

echo '<pre>';
print_r($code);
echo '</pre>';

echo '<br>';

$code2 = array('Россия' => 7, 'США' => 1, "Германия" => 49);
echo '<pre>';
print_r($code2);
echo '</pre>';

echo '<br>';

echo "Код России: $code2[Россия]<br>";
echo 'Код России:'.$code2['Россия'].'<br>';

?>