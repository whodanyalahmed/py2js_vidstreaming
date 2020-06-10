import requests
from bs4 import BeautifulSoup as soup


#testing link ( will be provided from our database)
url='https://vidstreaming.io/streaming.php?id=MTExMDMy&title=Captain+Tsubasa+%282018%29+episode+32&typesub=SUB'

#getting all server's url from the source page
link=soup(requests.get(url).text,'html.parser').findAll("li",{"class":"linkserver"})
for x in link:
	#searching for the wanted link (fcdn.stream)
	if 'fcdn.stream' in x['data-video']:
		#getting the code of the url
		code=x['data-video'].replace("https://fcdn.stream/v/","")
		#using their api to grab a direct link
		response = requests.post('https://fcdn.stream/api/source/rywg2heekn0nwn4')
		print(response.json()['data'][-1]['file'])


