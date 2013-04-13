from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector
from scrapy.http import Request

from allRecipes.items import Recipe

import math

class recipeSpider(BaseSpider):
	name = "allRecipes"
	allowed_domains = ["allrecipes.com"]

	def start_requests(self):
		baseUrl = "http://allrecipes.com/recipes/ViewAll.aspx?Page="
		resultsPerPage = 20.0
		totalResults = 44565
		pages = int(math.ceil(totalResults/resultsPerPage))
		for i in range(0,1):
			url = baseUrl + str(i)
			yield Request(url, self.searchPage)

	def searchPage(self, response):
		hxs = HtmlXPathSelector(response)
		links = hxs.select("//h3/a/@href").extract()[5:]
		for link in links:
			yield Request(link, self.recipePage)

	def recipePage(self, response):
		hxs = HtmlXPathSelector(response)
		name = hxs.select('//h1[@id="itemTitle"]/text()').extract()
		rawTime = hxs.select('//span[@class="time"]')
		formatTime = "".join(rawTime.select('em/text()').extract() + rawTime.select('text()').extract())
		rating = float(hxs.select('//meta[@itemprop = "ratingValue"]/@content').extract()[0])
		reviews = hxs.select('//meta[@id = "metaReviewCount"]/@content').extract()
		if len(reviews) < 1:
			reviews = 0
		else:
			reviews = int(reviews[0])
		servings = hxs.select('//span[@id="lblYield"]/text()').extract()
		ingredients = hxs.select('//li[@id="liIngredient"]')
		ingredientNames = hxs.select('//span[@class = "ingredient-name"]/text()').extract()
		ingredientMasses = []
		print ingredientNames
		for ingredient in ingredients:
			masses.append(float("".join(ingredient.select('@data-grams').extract())))

