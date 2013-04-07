from scrapy.contrib.spiders import BaseSpider
from scrapy.selector import HtmlXPathSelector
from nutritionFacts.items import Ingredient

class ndSpider(BaseSpider):
	name = "nd"
	allow_domains = ["nutritiondata.self.com"]
