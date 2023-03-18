
from pymongo import MongoClient
import gridfs
import os
from PIL import Image
from io import BytesIO


client = MongoClient('mongodb+srv://lijiaqian65:Lk184363@cluster0.4ejvdiv.mongodb.net/CC_Rental?retryWrites=true&w=majority')
db = client['CC_Rental']
img_collection = db['cars_logo']
fs = gridfs.GridFS(db)
img_dir = './cars_logo'
for filename in os.listdir(img_dir):
    if filename.endswith('.jpg'):
        with open(os.path.join(img_dir, filename), 'rb') as f:
            file_id = fs.put(f.read(), filename=filename)
        img_collection.insert_one({'name': filename.split('.')[0], 'file_id': file_id})


#result = img_collection.find_one({'name': 'TOYOTA'})
#if result:
#   logo_data = fs.get(result['file_id']).read()
#   image = Image.open(BytesIO(logo_data))
#   image.show()
#else:
#   print('Car logo not found')
