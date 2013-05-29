def usda_fields(raw_string):
	return [word.translate(None, '~') for word in raw_string.split('^')]

def basic_mapping(input_file):
	"""Returns a dict mapping the first field to the second field"""
	with open(input_file, 'rb') as raw_data:
		data = {usda_fields(line)[0]: usda_fields(line)[1].strip() for line in raw_data}
	return data

def raw_food_map(raw_string):
	"""creates a dictionary for a single food entry"""
	names = ["id", "food_group", "name"]
	fields = usda_fields(raw_string)
	return {names[i]: fields[i] for i in range(0,len(names))}

def list_mapping(input_file):
	"""Assumes that each key should be mapped to an array of values"""
	with open(input_file, 'rb') as raw_data:
		data = {}
		for line in raw_data:
			fields = usda_fields(line)
			if fields[0] in data:
				data[fields[0]].append(fields[1].strip())
			else:
				data[fields[0]] = [fields[1].strip()]
	return data

class FoodGroups:

	def __init__(self, input_file="sr25/FD_GROUP.txt"):
		self.data = basic_mapping(input_file)

class FoodDescriptions:

	def __init__(self, input_file="sr25/LANGDESC.txt"):
		self.data = basic_mapping(input_file)

class FoodDescriptionMappings:
	def __init__(self, food_descriptions=FoodDescriptions(), input_file="sr25/LANGUAL.txt"):
		basic_map = list_mapping(input_file)
		self.data = {key: [food_descriptions.data[entry] for entry in basic_map[key]] for key in basic_map}

class Foods:

	def __init__(self, input_file="sr25/FOOD_DES.txt"):
		self.current_mappings = [raw_food_map(line) for line in open(input_file, 'rb')]

	def _map_food_groups(self, food_group=FoodGroups()):
		for entry in self.current_mappings:
			entry['food_group'] = food_group.data[entry['food_group']]

	def _map_food_descriptions(self, desciption_mappings=FoodDescriptionMappings()):
		for entry in self.current_mappings:
			#Not all food have description mappings for some reason, blame the gob
			try:
				entry['descriptions'] = desciption_mappings.data[entry['id']]
			except KeyError:
				pass


foods = Foods()
foods._map_food_groups()
foods._map_food_descriptions()
print foods.current_mappings

