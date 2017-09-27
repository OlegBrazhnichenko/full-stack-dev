<?php

    if($_SERVER['REQUEST_METHOD'] === 'GET'){

        echo file_get_contents("./store.json");
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $balloons = json_decode(file_get_contents("./store.json"));
        $balloon = null;
        foreach($balloons as $key => $item) {

            if ($item->id == $_POST['id']) {
                $balloon = $key;
                break;
            }
        }
        if ($balloon === null) {
            $newBalloon = new stdClass();
            $newBalloon->id   = $_POST['id'];
            $newBalloon->x    = intval($_POST['x']);
            $newBalloon->y    = intval($_POST['y']);
            $newBalloon->text = $_POST['text'];
            $balloons[] = $newBalloon;
            file_put_contents('./store.json', json_encode($balloons));
        } else {
            $balloons[$balloon]->id   = $_POST['id'];
            $balloons[$balloon]->x    = intval($_POST['x']);
            $balloons[$balloon]->y    = intval($_POST['y']);
            $balloons[$balloon]->text = $_POST['text'];
            file_put_contents('./store.json', json_encode($balloons));
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        parse_str(file_get_contents("php://input"),$data);
        $balloons = json_decode(file_get_contents("./store.json"));
        foreach($balloons as $key => $item) {
            if ($item->id == $data['id']) {
                unset($balloons[$key]);
                break;
            }
        }
        file_put_contents('./store.json', json_encode($balloons));
    }



