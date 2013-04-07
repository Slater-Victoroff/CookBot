# Scrapy settings for nutritionFacts project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/topics/settings.html
#

BOT_NAME = 'nutritionFacts'
BOT_VERSION = '1.0'

SPIDER_MODULES = ['nutritionFacts.spiders']
NEWSPIDER_MODULE = 'nutritionFacts.spiders'
DEFAULT_ITEM_CLASS = 'nutritionFacts.items.NutritionfactsItem'
USER_AGENT = '%s/%s' % (BOT_NAME, BOT_VERSION)

