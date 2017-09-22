<?php
    $arr = array();
    for ($i = 0; $i < 100; $i++) {
        array_push($arr,rand(1,10));
    }
    $arr = array_unique($arr);
    sort($arr);
    print_r(array_reverse($arr));