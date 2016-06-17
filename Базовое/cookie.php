<?php
if(isset($_POST['send']))
{
    $bg = $_POST['bg'];
    setcookie("background", $bg, time()+3600);

}

?>
<html>
<head>
    <title>

    </title>
</head>
<body>

<?php if(isset($_COOKIE['background'])){?>
<style>
    body{background: <?php echo $_COOKIE['background']?>;}
</style>
<?php }?>

<form method="post">
    Выберите цвет фона
    <select name="bg">
        <option value="yellow">Желтый</option>
        <option value="red">Крассный</option>
        <option value="black">Черный</option>
    </select>
    <input type="submit" name="send" value="Отправить">
</form>





</body>
</html>