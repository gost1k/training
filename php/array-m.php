<?php

$book1 = array('author' => 'Л.Толстой', 'title' => 'Война и Мир', 'year' => 2005);
$book2 = array('author' => 'Н.Гоголь', 'title' => 'Мертвые души', 'year' => 2005);
$book3 = array('author' => 'Г.Уэллс', 'title' => 'Машина времени', 'year' => 2009);
$book4 = array('author' => 'Э.Берроуз', 'title' => 'Тарзан', 'year' => 1994);

$shelf1[1] = $book1;
$shelf1[2] = $book2;

$shelf2[1] = $book3;
$shelf2[2] = $book4;

$bookshelf[1] = $shelf1;
$bookshelf[2] = $shelf2;

$bookshelf[3][1]['author'] = 'Ж.Верн';
$bookshelf[3][1]['title'] = 'Путешествие к центру земли';
$bookshelf[3][1]['year'] = '2011';


echo '<pre>';
print_r($bookshelf);
echo '</pre>';

echo '<br><br>';
echo "Первая полка, втора книга:".$bookshelf[1][2]['author']." - ".$bookshelf[1][2]['title'].",".$bookshelf[1][2]['year']."<br>";


?>