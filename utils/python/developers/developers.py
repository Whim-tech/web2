from pymongo import MongoClient
import json
import random

client = MongoClient('mongodb://localhost:27017/', username='root', password='example', authSource='admin')
db = client['games']
collection = db['developers']

developers = []
for i in range(1000):
    developer = {
        "name": f"Разработчик №{i+1}",
        "country": random.choice(["Россия", "США", "Великобритания", "Япония", "Китай"]),
        "founded_year": random.randint(1900, 2021),
        "website": f"https://example{i+1}.com"
    }
    developers.append(developer)

with open("developers.json", "w", encoding='utf-8') as outfile:
    json.dump(developers, outfile, indent=2, ensure_ascii=False)

collection.insert_many(developers)

client.close()