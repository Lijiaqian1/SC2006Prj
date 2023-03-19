import requests
from datetime import datetime
import json
import math
from bs4 import BeautifulSoup
import re
from geopy.geocoders import GoogleV3
geolocator = GoogleV3(api_key='AIzaSyCRa8maOVVWwWRYQ_fyUWD5v_F2BDxqWBU')

import pickle
with open('carlitelocations.pkl', 'rb') as f:
    locationgps = pickle.load(f)

with open('carlitelocationsname.pkl', 'rb') as f:
    locationsname = pickle.load(f)

with open('carlitelocationsidl.pkl', 'rb') as f:
    locationsid = pickle.load(f)

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

def nearestplace(curlat, curlong, locationgps, locationsname, locationsval):
    distances=[]
    for loc in locationgps:
        distances.append(calcdist(curlat, curlong, locationgps[loc][0], locationgps[loc][1]))
    mindistindx= distances.index(min(distances))
    return locationsname[mindistindx], locationsval[mindistindx]


def search(location, pickupdate, pickuptime, durationhours):
    endtime= (int(pickuptime)+durationhours)%24
    curlocation = geolocator.geocode(location)
    targetloc= nearestplace(curlocation[1][0], curlocation[1][1], locationgps, locationsname, locationsid)
    urlt= f'https://www.carlite.sg/booking-search?from={pickupdate}%20{pickuptime}%3A00%3A00&to={pickupdate}%20{endtime}%3A00%3A00&vehicle_location_id=area-{targetloc[1]}&vehicle_model_id='
    header={
    "user-agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    }


    responsetnew = requests.get(urlt, headers=header)
    soup = BeautifulSoup(responsetnew.content, 'html5lib')
    table = soup.findAll('div', attrs = {'class':'mg-b-20'})

    data=[]
    for i in table:
        carlist={}
        if(i.find('h4')):
            model=i.find('h4')
            model= model.text
            carlist['model']=model
            #print("model", model)
            if(i.find('div', attrs={'class': 'pd-b-15'})):
                attrss=[]
                attr= i.find('div', attrs={'class': 'pd-b-15'})
                for j in attr:
                    if (j.text).strip():
                        attrss.append((j.text).strip())
                        #print("attr:", (j.text).strip())
                #carlist['transmission']= attrss[1]
                carlist['seats']= int(attrss[2][0])

            if(i.find('div', attrs={'class': 'pd-b-25'})):
                block= i.find('div', attrs={'class': 'pd-b-25'})
                for j in block:
                    if (j.text).strip():
                        loca= j.text
                        ##print("lcoation:",loca)
                locagps = geolocator.geocode(loca)

                carlist['latitude']= locagps[1][0]
                carlist['longitude']= locagps[1][1]

            if(i.find('div', attrs={'class': 'pd-l-60 col-md-3 col-6'})):
                block= i.find_all('div', attrs={'class': 'pd-l-60 col-md-3 col-6'})
                for b in block:
                    txtcont= b.find('h5')
                    if "SGD" in txtcont.text.strip():
                        ##print("Price ", txtcont.text.strip())
                        price= txtcont.text.strip()
                        carlist['price']= float(price[4:])
            available= i.find('div', attrs={'class': 'pos-md-absolute t-0 r-0 pd-md-30 col-md-3 col-12 wd-20p'})
            available= (available.text).strip()
            if 'Not Available' in available:
                continue
                #print("not saved")
            else:
                carlist['rent_company']="CarLite"
                data.append(carlist)

    return data



final= search("Changi Airport", "2023-03-20", "17", 1)

final = json.dumps(final, indent=2)
with open("carlitecars.json", "w") as outfile:
    outfile.write(final)
