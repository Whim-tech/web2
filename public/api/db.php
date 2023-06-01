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

    public function findLimit($limit, $offset, $field, $q) {
        $query = new MongoDB\Driver\Query([$field => ['$regex' => $q]], ['limit' => $limit, 'skip' => $offset]);
        $cursor = $this->manager->executeQuery($this->collection, $query);
        return $cursor->toArray();
    }

    public function update($id, $new) {
        $filter = ['_id' => $id];
        $update = ['$set' => $new];
        $options = ['multi' => false, 'upsert' => false];

        $bulk = new MongoDB\Driver\BulkWrite;
        $bulk->update($filter, $update, $options);

        $result = $this->manager->executeBulkWrite($this->collection, $bulk);

        return $result->getModifiedCount();
    }

    public function delete($id) {
        $filter = ['_id' => $id];

        $bulk = new MongoDB\Driver\BulkWrite;
        $bulk->delete($filter);

        $result = $this->manager->executeBulkWrite($this->collection, $bulk);

        return $result->getModifiedCount();
    }

    public function create($filter) {

        $bulk = new MongoDB\Driver\BulkWrite;
        $id = $bulk->insert($filter);
        $this->manager->executeBulkWrite($this->collection, $bulk);

        return $id;
    }
}


?>