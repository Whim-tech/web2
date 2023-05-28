<?php

$host = 'mongodb';
$port = 27017;
$database = 'games';
$user = 'root';
$pass = 'example';

$manager = new MongoDB\Driver\Manager("mongodb://{$user}:{$pass}@{$host}:{$port}");

class MongoDBCollection {

    private $collection;
    private $database = 'games';
    private $manager;

    public function __construct($manager, $collection_name) {
        $this->collection = "{$this->database}.{$collection_name}";
        $this->manager = $manager;
    }

    public function findAll() {
        $query = new MongoDB\Driver\Query([]);
        $cursor = $this->manager->executeQuery($this->collection, $query);
        return $cursor->toArray();
    }

    public function findOne($filter) {
        $query = new MongoDB\Driver\Query($filter, ['limit' => 1]);

        $cursor = $this->manager->executeQuery($this->collection, $query);
        if (!$cursor->isDead()){
            return $cursor->toArray()[0];
        } else {
            return new stdClass();
        }
    }

    public function find($filter) {
        $query = new MongoDB\Driver\Query($filter, ['limit' => 1]);

        $cursor = $this->manager->executeQuery($this->collection, $query);
        
        return $cursor->toArray();
    }
}


?>