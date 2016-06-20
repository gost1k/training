<a href="add.php">Добавить новость</a>
<?php
include_once("db.php");

$author = 'Максим Таранов';
$limit = 4;

//$result = mysql_query("SELECT * FROM news ORDER BY id DESC LIMIT 4");
/*$result = mysql_query("SELECT title,text,time,date,author FROM news
                       WHERE author='$author'
                       AND date='2016-06-18'
                       ORDER BY id DESC
                       LIMIT $limit");*/
$result = mysql_query("SELECT title,text,time,date,author FROM news
                       ORDER BY id DESC
                       LIMIT $limit");

mysql_close();
while($row = mysql_fetch_array($result))
{?>
<h1><?php echo  $row['title'];?></h1>
<p><?php echo  $row['text'];?></p>
<p>Время новости: <?php echo  $row['time'];?></p>
<p>Дата публикации: <?php echo  $row['date'];?></p>
<p>Автор: <?php echo  $row['author'];?></p>
<?php
}

?>