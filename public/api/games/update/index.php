<?php 

require_once '../../db.php';

use MongoDB\BSON\ObjectID;

$query_params = $_GET;
$request_method = $_SERVER['REQUEST_METHOD'];


// header("Content-Type: application/json; charset=UTF-8");

$collection = 'games.games';
$games = new MongoDBCollection($manager, 'games');
header("Content-Type: application/json; charset=UTF-8");


if (isset($query_params['id'])){

    $id = (string)$query_params['id'];
    $object_id = new ObjectID($id);
    
    $body = file_get_contents("php://input");
    $newGame = json_decode(file_get_contents('php://input'));
    
    $result = $games->update($object_id, $newGame);
    echo json_encode($result);
    exit();
    
}

?>