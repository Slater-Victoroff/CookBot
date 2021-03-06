var casper = require('casper').create();
var fs = require('fs');

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
var others = new Array(); 

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
		fattyAcidsInfo.transPolyenoic = this.getHTML('span#NUTRIENT_132') + this.getHTML('span#UNIT_NUTRIENT_132');
		fattyAcidsInfo.omega3 = this.getHTML('span#NUTRIENT_139') + this.getHTML('span#UNIT_NUTRIENT_139');
		fattyAcidsInfo.omega6 = this.getHTML('span#NUTRIENT_140') + this.getHTML('span#UNIT_NUTRIENT_140');
		fatsInfo.fattyAcids = fattyAcidsInfo;

		fats.push(fatsInfo);
	});

	//grabbing proteins
	this.then(function() {
		var proteinInfo = new Object();
		proteinInfo.total = this.getHTML('span#NUTRIENT_77') + this.getHTML('span#UNIT_NUTRIENT_77');
		proteinInfo.tryptophan = this.getHTML('span#NUTRIENT_78') + this.getHTML('span#UNIT_NUTRIENT_78');
		proteinInfo.threonine = this.getHTML('span#NUTRIENT_79') + this.getHTML('span#UNIT_NUTRIENT_79');
		proteinInfo.isoleucine = this.getHTML('span#NUTRIENT_80') + this.getHTML('span#UNIT_NUTRIENT_80');
		proteinInfo.leucine = this.getHTML('span#NUTRIENT_81') + this.getHTML('span#UNIT_NUTRIENT_81');
		proteinInfo.lysine = this.getHTML('span#NUTRIENT_82') + this.getHTML('span#UNIT_NUTRIENT_82');
		proteinInfo.methionine = this.getHTML('span#NUTRIENT_83') + this.getHTML('span#UNIT_NUTRIENT_83');
		proteinInfo.cystine = this.getHTML('span#NUTRIENT_84') + this.getHTML('span#UNIT_NUTRIENT_84');
		proteinInfo.phenylalanine = this.getHTML('span#NUTRIENT_85') + this.getHTML('span#UNIT_NUTRIENT_85');
		proteinInfo.tyrosine = this.getHTML('span#NUTRIENT_86') + this.getHTML('span#UNIT_NUTRIENT_86');
		proteinInfo.valine = this.getHTML('span#NUTRIENT_87') + this.getHTML('span#UNIT_NUTRIENT_87');
		proteinInfo.arginine = this.getHTML('span#NUTRIENT_88') + this.getHTML('span#UNIT_NUTRIENT_88');
		proteinInfo.histidine = this.getHTML('span#NUTRIENT_89') + this.getHTML('span#UNIT_NUTRIENT_89');
		proteinInfo.alanine = this.getHTML('span#NUTRIENT_90') + this.getHTML('span#UNIT_NUTRIENT_90');
		proteinInfo.asparticAcid = this.getHTML('span#NUTRIENT_91') + this.getHTML('span#UNIT_NUTRIENT_91');
		proteinInfo.glutamicAcid = this.getHTML('span#NUTRIENT_92') + this.getHTML('span#UNIT_NUTRIENT_92');
		proteinInfo.glycine = this.getHTML('span#NUTRIENT_93') + this.getHTML('span#UNIT_NUTRIENT_93');
		proteinInfo.proline = this.getHTML('span#NUTRIENT_94') + this.getHTML('span#UNIT_NUTRIENT_94');
		proteinInfo.serine = this.getHTML('span#NUTRIENT_95') + this.getHTML('span#UNIT_NUTRIENT_95');
		proteinInfo.hydroxyproline = this.getHTML('span#NUTRIENT_96') + this.getHTML('span#UNIT_NUTRIENT_96');
		proteins.push(proteinInfo);
	}); 

	//grabbing vitamins
	this.then(function(){
		var vitaminInfo = new Object();
		var vitaminA = new Object();
		var vitaminE = new Object();
		var vitaminB = new Object();
		var folate = new Object();

		vitaminA.total = this.getHTML('span#NUTRIENT_97') + this.getHTML('span#UNIT_NUTRIENT_97');
		vitaminA.retinol = this.getHTML('span#NUTRIENT_98') + this.getHTML('span#UNIT_NUTRIENT_98');
		vitaminA.retinolEquivalent = this.getHTML('span#NUTRIENT_99') + this.getHTML('span#UNIT_NUTRIENT_99');
		vitaminA.alphaCarotene = this.getHTML('span#NUTRIENT_133') + this.getHTML('span#UNIT_NUTRIENT_133'); 
		vitaminA.betaCarotene = this.getHTML('span#NUTRIENT_134') + this.getHTML('span#UNIT_NUTRIENT_134');
		vitaminA.betaCryptoxanthin = this.getHTML('span#NUTRIENT_135') + this.getHTML('span#UNIT_NUTRIENT_135');
		vitaminA.lycopene = this.getHTML('span#NUTRIENT_136') + this.getHTML('span#UNIT_NUTRIENT_136');
		vitaminA.luteinZeaxanthin = this.getHTML('span#NUTRIENT_137') + this.getHTML('span#UNIT_NUTRIENT_137');
		vitaminInfo.a = vitaminA;

		vitaminInfo.c = this.getHTML('span#NUTRIENT_100') + this.getHTML('span#UNIT_NUTRIENT_100');
		vitaminInfo.d = this.getHTML('span#NUTRIENT_101') + this.getHTML('span#UNIT_NUTRIENT_101');
		vitaminE.alpha = this.getHTML('span#NUTRIENT_102') + this.getHTML('span#UNIT_NUTRIENT_102');
		vitaminE.beta = this.getHTML('span#NUTRIENT_104') + this.getHTML('span#UNIT_NUTRIENT_104');
		vitaminE.gamma = this.getHTML('span#NUTRIENT_105') + this.getHTML('span#UNIT_NUTRIENT_105');
		vitaminE.delta = this.getHTML('span#NUTRIENT_106') + this.getHTML('span#UNIT_NUTRIENT_106');
		vitaminInfo.e = vitaminE;

		vitaminInfo.k = this.getHTML('span#NUTRIENT_103') + this.getHTML('span#UNIT_NUTRIENT_103');
		vitaminB['1'] = this.getHTML('span#NUTRIENT_107') + this.getHTML('span#UNIT_NUTRIENT_107');
		vitaminB['2'] = this.getHTML('span#NUTRIENT_108') + this.getHTML('span#UNIT_NUTRIENT_108');
		vitaminB['3'] = this.getHTML('span#NUTRIENT_109') + this.getHTML('span#UNIT_NUTRIENT_109');
		vitaminB['6'] = this.getHTML('span#NUTRIENT_110') + this.getHTML('span#UNIT_NUTRIENT_110');
		vitaminB['5'] = this.getHTML('span#NUTRIENT_116') + this.getHTML('span#UNIT_NUTRIENT_116');
	
		folate.total = this.getHTML('span#NUTRIENT_111') + this.getHTML('span#UNIT_NUTRIENT_111');
		folate.foodFolate = this.getHTML('span#NUTRIENT_112') + this.getHTML('span#UNIT_NUTRIENT_112');
		folate.folicAcid = this.getHTML('span#NUTRIENT_113') + this.getHTML('span#UNIT_NUTRIENT_113');
		folate.folateEquivalent = this.getHTML('span#NUTRIENT_114') + this.getHTML('span#UNIT_NUTRIENT_114');

		vitaminB['9'] = folate;
		vitaminB['12'] = this.getHTML('span#NUTRIENT_115') + this.getHTML('span#UNIT_NUTRIENT_115');
		vitaminInfo.b = vitaminB;

		vitaminInfo.choline = this.getHTML('span#NUTRIENT_143') + this.getHTML('span#UNIT_NUTRIENT_143');
		vitaminInfo.betaine = this.getHTML('span#NUTRIENT_144') + this.getHTML('span#UNIT_NUTRIENT_144');
		vitamins.push(vitaminInfo);
	});
	
	//grab minerals
	this.then(function(){
		var mineralInfo = new Object();
		mineralInfo.calcium = this.getHTML('span#NUTRIENT_117') + this.getHTML('span#UNIT_NUTRIENT_117');
		mineralInfo.iron = this.getHTML('span#NUTRIENT_118') + this.getHTML('span#UNIT_NUTRIENT_118');
		mineralInfo.magnesium = this.getHTML('span#NUTRIENT_119') + this.getHTML('span#UNIT_NUTRIENT_119');
		mineralInfo.phosphorous = this.getHTML('span#NUTRIENT_120') + this.getHTML('span#UNIT_NUTRIENT_120');
		mineralInfo.potassium = this.getHTML('span#NUTRIENT_121') + this.getHTML('span#UNIT_NUTRIENT_121');
		mineralInfo.sodium = this.getHTML('span#NUTRIENT_122') + this.getHTML('span#UNIT_NUTRIENT_122');
		mineralInfo.zinc = this.getHTML('span#NUTRIENT_123') + this.getHTML('span#UNIT_NUTRIENT_123');
		mineralInfo.copper = this.getHTML('span#NUTRIENT_124') + this.getHTML('span#UNIT_NUTRIENT_124');
		mineralInfo.manganese = this.getHTML('span#NUTRIENT_125') + this.getHTML('span#UNIT_NUTRIENT_125');
		mineralInfo.selenium = this.getHTML('span#NUTRIENT_126') + this.getHTML('span#UNIT_NUTRIENT_126');
		mineralInfo.fluoride = this.getHTML('span#NUTRIENT_145') + this.getHTML('span#UNIT_NUTRIENT_145');
		minerals.push(mineralInfo);
	});

	//grab sterols
	this.then(function(){
		var sterolInfo = new Object();
		var phytosterol = new Object();
		sterolInfo.cholesterol = this.getHTML('span#NUTRIENT_72') + this.getHTML('span#UNIT_NUTRIENT_72');

		phytosterol.total = this.getHTML('span#NUTRIENT_73') + this.getHTML('span#UNIT_NUTRIENT_73');
		phytosterol.campesterol = this.getHTML('span#NUTRIENT_74') + this.getHTML('span#UNIT_NUTRIENT_74');
		phytosterol.stigmasterol = this.getHTML('span#NUTRIENT_75') + this.getHTML('span#UNIT_NUTRIENT_75');
		phytosterol.betaSitosterol = this.getHTML('span#NUTRIENT_76') + this.getHTML('span#UNIT_NUTRIENT_76');

		sterolInfo.phytosterol = phytosterol;
		
		sterols.push(sterolInfo);
	});

	//grabbing other things
	this.then(function(){
		var other = Object();
		other.alcohol = this.getHTML('span#NUTRIENT_127') + this.getHTML('span#UNIT_NUTRIENT_127');
		other.water = this.getHTML('span#NUTRIENT_128') + this.getHTML('span#UNIT_NUTRIENT_128');
		other.ash = this.getHTML('span#NUTRIENT_129') + this.getHTML('span#UNIT_NUTRIENT_129');
		other.caffeine = this.getHTML('span#NUTRIENT_130') + this.getHTML('span#UNIT_NUTRIENT_130');
		other.theobromine = this.getHTML('span#NUTRIENT_131') + this.getHTML('span#UNIT_NUTRIENT_131');
		others.push(other);
	});
});

casper.run(function() {
	var path = "/home/svictoroff/Documents/SelfImprovement/cookBot/casper/foodData.json";
	var content = "";
	for (var j = 0; j < names.length; j++){
		var currentFood = new Object();
		currentFood["name"] = names[j];
		currentFood["servingSize"] = servingSizes[j];
		currentFood["calories"] = calories[j];
		currentFood["carbs"] = carbs[j];
		currentFood["fat"] = fats[j];
		currentFood["protein"] = proteins[j];
		currentFood["vitamins"] = vitamins[j];
		currentFood["minerals"] = minerals[j];
		currentFood["sterols"] = minerals[j];
		currentFood["other"] = others[j];
		content += JSON.stringify(currentFood) + "\n";
	};
	fs.write(path,content,'w');
	this.exit();
});