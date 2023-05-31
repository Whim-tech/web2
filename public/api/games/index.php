<?php

require_once '../db.php';

use MongoDB\BSON\ObjectID;

$request_method = $_SERVER['REQUEST_METHOD'];
$query_params = $_GET;

$games = new MongoDBCollection($manager, 'games');
header("Content-Type: application/json; charset=UTF-8");

if ($request_method === 'GET' && empty($query_params)) {

    echo json_encode($games->findAll());

} else if ($request_method ==='GET' && isset($query_params['id'])){

    $id = (string)$query_params['id'];
    try {
        $object_id = new ObjectID($id);
    } catch (MongoDB\Driver\Exception\InvalidArgumentException) {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "invalid id", "id" => $id]);
        exit();
    }

    $result = $games->find(['_id'  => ['$eq' =>$object_id]]);

    if (count($result) == 0){
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "game not found", "id" => $id]);
        exit();
    }
    echo json_encode($result[0]);
}else if ($request_method ==='GET' && isset($query_params['limit']) ){

    $q = $query_params['q'] ?? '';
    $limit = $query_params['limit'];
    $offset = $query_params['offset'] ?? 0;
    
    $result = $games->findLimit($limit, $offset, 'full_title', $q);

    echo json_encode($result);

} else {
    http_response_code(400);
    $response = array("message" => "Unsupported request method or not correct query params");
    echo json_encode($response);
    exit();
}

?>