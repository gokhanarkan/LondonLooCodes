#!/usr/bin/env python
# -*- coding: utf-8 -*-
import csv
from pymongo import MongoClient
import os


def write_mongo(loos):
    '''
    This function gets the list of data and add them into Mongo database

    @param loos: list of individual loos
    '''

	mongo_url = os.environ.get('MONGO_URL')
	client = MongoClient(mongo_url, retryWrites=False)
    db_name = os.environ.get('DB_NAME')
	db = client[db_name]
	collection = db.ldnloo

    for loo in loos:
		collection.insert_one(loo)


def read_csv():
    '''
    This function reads the csv file data, bundles each row and returns a full list of information
    '''

    loo_dict = []

    with open('csv/data.csv', 'r', encoding='utf-8') as csvfile:
		csv_reader = csv.reader(csvfile, delimiter=',')
		for row in csv_reader:
			data = {
				'name': row[0],
				'rough_location': row[1],
				'code': row[2],
				'nearest_station': row[3],
				'address': row[4],
				'accessible': row[5],
				'gender_neutral': row[6],
				'date': row[7],
				'full_address': row[8],
				'lat': row[9],
				'long': row[10]
			}
            loo_dict.append(data)

    return loo_dict

if __name__ == "__main__":
    loo_dict = read_csv()
    write_mongo(loo_dict)
