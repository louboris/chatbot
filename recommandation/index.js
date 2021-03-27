"use strict"

const axios = require("axios");
const { reduce } = require("../patterns");


const getRecommandation = (recipes) => {
    return new Promise(async(resolve,reject) => {
        try {
      
                    let recipe = await axios.get("http://localhost:5000/recommandation", 
                    {params: { preferences: recipes
                            }});
    
                
                
                resolve(recipe.data)
            }
            catch(error){
                reject(error);

            }
        });
    }


module.exports = getRecommandation;
