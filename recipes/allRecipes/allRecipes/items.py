# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/topics/items.html

from scrapy.item import Item, Field

class Recipe(Item):
    name = Field()
    time = Field()
    rating = Field()
    reviews = Field()
    servings = Field()
    ingredients = Field()
    instructions = Field()
    notes = Field()
    prepTime = Field()
    cookTime = Field()
    totalTime = Field()
