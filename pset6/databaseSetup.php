<?php

    include './mysqlConfig.php';

    $link = mysqli_connect($mysql_host, $mysql_username, $mysql_password);
    if (!$link) {
        die('Could not connect: ' . mysqli_error($link));
    }

    $db_selected = mysqli_select_db($link, $db_name);

    if (!$db_selected) {
        $sql = 'CREATE DATABASE ' . $db_name . ' CHARACTER SET utf8 COLLATE utf8_general_ci';
        if (!mysqli_query($link, $sql)) {
            echo 'Error creating database: ' . mysqli_error($link) . "\n";
        }
    }
    // reselect db if database was just created and unselected earlier
    if (!$db_selected) {
        mysqli_select_db($link, $db_name);
    }

    createTableIfNotExist($link, 'users', './users.sql');
    createTableIfNotExist($link, 'messages', './messages.sql');

    echo 'success';

    function createTableIfNotExist($link, $tableName, $sqlFilePath) {
        if (!mysqli_query($link, "DESCRIBE `". $tableName ."`")) {
            importSql($link, $sqlFilePath);
        } else {
            echo "error";
        }
    }

    function importSql($link, $sqlFilePath) {
        $templine = '';
        $lines = file($sqlFilePath);
        foreach ($lines as $line) {
            if (substr($line, 0, 2) == '--' || $line == '')
                continue;
            $templine .= $line;
            if (substr(trim($line), -1, 1) == ';') {
                mysqli_query($link, $templine) or print('Error performing query \'<strong>' . $templine . '\': ' . mysqli_error($link) . '<br /><br />');
                $templine = '';
            }
        }
    }

    mysqli_close($link);