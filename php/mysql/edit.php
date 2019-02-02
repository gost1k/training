<?php

include_once("db.php");

$id = $_GET['id'];

$result = mysql_query("SELECT title,text,time,date,author FROM news
                       WHERE id='$id'
                       ");


$row = mysql_fetch_array($result);

if(isset($_POST['save']))
{
    $title = strip_tags(trim($_POST['title']));
    $text = strip_tags(trim($_POST['text']));
    $author = strip_tags(trim($_POST['author']));

    mysql_query("UPDATE news SET title='$title',text='$text',author='$author' WHERE id='$id'
                ");
}
mysql_close;
?>

<form method="post" action="edit.php?id=<?php echo $id ?>">
    Название новости<br>
    <input type="text" name="title" value="<?php echo $row['title']; ?>"><br>
    Текст новости<br>
    <textarea cols="40" rows="10" name="text"><?php echo $row['text']; ?></textarea><br>
    Автор новости<br>
    <input type="text" name="author" value="<?php echo $row['author']; ?>"><br>
    <input type="submit" name="save" value="Сохранить">
</form>

