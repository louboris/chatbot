'use strict';

const { SSL_OP_CISCO_ANYCONNECT } = require('constants');
const Readline = require('readline') ;
const telegram = require('node-telegram-bot-api');

const token = '1361813271:AAGGktMo3PJC14-Q0pbTvZb5EvwgN-w73Tk';
const bot = new telegram(token, {polling: true});

const matcher = require('./matcher');
const getRecipe = require('./recipeAPI');
const getRecommandation = require('./recommandation');

// Enregistrement client en cours
let clientEnCours = {};

// Fin client en cours

let foodRandom = ["Fish and chips",
"Sandwich",
"Pita",
"Hamburger",
"Fried chicken",
"French fries",
"Onion ring",
"Chicken nugget",
"Taco",
"Pizza",
"Hot dog",
"Ice cream",
"Salad",
"White bread",
"Wheat bread",
"Whole grain bread",
"Rye bread",
"Hot dog bun",
"Hamburger bun",
"Croissant",
"Swiss roll",
"Pretzel",
"Bagels",
"Donut",
"Rolls",
"Breadsticks",
"French bread",
"Apple",
"Watermelon",
"Orange",
"Pear",
"Cherry",
"Strawberry",
"Nectarine",
"Grape",
"Mango",
"Blueberry",
"Pomegranate",
"Carambola",
"Plum",
"Banana",
"Raspberry",
"Mandarin",
"Jackfruit",
"Papaya",
"Kiwi",
"Pineapple",
"Lime",
"Lemon",
"Apricot"]


let mealtypeRandom = ["Breakfast","Lunch","Dinner","Snack"];

//Return a random iteme from a array 
Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
  }

bot.on('message', reply => {
    const chatId = reply.chat.id;
    console.log(reply)

    matcher(reply.text, cb =>{
        switch(cb.intent){
            case 'Hello':
                bot.sendMessage(reply.chat.id, `Hello ${reply.chat.first_name}!`);
                break;
            case 'Exit':
                bot.sendMessage(reply.chat.id, "Bye bye!");
                db.close(); // ICI
                break;

            case 'name':
                console.log('name');
                break;
            case 'food':
                bot.sendMessage(chatId, "Do you have any allergie or something you don't like?");
                clientEnCours[chatId]=cb.entities.food;
                console.log(clientEnCours);
                break;
            
            case 'allergie':
                bot.sendMessage(chatId, cb.entities.aliment);
                break;
            
            case 'meal':
                bot.sendMessage(chatId,"Here is a recipe for " +cb.entities.meal + ".");
                getRecipe(foodRandom.sample(),undefined,cb.entities.meal).then((result) => {
                    bot.sendMessage(chatId,foodRandom.sample())
                    bot.sendPhoto(chatId, result.hits[0].recipe.image)
                    bot.sendMessage(chatId, "• " +result.hits[0].recipe.ingredientLines.join("\n• "))
                    //(result.hits[0].recipe)
                    let message = `[Click here to get the full recipe](${result.hits[0].recipe.url})`;
                    bot.sendMessage(chatId, message, { parse_mode: "Markdown" })   
                });
                break;
            case 'reco':
                console.log('rec')
                getRecommandation(cb.entities.reco)
                .then(result => {
                    console.log(result);
                    let uri = `https://www.food.com/recipe/bla-${result.id}`
                    let message = `[Click here to get the recommended recipe](${uri})`
                    bot.sendMessage(chatId, message,{ parse_mode: "Markdown" })});
                break;
            case 'mealTypeFood':
                bot.sendMessage(chatId,cb.entities.meal);
                getRecipe(cb.entities.food,undefined,cb.entities.meal).then((result) => {
                            
                    bot.sendPhoto(chatId, result.hits[0].recipe.image)
                    bot.sendMessage(chatId, "• " +result.hits[0].recipe.ingredientLines.join("\n• "))
                    //(result.hits[0].recipe)
                    let message = `[Click here to get the full recipe](${result.hits[0].recipe.url})`;
                    bot.sendMessage(chatId, message, { parse_mode: "Markdown" })   
                });
                break;

            default:
                console.log(clientEnCours);
                if(chatId in clientEnCours) {
                    
                    if(reply.text == "No"){
                        //clientEnCours = clientEnCours.filter(item => item !== chatId)
                        console.log(clientEnCours);
                        console.log("Ok.");
                        
                        getRecipe(clientEnCours[chatId], undefined, undefined).then((result) => {
                            
                            bot.sendPhoto(chatId, result.hits[0].recipe.image)
                            bot.sendMessage(chatId, "• " +result.hits[0].recipe.ingredientLines.join("\n• "))
                            //(result.hits[0].recipe)
                            let message = `[Click here to get the full recipe](${result.hits[0].recipe.url})`;
                            bot.sendMessage(chatId, message, { parse_mode: "Markdown" })
                            
                        });
                    }
                    else {
                        getRecipe(clientEnCours[chatId], reply.text, undefined).then((result) => {
                            bot.sendPhoto(chatId, result.hits[0].recipe.image)
                            bot.sendMessage(chatId, "• " +result.hits[0].recipe.ingredientLines.join("\n• "))
                            //(result.hits[0].recipe)
                            let message = `[Click here to get the full recipe](${result.hits[0].recipe.url})`;
                            bot.sendMessage(chatId, message, { parse_mode: "Markdown" })
                            
                        });

                    }
                }
                else{
                    bot.sendMessage(reply.chat.id, "I don't understand.");
                }
                
        }
        
    })
})