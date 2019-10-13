import { Mongo } from 'meteor/mongo';

export default Reviews = new Mongo.Collection('reviews');
import natural from 'natural';

var tokenizer = new natural.WordTokenizer();
Meteor.methods({
  
    "reviews.post"(data){
        var foundReview = Reviews.findOne({ q_string: data.q_string});

        if (foundReview) {
            console.log("Review already exists.")
     
        }else{
            Reviews.insert(data);
            console.log("New Review: ", data.recipe_id ,Object.keys(data))
                
                

        }


    }
});

