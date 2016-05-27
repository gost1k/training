<?php
//Подключаемся
$link = mysql_connect('localhost', 'root', '')
    or die('Не удалось подключится к базе данных: ' .mysql_error());
mysql_select_db('test') or die ('<br>Не удалось включить базу данных');
//Успешно подключились
mysql_query("SET NAMES 'utf8';");
mysql_query("SET CHARACTER SET 'utf8';");
mysql_query("SET SESSION collation_connection = 'utf8_general_ci';");
?>
<html>
<head>
    <?php
    $sql=mysql_query("SELECT keyword, description, title, author FROM main");
    $result=mysql_fetch_array($sql);
    ?>
    <title><?php echo $result['title']; ?></title>
    <meta name="description" content="<?php echo $result['description'] ?>">
    <meta name="keywords" content="<?php echo $result['keyword'];?>">
    <meta name="author" content="<?php echo $result['author'];?>">
</head>
<body>

<?php
echo 'Hollo World!';
?>
<!-- success -->
</body>
</html>