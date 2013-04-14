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
		for i in range(0,pages):
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
		rawIngredients = hxs.select('//li[@id="liIngredient"]')
		ingredientNames = hxs.select('//span[@class = "ingredient-name"]/text()').extract()
		ingredientMasses = []
		for ingredient in rawIngredients:
			ingredientMasses.append(float("".join(ingredient.select('@data-grams').extract())))
		ingredients = zip(ingredientNames,ingredientMasses)
		instructions = "\n".join(hxs.select('//span[@class = "plaincharacterwrap break"]/text()').extract())
		notes = "\n".join(hxs.select("//div[@id = 'noteContainer']/text()").extract())

		rawPrepHours = hxs.select("//span[@id='prepHoursSpan']/em/text()").extract()
		rawPrepMins = hxs.select("//span[@id='prepMinsSpan']/em/text()").extract()
		if (len(rawPrepHours) < 1):
			prepHours = 0
		else:
			prepHours = int("".join(rawPrepHours))
		if (len(rawPrepMins)<1):
			prepMins = 0
		else:
			prepMins = int("".join(rawPrepMins))
		prepTime = 60*prepHours + prepMins

		rawCookHours = hxs.select("//span[@id='cookHoursSpan']/em/text()").extract()
		rawCookMins = hxs.select("//span[@id='cookMinsSpan']/em/text()").extract()
		if (len(rawCookHours) < 1):
			cookHours = 0
		else:
			cookHours = int("".join(rawCookHours))
		if (len(rawCookMins)<1):
			cookMins = 0
		else:
			cookMins = int("".join(rawCookMins))
		cookTime = 60*cookHours + cookMins

		rawTotalHours = hxs.select("//span[@id='totalHoursSpan']/em/text()").extract()
		rawTotalMins = hxs.select("//span[@id='totalMinsSpan']/em/text()").extract()
		if (len(rawTotalHours) < 1):
			totalHours = 0
		else:
			totalHours = int("".join(rawTotalHours))
		if (len(rawTotalMins)<1):
			totalMins = 0
		else:
			totalMins = int("".join(rawTotalMins))
		totalTime = 60*totalHours + totalMins

		item = Recipe()
		item['name'] = name
		item['time'] = formatTime
		item['rating'] = rating
		item['reviews'] = reviews
		item['servings'] = servings
		item['ingredients'] = ingredients
		item['instructions'] = instructions
		item['notes'] = notes
		item['prepTime'] = prepTime
		item['cookTime'] = cookTime
		item['totalTime'] = totalTime
		return item


