import carlitecrawler as cl
import getgocarcrawler as gg
import tribecarcrawler as tc
import pymongo
import json
import hashlib
import os
import sys
import certifi
ca = certifi.where()





location= sys.argv[1]
date= sys.argv[2]
pickup_time= sys.argv[3]
duration= sys.argv[4]



input_str = f"{location}{date}{pickup_time}{duration}"

# Hash the input string to generate the ID
id = hashlib.sha256(input_str.encode('utf-8')).hexdigest()


cl.search(location, date, pickup_time, duration)
gg.search(location, date, pickup_time, duration)
tc.search(location, date, pickup_time, duration)



# List of JSON files to concatenate
file_list = ['webscraper/carlitecars.json', 'webscraper/getgocars.json', 'webscraper/tribecars.json']

# Initialize an empty list to store the JSON objects
json_objects = []

# Iterate over the list of files
for file_name in file_list:
    # Open the file and load the JSON data as a list
    with open(file_name, 'r') as f:
        data = json.load(f)
        # Add the user ID to each JSON object
        for obj in data:
            obj['search_id'] = id
        # Extend the list of JSON objects with the loaded data
        json_objects.extend(data)

# Write the concatenated JSON objects to a new file
with open('webscraper/output.json', 'w') as f:
    json.dump(json_objects, f, indent=2)


client = pymongo.MongoClient("mongodb+srv://Viral:Viral123@cluster0.4ejvdiv.mongodb.net/CC_Rental?retryWrites=true&w=majority", tlsCAFile=ca)
db = client["CC_Rental"]

# Create a new collection
collection = db["cars"]

collection.insert_many(json_objects)
