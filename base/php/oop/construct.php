

<?php
//Simple class
/*
    class Users{
        public $variable;
        function __construct()
        {
            $this->variable = "Hello World";
        }
        function show(){
            return $this->variable;
        }
    }

$user = new Users();
print $user->show();


*/?>


<?php
//Класс человек
class Man{
    public $name;
    public $surname;
    public $age;

    function __construct()
    {
        $this->name = "Максим";
        $this->surname = "Таранов";
        $this->age = 26;
    }

    function show(){
        return $this->name;
        return $this->surname;
        return $this->age;
    }
}

$iam = new Man();
?>
<p>
    Приветствую вас <?php echo $iam->name; echo " "; echo $iam->surname; ?> <br>
    Ваш возраст <?php print $iam->age; ?>
</p>
<!-- Конец класса -->


<?php
    class Users{
        public $variable;
        function __construct($text)
        {
            $this->variable = $text;
        }
        function show(){
            return $this->variable;
        }
    }

$user = new Users("Просто тест");
echo $user->show();



//Calculator
$n1 = 3;
$n2 = 6;

    class Calculator{
        public $a;
        public $b;
        public $c;
    function __construct($a,$b)
    {
        $this->c = $a+$b;
    }
        function show(){
            return $this->c;
        }
    }

$calc = new Calculator(3,6);
echo "<br>$n1 + $n2 = ".$calc->show();

?>