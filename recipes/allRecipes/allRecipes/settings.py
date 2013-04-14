# Scrapy settings for allRecipes project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/topics/settings.html
#

BOT_NAME = 'allRecipes'
BOT_VERSION = '1.0'

SPIDER_MODULES = ['allRecipes.spiders']
NEWSPIDER_MODULE = 'allRecipes.spiders'
DEFAULT_ITEM_CLASS = 'allRecipes.items.AllrecipesItem'
USER_AGENT = '%s/%s' % (BOT_NAME, BOT_VERSION)

ITEM_PIPELINES = ['allRecipes.pipelines.JsonWriterPipeline']
