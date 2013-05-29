import json

class Foods:
	def __init__(self):
		self.data = {}

	def addFood(self, basicInfo, units):
		"""basicInfo should be (int)ID:(string)name, units is a string for the used units"""
		foodData = {"name":basicInfo[1]}
		foodData["units"] = units
		self.data[basicInfo[0]] = foodData

class Cholines:
	def __init__(self):
		self.data = {}

	def addCholine(self, basicInfo):
		"""basicInfo should be (int)ID:(string)name"""
		self.data[basicInfo[0]] = basicInfo[1]
		
def parseAll(nameFile, legendFile, dataFile, outputFile="CholineData/choline.json", units = "mg"):
	allFoods = Foods()
	cholines = Cholines()
	#Getting all Food names
	with open(nameFile) as names:
		for line in names:
			fields = line.split("~^~") 
			uuid = int(fields[0][1:])
			name = fields[2][:-3]
			allFoods.addFood([uuid, name], units)

	#Getting all the different kinds of Cholines
	with open(legendFile) as cholineData:
		for line in cholineData:
			fields = line.split("~^~")
			uuid = int(fields[0][1:])
			name = fields[1]
			cholines.addCholine([uuid, name])

	#Mapping one to the other
	with open(dataFile) as realData:
		for line in realData:
			line = line.replace("~","")
			fields = line.split("^")
			nutrient = cholines.data[int(fields[1])]
			amount = float(fields[2])
			allFoods.data[int(fields[0])][nutrient] = amount

	#Write the JSON data back out into a file
	with open(outputFile, 'w') as dataDump:
		for key in allFoods.data:
			entry = {}
			entry[key] = allFoods.data[key]
			dataDump.write(json.dumps(entry))
			dataDump.write("\n")

baseFile = "CholineData/"
nameFile = baseFile + "FOOD_DES.txt"
legendFile = baseFile + "NUTR_DEF.txt"
dataFile = baseFile + "NUT_DATA.txt"

parseAll(nameFile, legendFile, dataFile)