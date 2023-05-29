from pymongo import MongoClient
import json
import random

client = MongoClient('mongodb://localhost:27017/',
                     username='root', password='example', authSource='admin')
db = client['games']


games_db = db['games']
developers_db = db['developers']
publishers_db = db['publishers']
genres_db = db['genres']
platforms_db = db['platforms']

developers = []
dev_count = 24
for i in range(dev_count):
    developer = {
        "name": f"Разработчик №{i+1}",
        "country": random.choice(["Россия", "США", "Великобритания", "Япония", "Китай"]),
        "founded_year": random.randint(1900, 2021),
        "website": f"https://example{i+1}.com"
    }
    developers.append(developer)

developers_db.insert_many(developers)

genres = []
genre_cound=12
for i in range(genre_cound):
    genre = {
        "name": f"Жанр №{i+1}",
        "description": f"Крутое описание жанра #{i+1}",
    }
    genres.append(genre)

genres_db.insert_many(genres)

publishers = []
publisher_count = 24
for i in range(publisher_count):
    publisher = {
        "name": f"Издательство №{i+1}",
        "country": random.choice(["Россия", "США", "Великобритания", "Япония", "Китай"]),
        "founded_year": random.randint(1900, 2021),
        "website": f"https://example{i+1}.com"
    }
    publishers.append(publisher)

publishers_db.insert_many(publishers)

platforms = []
platform_count = 12
for i in range(platform_count):
    platform = {
        "name": f"платформа №{i+1}",
        "manufacturer": random.choice(["Microsoft", "Sony", "Nintendo"]),
        "release_date": random.randint(1970, 2023),
        "description": f"Описание платформы №{i+1}"
    }
    platforms.append(platform)

platforms_db.insert_many(platforms)


games = []
for i in range(120):
    game = {
        "full_title": f"Игра №{i+1}",
        "short_title": f"Игра №{i+1}",
        "release_date": random.randint(1970, 2023),

        "developer": developers_db.find_one({"name": f"Разработчик №{random.randint(1, dev_count)}"})['_id'],
        "publisher": publishers_db.find_one({"name": f"Издательство №{random.randint(1, publisher_count)}"})['_id'],
        "genres": [
            genres_db.find_one(
                {"name": f"Жанр №{random.randint(1, genre_cound)}"})['_id'],
            genres_db.find_one(
                {"name": f"Жанр №{random.randint(1, genre_cound)}"})['_id'],
        ],
        "platforms": [
            platforms_db.find_one(
                {"name": f"платформа №{random.randint(1, platform_count)}"})['_id'],
            platforms_db.find_one(
                {"name": f"платформа №{random.randint(1, platform_count)}"})['_id'],
        ],

        "image_preview": f"https://dummyimage.com/185x270/ced4da/6c757d.jpg",

        "description": {
            "small_preview": "https://dummyimage.com/440x220/ced4da/6c757d.png",
            "big_preview": "https://dummyimage.com/900x400/ced4da/6c757d.jpg",
            "short_description": f"Описание игры №{i+1}",
            "long_description": [
                {
                    "header": "Пример первого абзаца",
                    "content": "Содержание первого абзаца, потом это надо обязательно заменить, но пока пусть будет текст хоть какой то",
                },
                {
                    "header": "Пример второго абзаца",
                    "content": "Содержание второго абзаца, потом это надо обязательно заменить, но пока пусть будет текст хоть какой то",
                },
                {
                    "header": "Пример третего абзаца",
                    "content": "Содержание третего абзаца, потом это надо обязательно заменить, но пока пусть будет текст хоть какой то",
                }
                ],
        },

    }
    games.append(game)


games_db.insert_many(games)

client.close()
