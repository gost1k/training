<?php
//include - не обазательно(сайт продолжит работу)
//require - обязательно(сайт не загрузится, фатальная ошибка)
//*_once (если несколько документов пытаются загрузить файл, не даст повторно подключать)

include('inc/header.php');
require('inc/body.php');
include('inc/footer.php');

?>