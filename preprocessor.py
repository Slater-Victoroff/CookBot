def nutrients(start, end):
	valueBase = "this.getHTML('span#NUTRIENT_"
	unitBase = "') + this.getHTML('span#UNIT_NUTRIENT_"
	endcap = "');"
	for i in range(start,end+1):
		print valueBase + str(i) + unitBase + str(i) + endcap

nutrients(77, 96)
