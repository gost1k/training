<?php

class Test {
    protected $info; //Защищеный метод не меняется снаружи
}

class Test2 extends Test {
    public function test() {
        $this->info = "info";
    }
}

$test2 = new Test2();
$test2->test();
$test2->info = "Information";
