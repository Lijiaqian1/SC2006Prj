import json
import requests
import pickle
header = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
}
url= "https://getgo.sg/dataitems/vehicles.json"
response = requests.get(url, headers= header)

# assume 'response' is the byte string representation of the JSON object
data = json.loads(response.content)
data =data['data']

with open('getgocardata.pkl', 'wb') as f:
    pickle.dump(data, f)
