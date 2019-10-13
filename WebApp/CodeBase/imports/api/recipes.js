import { Mongo } from 'meteor/mongo';

export default Recipes = new Mongo.Collection('recipes');


import nlp from 'compromise';
import natural from 'natural';

Meteor.methods({

    "recipes.post"(data) {

        var foundRecipe = Recipes.findOne({ recipe_id: data.recipe_id});

        if (foundRecipe) {
            console.log("Recipe already exists.")
     
        }else{
            Recipes.insert(data);
            console.log("New Review: ", data.recipe_id ,Object.keys(data))
                
                

        }
        

    },
    "recipes.getRecipes"(ids){
        var recipes = [];
        ids.map(id => {
            let recipe = Recipes.findOne({recipe_id: id });
            if(recipe){
                recipes.push(recipe)
            }
        })

        return recipes;

    },
    "recipes.getNames"(data){
        var names = {};
        Recipes.find({}).fetch().map(item => {
            names[item.name] = 'name';
            item.tags.map(tag=>{
                names[tag] = 'tag';
            })
        })

        return Object.keys(names).map(key=>{
            return {label: key, type:names[key]};
        })

    },
    "recipes.filterByTag"(tags){
        var recipes = [];
        Recipes.find({}).fetch().map(item => {
            
            var points = 0;
           
            for (let i = 0; i < item.tags.length; i++) {
                if(tags.includes(item.tags[i]) ){
                    points++;
                }
            }

            if (points > 0){
                recipes.push({...item, score: points})
            }
            
        })

        recipes.sort((a, b) => {
            return b.score - a.score;
        })

        return recipes;
    },

    "recipes.filterByTopic"(q){
        var recipes = [];

        var doc = nlp(q);
        let topics = {};
        doc.topics().data().map(i => {
          //console.log("Topic:", i);
          topics[i.normal.trim().toLowerCase()] = true;
        })
        topics =  Object.keys(topics).concat(natural.PorterStemmer.tokenizeAndStem(item.description));

        Recipes.find({}).fetch().map(item => {
           
            var points = 0;
           
            for (let i = 0; i < item.topics.length; i++) {
                if(topics.includes(item.topics[i]) ){
                    points++;
                }
            }

            if (points > 0){
                recipes.push({...item, score: points})
            }
            
        })

        recipes.sort((a, b) => {
            return b.score - a.score;
        })

        return recipes;
    },

});
