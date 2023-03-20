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
with open('webscraper/locationgps.pkl', 'rb') as f:
    locationgps = pickle.load(f)

with open('webscraper/locationsname.pkl', 'rb') as f:
    locationsname = pickle.load(f)

with open('webscraper/locationsval.pkl', 'rb') as f:
    locationsval = pickle.load(f)

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

def search(curlocation, pickupdate, pickuptime, duration):
    curlocation = geolocator.geocode(curlocation)
    targetloc= nearestplace(curlocation[1][0], curlocation[1][1], locationgps, locationsname, locationsval)
    targetlocval= targetloc[1]
    
    tmr_date = datetime.strptime(pickupdate, '%Y-%m-%d').date()
    tmr_date=tmr_date + timedelta(days=1)
    tmr_date= tmr_date.strftime('%Y-%m-%d')
    urlt= f"https://www.tribecar.com/browseCarList?pickupDate={pickupdate}&pickupTime={pickuptime}%3A00&duration=1&location={targetlocval}&returnDate={tmr_date}&returnTime={pickuptime}%3A00&latitude=&longitude=&page=1&phvOnly=0&malaysiaOnly=0&package=1"
    header = {
    "authority": 'www.tribecar.com',
    "method": 'GET', 
    "path": f'/browseCarList?pickupDate={pickupdate}&pickupTime={pickuptime}%3A00&duration=1&location={targetlocval}&returnDate={tmr_date}&returnTime={pickuptime}%3A00&latitude=&longitude=&page=1&phvOnly=0&malaysiaOnly=0&package=1',
    "scheme": 'https',
    "accept": '*/*',
    "accept-encoding": 'gzip, deflate, br',
    "accept-language": "en-US,en;q=0.9,en-GB;q=0.8",
    "cookie": "_gid=GA1.2.918660294.1678455355; _gcl_au=1.1.42318219.1678455355; PHPSESSID=fb7jrns2lab3to0b8vljbfr2fh; _fw_crm_v=03c50abf-0f19-4fe6-dce5-74579a1ae30d; _gac_UA-71201936-1=1.1678455725.Cj0KCQiAx6ugBhCcARIsAGNmMbh59mtau13TklmHbm77ZBRLGhw1XT3FwcahWcktjCRt9wjE0Yu7ksIaAkDdEALw_wcB; _gcl_aw=GCL.1678455725.Cj0KCQiAx6ugBhCcARIsAGNmMbh59mtau13TklmHbm77ZBRLGhw1XT3FwcahWcktjCRt9wjE0Yu7ksIaAkDdEALw_wcB; _ga=GA1.1.1967174802.1678455355; _ga_4JKKPR5Z8E=GS1.1.1678515142.2.1.1678516209.24.0.0",
    "newrelic": 'eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjM1NjA5MzUiLCJhcCI6IjEzODU5NzI2OTUiLCJpZCI6IjlmOTk2NjcyYzYwMDQ1OWYiLCJ0ciI6ImUzYjRhM2Q0MWEwYjQxMjY0MDNhNTk1YWE2MzE3YzEwIiwidGkiOjE2Nzg1MTYyNjkwODV9fQ==',
    "referer": 'https://www.tribecar.com/browse',
    "sec-ch-ua": '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
    "sec-ch-ua-mobile": '?0',
    "sec-ch-ua-platform": "macOS",
    "sec-fetch-dest": 'empty',
    "sec-fetch-mode": 'cors',
    "sec-fetch-site": 'same-origin',
    "traceparent": '00-e3b4a3d41a0b4126403a595aa6317c10-9f996672c600459f-01',
    "tracestate": '3560935@nr=0-1-3560935-1385972695-9f996672c600459f----1678516269085',
    "user-agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    "x-newrelic-id": 'VwMBUV9QDRABVFhSAwgFU1AA',
    "x-requested-with": 'XMLHttpRequest'
    }
    responset = requests.get(urlt, headers=header)
    content= responset.content
    #content = brotli.decompress(responset.content)
    #print(content)
    data = json.loads(content)
    soup = BeautifulSoup(data['view'], 'html.parser')
    make_model = soup.find_all('div', {'class': 'carDiv'})
    carlist=[]

    for i in make_model:
        try:
            car={}
            car_model=i.find('img')['alt']
            info= i.find('div', {'class': 'col-md-12'}).text
            info= info.strip()
            info= info.split("\n\n")
            xinfo= info[1].split(',')
            car_seats= xinfo[1].strip()
            location= info[2].strip()
            #duration= i.find('div', {'class': 'col-md-2 col-sm-3 hidden-xs durationLong'}).text
            #duration= (duration.strip()).split('\n')
            price= i.find('p', {'class': "priceLabel text-center"}).text
            car['model']= car_model
            car['seats']=int(car_seats[0])
            locagps = geolocator.geocode(location)
            car['latitude']= locagps[1][0]
            car['longitude']=locagps[1][1]
            price= float(price[1:])*int(duration)
            car['price']= price
            car['rent_company']="TribeCar"
            carlist.append(car)

        except:
            continue
    print("completed")
    final = json.dumps(carlist, indent=2)
    with open("webscraper/tribecars.json", "w") as outfile:
        outfile.write(final)
    return carlist

'''
data= search("Changi Airport", "2023-03-20", "17", 2)
final = json.dumps(data, indent=2)
with open("tribecars.json", "w") as outfile:
    outfile.write(final)
'''

'''
run in terminal
python tribecarcrawler.py "Jurong Point" "2023-03-13" "13" 1
'''
