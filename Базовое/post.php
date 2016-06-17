

<form method="post" action="post.php"><br>
    <input type="text" name="login"><br>
    <input type="password" name="pswd"><br>
    <input type="submit" name="send" value="Войти">
</form>

<?php
function clear_data($name)
{
   return htmlspecialchars(strip_tags(trim($name)));
}

echo $login = clear_data($_POST['login']);
echo $pswd = clear_data($_POST['pswd']);


?>