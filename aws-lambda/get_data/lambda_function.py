from pymongo import MongoClient
from bson.json_util import dumps
import os


def lambda_handler(event, context):
    # DB connection
    uri = os.environ.get('MONGO_URL')
    mongo_url = uri
    client = MongoClient(mongo_url)
    db_name = os.environ.get('DB_NAME')
    db = client[db_name]
    collection = db.ldnloo
    # Return serialized information
    return dumps(collection.find())
