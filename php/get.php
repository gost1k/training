<?php
$page = $_GET['page'];

switch($page)
{
    case "home":
          $title = "Главная страница сайта";
          $text = "Добро пожаловать на наш сайт, полезная информация...";
        break;
    case "news":
          $title = "Новости";
          $text = "Свежие новости сайта";
        break;
    case "video":
        $title = "Видео";
        $text = "Видео с прошедших соревнований";
        break;
    default:
        $title = "Страница не найдена";
        $text = "Вернитесь назад";
        break;


}

?>
<html>
<head>
    <title>
        <?php echo $title ?>
    </title>
</head>
<body>
<h1><?php echo $title ?></h1>
<?php echo $text ?>
<form method="get" action="get.php"><br>
    <input type="text" name="login"><br>
    <input type="password" name="pswd"><br>
    <input type="submit" name="send" value="Войти">
</form>

<?php

echo $login = $_GET['login'];
echo $pswd = $_GET['$pswd'];

?>
</body>
</html>