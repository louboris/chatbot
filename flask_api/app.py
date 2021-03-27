from fuzzywuzzy import process
import pandas as pd
import numpy as np
from flask import jsonify
from flask import Flask, request

app = Flask(__name__)


df_inter = pd.read_csv("RAW_interactions.csv")
df_inter = df_inter[df_inter['rating'] >=4]
recipes = pd.read_csv('RAW_recipes.csv')
filter_recipe = pd.merge(recipes,df_inter,right_on = ['recipe_id'],left_on = ['id'],how = 'inner')
recipes = {}
output = []
for e in filter_recipe['name']:
    output.append(e)
output = list(set(output))

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/recommandation')
def recommandation():
    loveThis = request.args.get('preferences').split(" ")
    print(loveThis)
    recipes = {}
    for e in loveThis:
        match = process.extractOne(e, output)
        print(match)
        index = filter_recipe.index[filter_recipe['name'] == match[0]].tolist()
        users = []
        for i in index:
            users.append(filter_recipe.iloc[i]['user_id'])

        index_recipes = []
        for user in users:
            index_recipes.append(filter_recipe.index[filter_recipe['user_id'] == user].tolist())
        index_recipes = [item for sublist in index_recipes for item in sublist]
        for i in index_recipes:
            recipe_id = filter_recipe.iloc[i]['recipe_id']
            if(recipe_id in recipes.keys()):
                recipes[recipe_id] = recipes[recipe_id] + 1
            else:
                recipes[recipe_id] = 1
        recipes[filter_recipe.iloc[index[0]]['recipe_id']] = 0
    return jsonify({"id":str(max(recipes, key=recipes.get))})



if __name__ == "__main__":
    app.run()
