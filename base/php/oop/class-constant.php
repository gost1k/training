<?php


class user {
    const SOME_CONST = 314;
}

// echo user::SOME_CONST = 222; не переопределяется
echo user::SOME_CONST;