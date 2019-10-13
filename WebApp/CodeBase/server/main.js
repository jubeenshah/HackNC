import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import Recipes from '/imports/api/recipes';
import Reviews from '/imports/api/reviews';

import reviewDataset from './interactions';

import recipeDataset from './recipes';

import nlp from 'compromise';
import natural from 'natural';

var Analyzer = natural.SentimentAnalyzer;
var stemmer = natural.PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");


var tokenizer = new natural.WordTokenizer();

Meteor.methods({

  AddRecipes(dataset) {
    //console.log(Object.keys(songset))

    dataset.map(item => {
     // console.log("Recipe:", item)
      var doc = nlp(item.description);
      let topics = {};
      doc.topics().data().map(i => {
        //console.log("Topic:", i);
        topics[i.normal.trim().toLowerCase()] = true;
      })

      var itemSteps = item.steps.replace("['", "").replace("']").split("', '");
      var itemTags = item.tags.replace("['", "").replace("']").split("', '").map(tag=>{
        return tag.replace('undefined', '')
      });
      var itemIngredients = item.ingredients.replace("['", "").replace("']").split("', '");
      var itemNutrition = item.nutrition.replace("[", "").replace("]").split(', ').map(i=>{
        return parseInt(i);
      });

      
      Meteor.call("recipes.post", {        
        recipe_id: item.id,
        name: item.name,
        description: item.description,
        minutes: item.minutes,
       tags: itemTags,
       steps:itemSteps,
        n_steps: item.n_steps,
        nutrition: itemNutrition,
       ingredients: itemIngredients,
        n_ingredients: item.n_ingredients,
        topics: Object.keys(topics).concat(natural.PorterStemmer.tokenizeAndStem(item.description))
      });
    })

    console.log("Done Building Recipe Collection.")
    return;

  },
  AddReviews(dataset) {

    dataset.map(item => {

      //console.log("Review:", item)
      var doc = nlp(item.review);
      let topics = {};
      doc.topics().data().map(i => {
        //console.log(i)
        topics[i.normal.trim().toLowerCase()] = true;
      })
      var sentiment = analyzer.getSentiment(tokenizer.tokenize(item.review));
      Meteor.call("reviews.post", {
        q_string: natural.PorterStemmer.tokenizeAndStem(item.review).join(" "),
        recipe_id: item.recipe_id,
        review: item.review,
        topics: Object.keys(topics).concat(natural.PorterStemmer.tokenizeAndStem(item.review)),
        sentiment: sentiment,
        rating: item.rating
      });
    })

    console.log("Done Building Review Collection.")
    return;

  }

});

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  var reviews = reviewDataset.getData();
  var recipes = recipeDataset.getData();


  /* console.log(reviews.results[Math.floor(Math.random() * reviews.results.length)]);
  console.log("=====================================");
  console.log(recipes.results[Math.floor(Math.random() * recipes.results.length)]); */
 
 // Meteor.call("AddRecipes", recipes.results);
 //Meteor.call("AddReviews", reviews.results); 



});
