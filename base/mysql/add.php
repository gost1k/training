<form method="post" action="add.php">
    Название новости<br>
    <input type="text" name="title"><br>
    Текст новости<br>
    <textarea cols="40" rows="10" name="text"></textarea><br>
    Автор новости<br>
    <input type="text" name="author"><br>
    <input type="hidden" name="date" value="<?php echo date('Y-m-d');?>">
    <input type="hidden" name="time" value="<?php echo date('H-i-s');?>">
    <input type="submit" name="add" value="Добавить">
</form>

<?php

include_once("db.php");
if(isset($_POST['add'])) {
    $title = strip_tags(trim($_POST['title']));
    $text = strip_tags(trim($_POST['text']));
    $author = strip_tags(trim($_POST['author']));
    $date = $_POST['date'];
    $time = $_POST['time'];

    $result = mysql_query("INSERT INTO news(title,text,author,date,time)
                       VALUES ('$title','$text','$author','$date','$time')
                       ");
    mysql_close;
    echo 'Новость успешно добавлена';
}


?>