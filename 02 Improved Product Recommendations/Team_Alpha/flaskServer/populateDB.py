#csv to pandas row by row add to mongo table
import csv
import json
import pandas as pd
from bson import ObjectId
from pymongo import MongoClient
#CSV to JSON Conversion


csvpd = pd.read_csv('data/table (1).csv')
header= list(csvpd.columns)
print(header)
csvfile = open('data/table (1).csv', 'r')
reader = csv.DictReader( csvfile )
client=MongoClient("mongodb://localhost:27017/") 
db=client["dell"]
#db.segment.drop()

for each in reader:
    row={}
    for field in header:
        if field == "_id":
            row[field] = ObjectId(each[field])
        elif field == "isAvailable":
            row[field] = True
        elif field == "price":
            row[field] = float(each[field])*79.50
        else:
            row[field] = each[field]

    db.items.insert_one(row)
