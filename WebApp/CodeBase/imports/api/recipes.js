import { Mongo } from 'meteor/mongo';

export default Recipes = new Mongo.Collection('recipes');

Meteor.methods({

    "recipes.post"(data) {

        Recipes.insert(data);
        console.log("New Recipe: ", data.recipe_id, Object.keys(data))

    },
    "recipes.getNames"(data){
        return Recipes.find({}).fetch().map(item => {
            return {label: item.name};
        })

    }
});
