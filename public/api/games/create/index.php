<?php

require_once '../../db.php';

use MongoDB\BSON\ObjectID;

$query_params = $_GET;
$request_method = $_SERVER['REQUEST_METHOD'];


header("Content-Type: application/json; charset=UTF-8");

$collection = 'games.games';
$games = new MongoDBCollection($manager, 'games');
header("Content-Type: application/json; charset=UTF-8");



$result = $games->create();
echo json_encode($result);
// echo $result;
exit();

?>