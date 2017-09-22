<?php
    $result = 0;
    for ($i = -1000; $i <= 1000; $i++) {
        if (abs($i) % 10 === 2 || abs($i) % 10 === 3 || abs($i) % 10 === 7) {
            $result += $i;
        }

    }
    echo $result;