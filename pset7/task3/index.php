<?php

    mylog("test log", "error");

    function mylog($text, $type='i', $file='logs') {
        switch (strtolower($type)) {
            case 'e':
            case 'error':
                $type='ERROR';
                break;
            case 'i':
            case 'info':
                $type='INFO';
                break;
            case 'd':
            case 'debug':
                $type='DEBUG';
                break;
            default:
                $type='INFO';
        }
        error_log(date("[Y-m-d H:i:s]")."\t[".$type."]\t[".basename(__FILE__)."]\t".$text."\n", 3, $file);
    }