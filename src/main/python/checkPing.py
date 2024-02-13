import requests

f = open('images.txt', 'r', encoding='UTF-8')

datalist = f.readlines()
for data in datalist:
	data = data.rstrip("\n")
	url = 'https://salmon-quiz.com/images/' + data
	res = requests.get(url)
	print(url)
	if '\"status\":404' in res.text:
		print("指定された画像は存在しません。")


f.close()