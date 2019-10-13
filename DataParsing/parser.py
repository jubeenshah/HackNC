import json
import csv
f = open( './Data/RAW_interactions_sample_750000.csv', 'rU' )  
reader = csv.DictReader( f, fieldnames = ( "name","id","minutes","contributor_id","submitted","tags","nutrition","n_steps","steps","description","ingredients","n_ingredients"))  
out = json.dumps( [ row for row in reader ] )  
print ("JSON parsed!") 
f = open( './Data/RAW_interactions_sample_750000.json', 'w')  
f.write(out)  
print ("JSON saved!")  