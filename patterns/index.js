const patternDict = [
    {
        pattern: '\\b(?<Bye>bye|exit)\\b',
        intent: 'Exit'
    },
{
    pattern: '\\b(?<greeting>Hi|Hello|Hey)\\b',
    intent: 'Hello'
},
{
    pattern: '^(?#month)\\d{1,2}/(?#day)\\d{1,2}/(?#year)(\\d{2}){1,2}',
    intent: 'date'
},
{
    pattern : '(weather\\slike\\sin\\s)(?<city>[A-Z]+[a-z]+[a-z]+?)\\s(?<time>today|tomorrow)',
    intent : "get weather"
},
{
    pattern : '(weather\\sin\\s)(?<city>[A-Z]+[a-z]+[a-z]+?)',
    intent : "weatherNow"
},
{
    pattern : '(?<situation>cold|hot|rainy|sunny)\\sin\\s(?<city>[A-Z]+[a-z]+[a-z]+?)\\s(?<time>today|tomorrow|the\\sday\\safter\\stomorrow)?',
    intent : "get weather informative"
},
{
    pattern : '(What\\sis\\sthe\\srecipe\\sof\\s)(?<food>[A-Z]+[a-z]+[a-z]+?)',
    intent : "food"
},
{
    pattern : '(My\\sname\\sis\\s)(?<name>[A-Z]+[a-z]+[a-z]+?)',
    intent : "name"
},
{
    pattern : '(I\\sdo\\snot\\seat\\s)(?<aliment>[A-Z]+[a-z]+[a-z]+?)',
    intent : "allergie"
},
{
    pattern : '(I\\sneed\\sa\\srecipe\\sfor\\s)(?<meal>[a-z]+[a-z]+[a-z]+?)(\\swith\\s)(?<food>[a-z]+[a-z]+[a-z]+?)',
    intent : "mealTypeFood"
},
{
    pattern : '(I\\sneed\\sa\\srecipe\\sfor\\s)(?<meal>[a-z]+[a-z]+[a-z]+?)',
    intent : "meal"
},
{
    pattern : '(I\\sneed\\srecommandation\\sI\\slike\\sthese\\srecipes\\s)(?<reco>(.*))',
    intent : "reco"
},
];

module.exports = patternDict;
