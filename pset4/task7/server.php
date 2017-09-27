<?php

    $votes = json_decode(file_get_contents("./votes.json"), true);
    $data = $_POST["vote"];
    $votes[$data]++;
    file_put_contents('./votes.json', json_encode($votes));
    print_r(json_encode($votes));