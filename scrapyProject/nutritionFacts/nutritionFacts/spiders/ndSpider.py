from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector
from scrapy.http import Request, Response
from nutritionFacts.items import Ingredient
import bs4 as soup
import json
import urllib

class ndSpider(BaseSpider):
	name = "nd"
	allow_domains = ["nutritiondata.self.com"]

	def start_requests(self):
		path = "/home/svictoroff/Documents/SelfImprovement/cookBot/categories.json"
		urls = []
		baseUrl = "http://nutritiondata.self.com/facts/"
		categoryUrls = []
		with open(path, 'rb') as data:
			print data
			for line in data:
				categories = json.loads(line);
				for category in categories:
					categoryUrls.append(baseUrl + category + "/")
			for url in categoryUrls[:1]:
				counter = 1
				maximum = 2 #no category has more than 12k
				while counter < maximum:
					yield Request(url + str(counter) + "/1")
					counter += 1
					print url
				#exists = True
				# while exists:
				# 	current = url + str(counter)+ "/1"
				# 	dump = urllib.urlopen(current)
				# 	current = soup.BeautifulSoup(dump)
				# 	if ("Internal Server Error" in current.find('h1',id='onPage')):
				# 		exists = False
				# 	else:
				# 		yield Request(url + str(counter)+ "/1")
				# 		counter += 1
				# 		print counter

	def parse(self, response):
		with open("../foodPageSample.txt", 'wb') as dump:
			dump.write(response.body)
