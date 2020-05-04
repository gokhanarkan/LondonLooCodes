from pymongo import MongoClient
from bson.json_util import dumps
import os


def lambda_handler(event, context):
    '''
    This function accesses the MongoDB entries on read-only mode
    and gets all the data as a serialised output

    Environment variables:
    MONGO_URL => DB Link provided by mLab
    DB_NAME => Database name
    '''
    uri = os.environ.get('MONGO_URL')
    mongo_url = uri

    client = MongoClient(mongo_url)
    
    db_name = os.environ.get('DB_NAME')
    db = client[db_name]
    collection = db.ldnloo

    return dumps(collection.find())
