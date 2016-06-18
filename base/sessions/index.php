<?php
session_start();

if(isset($_POST['enter']))
{
    $_SESSION['name'] = strip_tags(trim($_POST['name']));
}
if(!isset($_SESSION['name']))
{
?>
<form method="post" action="index.php">
    Enter your name <input type="text" name="name"><br>
    <input type="submit" name="enter" value="LogIn">
</form>
<?php }
else
{
    echo "Hollo, ".$_SESSION['name'];
}
?>