var casper = require('casper').create();
var currentFood = 1;
var currentUrl;
var baseUrl = "http://nutritiondata.self.com/facts/snacks/"
var names = new Array();
var servingSizes = new Array();
var calories = new Array();
var carbs = new Array();
var fats = new Array();
var proteins = new Array();
var vitamins = new Array();
var minerals = new Array();
var sterols = new Array();
var other = new Array(); 

casper.start("http://nutritiondata.self.com/");

//There are 10690 foods in total to go through
casper.repeat(10689, function() {
	this.then(function() {
		currentUrl = baseUrl + currentFood +"/1";
		currentFood += 1;
		this.thenOpen(currentUrl);
	});

	this.waitFor(function check(){
		return this.getCurrentUrl() == currentUrl;
	}, function then() {
		this.echo(currentUrl);
	});

	//Grabbing static values
	this.then(function() {
		this.test.assertExists('div#facts_header', "Static Values");
		names.push(this.getHTML('div#facts_header h1'));
		servingSizes.push(this.getHTML('div#facts_header option[selected = ""]'));
	});

	//Grabbing calories
	this.then(function() {
		this.test.assertExists('span#KJ_NUTRIENT_1', "Calories");
		var caloricInfo = new Object();
		caloricInfo.total = this.getHTML('span#KJ_NUTRIENT_0');
		caloricInfo.carbs = this.getHTML('span#KJ_NUTRIENT_1');
		caloricInfo.fat = this.getHTML('span#KJ_NUTRIENT_2');
		caloricInfo.protein = this.getHTML('span#KJ_NUTRIENT_3');
		caloricInfo.alcohol = this.getHTML('span#KJ_NUTRIENT_138');
		calories.push(caloricInfo);
	});

	//grabbing carbs
	this.then(function() {
		this.test.assertExists('span#NUTRIENT_4', "carbs");
		var carbsInfo = new Object();
		carbsInfo.total = this.getHTML('span#NUTRIENT_4');
		carbsInfo.fiber = this.getHTML('span#NUTRIENT_5');
		carbsInfo.starch = this.getHTML('span#NUTRIENT_6');
		var sugarsInfo = new Object();
		sugarsInfo.total = this.getHTML('span#NUTRIENT_7');
		sugarsInfo.sucrose = this.getHTML('span#NUTRIENT_8');
		sugarsInfo.glucose = this.getHTML('span#NUTRIENT_9');
		sugarsInfo.fructose = this.getHTML('span#NUTRIENT_10');
		sugarsInfo.lactose = this.getHTML('span#NUTRIENT_11');
		sugarsInfo.maltose = this.getHTML('span#NUTRIENT_12');
		sugarsInfo.galactose = this.getHTML('span#NUTRIENT_13');
		carbsInfo.sugars = sugarsInfo;
		this.echo(JSON.stringify(carbsInfo));
		carbs.push(carbsInfo);
	});

});

casper.run()