import math
from datetime import datetime
from datetime import timedelta
from bs4 import BeautifulSoup
import json
import requests
from geopy.geocoders import GoogleV3
import zlib
import brotli
import sys

geolocator = GoogleV3(api_key='AIzaSyCRa8maOVVWwWRYQ_fyUWD5v_F2BDxqWBU')
import pickle

with open('webscraper/getgocardata.pkl', 'rb') as f:
    data = pickle.load(f)

def whichpeak(timehour24, pickupdate):
    tmr_date = datetime.strptime(pickupdate, '%Y-%m-%d').date()
    week= tmr_date.weekday()
    ##working week
    if week>=0 and week<5:
        if(timehour24>=18 and timehour24<24):
            return 2
        elif(timehour24>=6 and timehour24<9):
            return 0
        else:
            return 1
    ## weekend
    else:
        if(timehour24>=0 and timehour24<9):
            return 1
        else:
            return 2


def calcdist(lat1, lon1, lat2, lon2):
    """
    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)
    """
    R = 6371  # radius of the Earth in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    distance = R * c
    return distance

def nearestplace(curlat, curlong, data):
    distances=[]
    top5=[]
    for loc in data:
        distances.append(calcdist(curlat, curlong, loc['latitude'], loc['longitude']))
    for i in range(5):
        mindistindx= distances.index(min(distances))
        distances[mindistindx]= max(distances)
        top5.append(data[mindistindx])

    return top5


"""
output in [output1, output2]

output1 is priceperhour
output2 is mileageperkm
"""
def showprice(peak, group):
    if peak==0:
        if group== 'Commercial EV':
            return (10, 0.39)
        if group== 'Economy':
            return (3, 0.39)
        if group== 'Luxury':
            return (15, 0.49)
        if group== 'Premium':
            return (6, 0.39)
        if group== 'Premium EV':
            return (12, 0.29)
        if group== 'Standard':
            return (3, 0.39)
        if group== 'Standard EV':
            return (4, 0.29)
    elif peak==1:
        if group== 'Commercial EV':
            return (11, 0.39)
        if group== 'Economy':
            return (5, 0.39)
        if group== 'Luxury':
            return (18, 0.49)
        if group== 'Premium':
            return (9, 0.39)
        if group== 'Premium EV':
            return (15, 0.29)
        if group== 'Standard':
            return (6, 0.39)
        if group== 'Standard EV':
            return (7, 0.29)

    else:
        if group== 'Commercial EV':
            return (12, 0.39)
        if group== 'Economy':
            return (7, 0.39)
        if group== 'Luxury':
            return (21, 0.49)
        if group== 'Premium':
            return (12, 0.39)
        if group== 'Premium EV':
            return (18, 0.29)
        if group== 'Standard':
            return (9, 0.39)
        if group== 'Standard EV':
            return (10, 0.29)


def calctotalprice( pricepair, durationhour):
    return pricepair[0]*int(durationhour)

##make the output
##make the search function

def search(curlocation, pickupdate, pickuptime, duration):
    curlocation = geolocator.geocode(curlocation)
    targetloc= nearestplace(curlocation[1][0], curlocation[1][1], data)
    outputdata=[]

    for i in targetloc:
        carlist={}
        carlist['model']= i['vehicle_make_name']+i['vehicle_model_name']
        carlist['seats']= i['num_seats']
        carlist['latitude']= i['latitude']
        carlist['longitude']=i['longitude']
        carlist['price']= calctotalprice(showprice(whichpeak(int(pickuptime), pickupdate), i['price_group_name']), duration)
        carlist['rent_company']= "GetGo"
        outputdata.append(carlist)

    final = json.dumps(outputdata, indent=2)
    with open("webscraper/getgocars.json", "w") as outfile:
        outfile.write(final)
    return outputdata


#final= search("Nanyang Technological University", "2023-03-16", '12', 2)
##final = json.dumps(final, indent=2)
#with open("webscraper/getgocars.json", "w") as outfile:
    #outfile.write(final)
