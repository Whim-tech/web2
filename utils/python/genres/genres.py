from pymongo import MongoClient
import json

client = MongoClient('mongodb://localhost:27017/', username='root', password='example', authSource='admin')
db = client['games']

collection = db['genres']

genres = []
for i in range(100):
    genre = {
        "name": f"Жанр №{i+1}",
        "description": f"Крутое описание жанра #{i+1}",
    }
    genres.append(genre)

with open("genres.json", "w", encoding='utf-8') as outfile:
    json.dump(genres, outfile, indent=2, ensure_ascii=False)
    
collection.insert_many(genres)

client.close()