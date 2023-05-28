from pymongo import MongoClient
import json
import random

client = MongoClient('mongodb://localhost:27017/', username='root', password='example', authSource='admin')
db = client['games']


collection = db['games']

developers = db['developers']
publishers = db['publishers']
genres = db['genres']
platforms = db['platforms']

games = []
for i in range(1000):
    game = {
        "title": f"Игра №{i+1}",
        "description": f"Описание игры №{i+1}",
        "release_date": random.randint(1970, 2023),
        "developer": developers.find_one({"name": f"Разработчик №{random.randint(1, 1000)}"})['_id'],
        "publisher": publishers.find_one({"name": f"Издательство №{random.randint(1, 1000)}"})['_id'],
        "genres": [
            genres.find_one({"name": f"Жанр №{random.randint(1, 100)}"})['_id'],
            genres.find_one({"name": f"Жанр №{random.randint(1, 100)}"})['_id'],
        ],
        "platforms": [
            platforms.find_one({"name": f"платформа №{random.randint(1, 10)}"})['_id'],
            platforms.find_one({"name": f"платформа №{random.randint(1, 10)}"})['_id'],
        ],
        "rating": random.uniform(1.0, 5.0),
        "image_url": f"https://example.com/game_{i+1}.jpg"
    }
    games.append(game)


collection.insert_many(games)

client.close()