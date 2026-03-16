from pymongo import MongoClient

MONGO_URL = "mongodb+srv://FirstDatabase:Richsidhan143145@cluster0.ooavzzg.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URL, tls=True)

db = client["resume_analyzer_db"]
collection = db["test_collection"]

data = {
    "name": "Sidhan",
    "project": "AI Resume Analyzer",
    "status": "MongoDB Connected Successfully"
}

collection.insert_one(data)

print("✅ Data inserted successfully!")