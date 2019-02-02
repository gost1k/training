
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
<?php

class DestrctableClass {
    function __construct()
    {
        print "Контруктор";
        $this->name = "DestrctableClass";
    }

    function __destruct()
    {
        print "Уночтожение".$this->name;
    }
}

$obj = new DestrctableClass();
