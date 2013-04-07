var casper = require('casper').create()
var firstUrl;
var categories = {};

var queries = ['apple', 'tomato', 'fries', 'broccoli',
'lettuce','lentils','coke','bread','pasta','cereal','cheese',
'skittles','beef','wine','tofu','sandwich', 'meat',
'vegetable'];

casper.start('http://nutritiondata.self.com/', function() {
	this.echo(this.getCurrentUrl());
});

casper.each(queries, function(self, query){
	self.then(function(){
		firstUrl = this.getCurrentUrl();
	});

	self.then(function(){
		this.fill('form[name="foodSearch"]', {freetext: query}, true);
		this.click('input.searchNow');
	});

	self.waitFor(function check() {
		return this.getCurrentUrl() != firstUrl;
	}, function then() {
		this.echo(this.getCurrentUrl());
	});

	self.then(function(){
		this.test.assertExists('div.narrowListContainer', "Hooary!");
	});

	self.then(function(){
		var text = this.fetchText('div.narrowListContainer');
		var categoryList = text.split("\n");
		for (var i = 0; i < categoryList.length; i++){
			slicedString = categoryList[i].slice(0,categoryList[i].indexOf("(")-1)
			replacedString = slicedString.replace(/'/g,"");
			nextString = replacedString.replace(/&/g,"");
			replaced2String = nextString.replace(/,/g,"").trim();
			finalString = replaced2String.replace(/ /g,"-").toLowerCase();
			categories[finalString] = true
		}
		this.echo(JSON.stringify(categories));
	});
});

casper.run();