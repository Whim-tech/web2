<?php

require_once '../../db.php';

use MongoDB\BSON\ObjectID;

$query_params = $_GET;
$request_method = $_SERVER['REQUEST_METHOD'];


header("Content-Type: application/json; charset=UTF-8");

$collection = 'games.games';
$games = new MongoDBCollection($manager, 'games');
header("Content-Type: application/json; charset=UTF-8");

$filter = [
    "full_title" => '',
    "short_title" => '',
    "release_date" => '',
    "developer" => '',
    "publisher" => '',
    "genres" => [],
    "platforms" => [],
    "image_preview" => '',
    "description" => [
        "small_preview" => '',
        "big_preview" => '',
        "short_description" => '',
        "long_description" => [],
    ]
];

$result = $games->create($filter);
echo json_encode($result);
// echo $result;
exit();

?>