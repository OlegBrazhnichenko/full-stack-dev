<?php
    $data = json_decode($_POST['number']);
    $nums = str_split( $data["number"]);
    $result = 0;
    for ($i = 0; $i < count($nums); $i++) {
        $result += intval($nums[$i]);
    }
    echo $result;
