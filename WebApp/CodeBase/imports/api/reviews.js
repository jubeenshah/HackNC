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


    },
    "review.filterByTopic"(q){
        var reviews = [];

        var doc = nlp(q);
        var topics = {};
        doc.topics().data().map(i => {
          //console.log("Topic:", i);
          topics[i.normal.trim().toLowerCase()] = true;
        });
        topics = Object.keys(topics).concat(natural.PorterStemmer.tokenizeAndStem(q));

        Reviews.find({}).fetch().map(item => {
           
            var points = 0;
           
            for (let i = 0; i < item.topics.length; i++) {
                if(topics.includes(item.topics[i]) ){
                    points++;
                }
            }

            if (points > 0){
                reviews.push({...item, score: points})
            }
            
        })

        reviews.sort((a, b) => {
            return b.score - a.score;
        })

        return reviews;
    },
});

