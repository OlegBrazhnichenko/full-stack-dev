<?php

    session_start();

    switch ($_SERVER['REQUEST_METHOD']) {
        case "POST":
            handlePostRequest();
            break;
        case "GET":
            handleGetRequest();
            break;
    }

    function handlePostRequest() {
        switch ($_POST["action"]) {
            case "send message":
                postMessage();
                break;
            case "login":
                login();
                break;
            case "logout":
                logout();
                break;
            case "register":
                register();
                break;
        }
    }

    function handleGetRequest() {
        switch ($_GET["action"]) {
            case "get messages":
                getMessages();
                break;
            case "checkAuth":
                checkAuth();
        }
    }

    function checkAuth() {

        if (isset($_SESSION['username'])) {

            echo "true";
        } else {

            echo "false";
        };
    }

    function login() {
        $username = $_POST['username'];
        $password = $_POST['password'];
        if (userExist($username, $password)) {
            $_SESSION['username'] = $username;

            echo 'success';
        } else {

            echo 'failed';
        };
    }

    function logout() {
        session_destroy();
    }

    function register() {
        $username = $_POST['username'];
        $password = $_POST['password'];
        if (!userExist($username, $password)) {

            $users = json_decode(file_get_contents("./users.json"));
            $newUser = new stdClass();
            $newUser->username = $username;
            $newUser->password = $password;
            $users[] = $newUser;
            file_put_contents('./users.json', json_encode($users));
            if (userExist($username, $password)) {

                echo 'register success';
            }
        } else {

            echo 'user exist';
        };
    }

    function userExist($username, $password) {
        $users = json_decode(file_get_contents("./users.json"));
        return (sizeof(array_filter($users, function($value) use ($username, $password) {
            return $value->username === $username && $value->password === $password;
        })));

    }

    function postMessage() {
        if (isset($_SESSION['username'])) {
            echo "message";
            $message = new StdClass();
            $message->id        = uniqid();
            $message->username  = $_SESSION['username'];
            $message->message   = $_POST['message'];
            $message->timestamp = time();
            $messages = json_decode(file_get_contents('./store.json'));
            $messages[] = $message;
            file_put_contents('./store.json', json_encode($messages));
        } else {

            echo "auth failed";
        }
    }

    function getMessages() {

        echo filterMessages(file_get_contents("./store.json"));
    }

    function filterMessages($messages) {
        $messages = json_decode($messages);
        return json_encode(array_filter($messages, function($value){
            return $value->timestamp >= time()-60*60;
        }));

    }

