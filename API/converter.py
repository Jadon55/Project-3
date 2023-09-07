import csv
import json

csv_file = 'All-Presaved.csv'
data = []

with open(csv_file, mode='r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        data.append(row)

json_file = 'All-Presaved.json'

with open(json_file, mode='w') as file:
    json.dump(data, file, indent=4)
