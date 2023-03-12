import requests
import pickle
URL="https://www.tribecar.com/browse"
r = requests.get(URL)

from bs4 import BeautifulSoup
soup = BeautifulSoup(r.content, 'html5lib')
table = soup.findAll('div', attrs = {'id':'location-holder'}) 
locationsval=[]
locationsname=[]
for row in table:
    for each in row.findAll('option'):
        if(each.text!= "Any Location" ):
            location= each.text
            locationsname.append(location)
            each= str(each)
            start= each.find('"')+1
            end= each.rfind('"')
            locationsval.append(each[start:end])

locationgps={}
from geopy.geocoders import GoogleV3

geolocator = GoogleV3(api_key='AIzaSyCRa8maOVVWwWRYQ_fyUWD5v_F2BDxqWBU')
for location in locationsname:
    loc= location
    #print(location)
    location = geolocator.geocode(location)
    if location is not None:
        #if location.address!="Singapore":
        locationgps[loc]= (location.latitude, location.longitude, locationsval[locationsname.index(loc)])


with open('locationgps.pkl', 'wb') as f:
    pickle.dump(locationgps, f)

# List
with open('locationsname.pkl', 'wb') as f:
    pickle.dump(locationsname, f)
with open('locationsval.pkl', 'wb') as f:
    pickle.dump(locationsval, f)
