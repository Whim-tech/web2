from pymongo import MongoClient
import json
import random

# Подключаемся к MongoDB
client = MongoClient('mongodb://localhost:27017/', username='root', password='example', authSource='admin')
db = client['games']

collection = db['publishers']

# Генерируем данные
publishers = []
for i in range(1000):
    publisher = {
        "name": f"Издательство №{i+1}",
        "country": random.choice(["Россия", "США", "Великобритания", "Япония", "Китай"]),
        "founded_year": random.randint(1900, 2021),
        "website": f"https://example{i+1}.com"
    }
    publishers.append(publisher)

# Вставляем данные в коллекцию
collection.insert_many(publishers)

with open("publishers.json", "w", encoding='utf-8') as outfile:
    json.dump(publishers, outfile, indent=2, ensure_ascii=False)

# Закрываем соединение с MongoDB
client.close()