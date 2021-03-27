"use strict"

const axios = require("axios");
const { reduce } = require("../patterns");
const apikey = "183f157d5b1ed82bfcb6911611a680ca";
const apiId = "551f4407";

const getRecipe = (recipeName, exclude, mealtype) => {
    console.log(exclude);
    recipeName.replace(/ /g,"%20");
    console.log(recipeName);
    return new Promise(async(resolve,reject) => {
        try {
                let recipe;
                if(exclude == undefined && mealtype == undefined) {
                    console.log(1)
                    recipe = await axios.get("https://api.edamam.com/search", 
                    {params: { q: recipeName, 
                                app_id: apiId,  
                                app_key: apikey, 
                                from: Math.floor(Math.random() * Math.floor(10))}});
    
                }
                if(exclude != undefined && mealtype == undefined) {
                    console.log(2)
                    recipe = await axios.get("https://api.edamam.com/search", 
                    {params: { q: recipeName, 
                                app_id: apiId,  
                                app_key: apikey, 
                                excluded: exclude,
                    }});

                }
                if(exclude == undefined && mealtype != undefined) {
                    console.log(3)
                    recipe = await axios.get("https://api.edamam.com/search", 
                    {params: { q: recipeName, 
                                app_id: apiId,  
                                app_key: apikey, 
                                mealType: mealtype,
                                from: Math.floor(Math.random() * Math.floor(10))}});

                }
                if(exclude != undefined && mealtype != undefined) {
                    console.log(4)
                    recipe = await axios.get("https://api.edamam.com/search", 
                    {params: { q: recipeName, 
                                app_id: apiId,  
                                app_key: apikey, 
                                mealType: mealtype,
                                excluded: exclude,
                                from: Math.floor(Math.random() * Math.floor(10))}});

                }
                
                resolve(recipe.data)
            }
            catch(error){
                reject(error);

            }
        });
    }


module.exports = getRecipe;
