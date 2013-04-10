var casper = require('casper').create();
var currentFood = 0;
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
casper.repeat(10690, function() {
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
		this.test.assertExists('span#NUTRIENT_4', "Carbs");
		var carbsInfo = new Object();
		carbsInfo.total = this.getHTML('span#NUTRIENT_4') + this.getHTML('span#UNIT_NUTRIENT_4');
		carbsInfo.fiber = this.getHTML('span#NUTRIENT_5') + this.getHTML('span#UNIT_NUTRIENT_5');
		carbsInfo.starch = this.getHTML('span#NUTRIENT_6'); + this.getHTML('span#UNIT_NUTRIENT_6')
		var sugarsInfo = new Object();
		sugarsInfo.total = this.getHTML('span#NUTRIENT_7') + this.getHTML('span#UNIT_NUTRIENT_7');
		sugarsInfo.sucrose = this.getHTML('span#NUTRIENT_8') + this.getHTML('span#UNIT_NUTRIENT_8');
		sugarsInfo.glucose = this.getHTML('span#NUTRIENT_9') + this.getHTML('span#UNIT_NUTRIENT_9');
		sugarsInfo.fructose = this.getHTML('span#NUTRIENT_10') + this.getHTML('span#UNIT_NUTRIENT_10');
		sugarsInfo.lactose = this.getHTML('span#NUTRIENT_11') + this.getHTML('span#UNIT_NUTRIENT_11');
		sugarsInfo.maltose = this.getHTML('span#NUTRIENT_12') + this.getHTML('span#UNIT_NUTRIENT_12');
		sugarsInfo.galactose = this.getHTML('span#NUTRIENT_13') + this.getHTML('span#UNIT_NUTRIENT_13');
		carbsInfo.sugars = sugarsInfo;
		carbs.push(carbsInfo);
	});

	//grabbing fats
	this.then(function() {
		this.test.assertExists('span#NUTRIENT_14', "Fats");
		fatsInfo = Object();
		saturatedFatsInfo = Object();
		monoUnsaturatedFatsInfo = Object();
		polyUnsaturatedFatsInfo = Object();
		fattyAcidsInfo = Object();

		fatsInfo.total = this.getHTML('span#NUTRIENT_14') + this.getHTML('span#UNIT_NUTRIENT_14');
		saturatedFatsInfo.total = this.getHTML('span#NUTRIENT_15') + this.getHTML('span#UNIT_NUTRIENT_15');
		saturatedFatsInfo['4:00'] = this.getHTML('span#NUTRIENT_16') + this.getHTML('span#UNIT_NUTRIENT_16'); 
		saturatedFatsInfo['6:00'] =  this.getHTML('span#NUTRIENT_17') + this.getHTML('span#UNIT_NUTRIENT_17');
		saturatedFatsInfo['8:00']= this.getHTML('span#NUTRIENT_18') + this.getHTML('span#UNIT_NUTRIENT_18');
		saturatedFatsInfo['10:00'] = this.getHTML('span#NUTRIENT_19') + this.getHTML('span#UNIT_NUTRIENT_19');
		saturatedFatsInfo['12:00'] = this.getHTML('span#NUTRIENT_20') + this.getHTML('span#UNIT_NUTRIENT_20');
		saturatedFatsInfo['13:00'] = this.getHTML('span#NUTRIENT_21') + this.getHTML('span#UNIT_NUTRIENT_21');
		saturatedFatsInfo['14:00'] = this.getHTML('span#NUTRIENT_22') + this.getHTML('span#UNIT_NUTRIENT_22');
		saturatedFatsInfo['15:00'] = this.getHTML('span#NUTRIENT_23') + this.getHTML('span#UNIT_NUTRIENT_23');
		saturatedFatsInfo['16:00']= this.getHTML('span#NUTRIENT_24') + this.getHTML('span#UNIT_NUTRIENT_24');
		saturatedFatsInfo['17:00'] = this.getHTML('span#NUTRIENT_25') + this.getHTML('span#UNIT_NUTRIENT_25');
		saturatedFatsInfo['18:00'] = this.getHTML('span#NUTRIENT_26') + this.getHTML('span#UNIT_NUTRIENT_26');
		saturatedFatsInfo['19:00'] = this.getHTML('span#NUTRIENT_27') + this.getHTML('span#UNIT_NUTRIENT_27');
		saturatedFatsInfo['20:00'] = this.getHTML('span#NUTRIENT_28') + this.getHTML('span#UNIT_NUTRIENT_28');
		saturatedFatsInfo['22:00'] = this.getHTML('span#NUTRIENT_29') + this.getHTML('span#UNIT_NUTRIENT_29');
		saturatedFatsInfo['24:00:00'] = this.getHTML('span#NUTRIENT_30') + this.getHTML('span#UNIT_NUTRIENT_30');
		fatsInfo.saturatedFats = saturatedFatsInfo;

		monoUnsaturatedFatsInfo.total = this.getHTML('span#NUTRIENT_31') + this.getHTML('span#UNIT_NUTRIENT_31');
		monoUnsaturatedFatsInfo['14.01'] = this.getHTML('span#NUTRIENT_32') + this.getHTML('span#UNIT_NUTRIENT_32');
		monoUnsaturatedFatsInfo['15.01'] = this.getHTML('span#NUTRIENT_33') + this.getHTML('span#UNIT_NUTRIENT_33');
		monoUnsaturatedFatsInfo['16.1 undifferentiated'] = this.getHTML('span#NUTRIENT_34') + this.getHTML('span#UNIT_NUTRIENT_34');
		monoUnsaturatedFatsInfo['16.1 c'] = this.getHTML('span#NUTRIENT_35') + this.getHTML('span#UNIT_NUTRIENT_35');
		monoUnsaturatedFatsInfo['16.1 t'] = this.getHTML('span#NUTRIENT_36') + this.getHTML('span#UNIT_NUTRIENT_36');
		monoUnsaturatedFatsInfo['17.01'] = this.getHTML('span#NUTRIENT_37') + this.getHTML('span#UNIT_NUTRIENT_37');
		monoUnsaturatedFatsInfo['18.1 undifferentiated'] = this.getHTML('span#NUTRIENT_38') + this.getHTML('span#UNIT_NUTRIENT_38');
		monoUnsaturatedFatsInfo['18.1 c'] = this.getHTML('span#NUTRIENT_39') + this.getHTML('span#UNIT_NUTRIENT_39');
		monoUnsaturatedFatsInfo['18.1 t'] = this.getHTML('span#NUTRIENT_40') + this.getHTML('span#UNIT_NUTRIENT_40');
		monoUnsaturatedFatsInfo['20:01'] = this.getHTML('span#NUTRIENT_41') + this.getHTML('span#UNIT_NUTRIENT_41');
		monoUnsaturatedFatsInfo['22:1 undifferentiated'] = this.getHTML('span#NUTRIENT_42') + this.getHTML('span#UNIT_NUTRIENT_42');
		monoUnsaturatedFatsInfo['22:1 c'] = this.getHTML('span#NUTRIENT_43') + this.getHTML('span#UNIT_NUTRIENT_43');
		monoUnsaturatedFatsInfo['22:1 t'] = this.getHTML('span#NUTRIENT_44') + this.getHTML('span#UNIT_NUTRIENT_44');
		monoUnsaturatedFatsInfo['24:1 c'] = this.getHTML('span#NUTRIENT_45') + this.getHTML('span#UNIT_NUTRIENT_45');
		fatsInfo.monoUnsaturatedFats = monoUnsaturatedFatsInfo;

		polyUnsaturatedFatsInfo.total = this.getHTML('span#NUTRIENT_46') + this.getHTML('span#UNIT_NUTRIENT_46');
		polyUnsaturatedFatsInfo['16:2 undifferentiated'] = this.getHTML('span#NUTRIENT_47') + this.getHTML('span#UNIT_NUTRIENT_47');
		polyUnsaturatedFatsInfo['18:2 undifferentiated'] = this.getHTML('span#NUTRIENT_48') + this.getHTML('span#UNIT_NUTRIENT_48');
		polyUnsaturatedFatsInfo['18:2 n-6 c,c'] = this.getHTML('span#NUTRIENT_49') + this.getHTML('span#UNIT_NUTRIENT_49');
		polyUnsaturatedFatsInfo['18:2 c,t'] = this.getHTML('span#NUTRIENT_50') + this.getHTML('span#UNIT_NUTRIENT_50');
		polyUnsaturatedFatsInfo['18:2 t,c'] = this.getHTML('span#NUTRIENT_51') + this.getHTML('span#UNIT_NUTRIENT_51');
		polyUnsaturatedFatsInfo['18:2 t,t'] = this.getHTML('span#NUTRIENT_52') + this.getHTML('span#UNIT_NUTRIENT_52');
		polyUnsaturatedFatsInfo['18:2 i'] = this.getHTML('span#NUTRIENT_53') + this.getHTML('span#UNIT_NUTRIENT_53');
		polyUnsaturatedFatsInfo['18:2 t not further defined'] = this.getHTML('span#NUTRIENT_54') + this.getHTML('span#UNIT_NUTRIENT_54');
		polyUnsaturatedFatsInfo['18:03'] = this.getHTML('span#NUTRIENT_55') + this.getHTML('span#UNIT_NUTRIENT_55');
		polyUnsaturatedFatsInfo['18:3 n-3, c,c,c'] = this.getHTML('span#NUTRIENT_56') + this.getHTML('span#UNIT_NUTRIENT_56');
		polyUnsaturatedFatsInfo['18:3 n-6, c,c,c'] = this.getHTML('span#NUTRIENT_57') + this.getHTML('span#UNIT_NUTRIENT_57');
		polyUnsaturatedFatsInfo['18:4 undifferentiated'] = this.getHTML('span#NUTRIENT_58') + this.getHTML('span#UNIT_NUTRIENT_58');
		polyUnsaturatedFatsInfo['20:2 n-6 c,c'] = this.getHTML('span#NUTRIENT_59') + this.getHTML('span#UNIT_NUTRIENT_59');
		polyUnsaturatedFatsInfo['20:3 undifferentiated'] = this.getHTML('span#NUTRIENT_60') + this.getHTML('span#UNIT_NUTRIENT_60');
		polyUnsaturatedFatsInfo['20:3 n-3'] = this.getHTML('span#NUTRIENT_61') + this.getHTML('span#UNIT_NUTRIENT_61');
		polyUnsaturatedFatsInfo['20:3 n-6'] = this.getHTML('span#NUTRIENT_62') + this.getHTML('span#UNIT_NUTRIENT_62');
		polyUnsaturatedFatsInfo['20:4 undifferentiated'] = this.getHTML('span#NUTRIENT_63') + this.getHTML('span#UNIT_NUTRIENT_63');
		polyUnsaturatedFatsInfo['20:4 n-3'] = this.getHTML('span#NUTRIENT_64') + this.getHTML('span#UNIT_NUTRIENT_64');
		polyUnsaturatedFatsInfo['20:4 n-6'] = this.getHTML('span#NUTRIENT_65') + this.getHTML('span#UNIT_NUTRIENT_65');
		polyUnsaturatedFatsInfo['20:5 n-3'] = this.getHTML('span#NUTRIENT_66') + this.getHTML('span#UNIT_NUTRIENT_66');
		polyUnsaturatedFatsInfo['22:02'] = this.getHTML('span#NUTRIENT_67') + this.getHTML('span#UNIT_NUTRIENT_67');
		polyUnsaturatedFatsInfo['22:5 n-3'] = this.getHTML('span#NUTRIENT_68') + this.getHTML('span#UNIT_NUTRIENT_68');
		polyUnsaturatedFatsInfo['22:6 n-3'] = this.getHTML('span#NUTRIENT_69') + this.getHTML('span#UNIT_NUTRIENT_69');
		fatsInfo.polyUnsaturatedFats = polyUnsaturatedFatsInfo;

		fattyAcidsInfo.totalTrans = this.getHTML('span#NUTRIENT_70') + this.getHTML('span#UNIT_NUTRIENT_70');
		fattyAcidsInfo.transMonoenoic = this.getHTML('span#NUTRIENT_71') + this.getHTML('span#UNIT_NUTRIENT_71');
		fattyAcidsInfo.transPolyenoic = this.getHTML('span#NUTRIENT_72') + this.getHTML('span#UNIT_NUTRIENT_72');
		fattyAcidsInfo.omega3 = this.getHTML('span#NUTRIENT_73') + this.getHTML('span#UNIT_NUTRIENT_73');
		fattyAcidsInfo.omega6 = this.getHTML('span#NUTRIENT_74') + this.getHTML('span#UNIT_NUTRIENT_74');
		fatsInfo.fattyAcids = fattyAcidsInfo;

		fats.push(fatsInfo);
	});

	//grabbing proteins
	this.then(function() {

	});

});

casper.run()