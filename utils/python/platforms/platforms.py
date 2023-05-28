from pymongo import MongoClient
import json
import random
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/', username='root', password='example', authSource='admin')
db = client['games']

collection = db['platforms']

platforms = []
for i in range(10):
    platform = {
        "name": f"платформа №{i+1}",
        "manufacturer": random.choice(["Microsoft", "Sony", "Nintendo"]),
        "release_date": random.randint(1970, 2023),
        "description": f"Описание платформы №{i+1}"
    }
    platforms.append(platform)

with open("platforms.json", "w", encoding='utf-8') as outfile:
    json.dump(platforms, outfile, indent=2, ensure_ascii=False)
    
collection.insert_many(platforms)

client.close()