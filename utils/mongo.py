from pymongo import MongoClient
import json
import random

# Подключаемся к MongoDB
client = MongoClient('localhost', 27017)
db = client['mydatabase']
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

# Закрываем соединение с MongoDB
client.close()


# db.games.updateMany({}, {$set: {image_preview: "https://dummyimage.com/185x270/ced4da/6c757d.jpg"}})