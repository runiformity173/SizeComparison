import os
import re
import json

# name, size, description
multipliers = {
    'Ym': 1e24, 'Zm': 1e21, 'Em': 1e18, 'Pm': 1e15, 'Tm': 1e12,
    'Gm': 1e9, 'Mm': 1e6, 'km': 1e3, 'm': 1, 'cm': 1e-2,
    'mm': 1e-3, 'μm': 1e-6, 'nm': 1e-9, 'pm': 1e-12,
    'fm': 1e-15, 'am': 1e-18
}

# Convert size string to float value in meters
def parse_length(length):
    length = length.replace(',', '').replace(' ', '')
    if 'e' in length or '<' in length or '(' in length:
        return float('-inf')
    match = re.fullmatch(r'([0-9.]+)([a-zA-Zμ]+)', length)
    if not match:
        return float('-inf')
    value, unit = match.groups()
    return float(value) * multipliers.get(unit, float('-inf'))

directory = os.fsencode(".\\images")
data = {}
with open("test.json","r") as fl:
    data = json.load(fl)
# 1.7fm, 1mm, 1Zm, 3Ym
i = -1
pairs = [[data[j][1],(i:=i+1)] for _,j in enumerate(data.keys()) if j not in ["done","skips","objects"]]
print(pairs)
pairs.sort(key = lambda x:parse_length(x[0]))
[print(str(i)+",")for i in pairs]
exit()
if "skips" not in data:
    data["skips"] = []
print(len(data["done"]))
for file in os.listdir(directory):
    filename = os.fsdecode(file)
    if filename.endswith(".svg"): 
        fileName = os.path.join(os.fsdecode(directory), filename)
        if fileName in data["done"] or fileName in data["skips"]:continue
        print(fileName)
        with open(fileName,"r",encoding="utf-8") as fl:
            a = fl.read()
        *results, = re.finditer("<tspan[^>]+>([^<]*)</tspan>",a)
        print([result.group(1) for result in results])
        b = input()
        if b == "skip":
            data["skips"].append(fileName)
            with open("test.json","w") as fl:
                json.dump(data,fl)
            continue
        order = list(map(int,b.split()))
        extra = []
        for i in range(2,len(order)):
            extra.append(results[order[i]].group(1))
        data[results[order[0]].group(1)] = [results[order[0]].group(1), results[order[1]].group(1), "|".join(extra) ,fileName]
        data["done"].append(fileName)
        for i in sorted(results,key=lambda x:x.start(),reverse=True):
            a = a[:i.start()] + a[i.end():]
        with open(fileName,"w",encoding="utf-8") as fl:
            fl.write(a)
        with open("test.json","w") as fl:
            json.dump(data,fl)
    else:
        continue