from pymongo import MongoClient
from bson.json_util import dumps, loads
import os


def lambda_handler(event, context):
    '''
    This function gets the form data from the React App
    and adds into the database

    Environment variables:
    MONGO_URL => DB Link provided by mLab
    DB_NAME => Database name
    '''
    mongo_url = os.environ.get('MONGO_URL')

    client = MongoClient(mongo_url, retryWrites=False)

    db_name = os.environ.get('DB_NAME')
    db = client[db_name]
    collection = db.postloo

    # Request from React app initializes as a json data
    # and created into a dictionary for Mongo entry
    event_body = loads(event["body"])
    data = {
        "name": event_body["name"]["name"],
        "rough_location": event_body["rough_location"]["location"],
        "code": event_body["code"]["code"],
        "nearest_station": event_body["nearest_station"]["station"],
        "address": event_body["address"]["address"],
        "accessible": event_body["accessible"]["accessible"],
        "gender_neutral": event_body["gender_neutral"]["gender"],
        "additional_comments": event_body["comments"]["comments"]
    }
    collection.insert_one(data)
    
    return event
