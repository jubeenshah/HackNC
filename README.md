<p align="center"> 
<img src="./Website%20Design/Logo.png" height="240" width="320">
</p>

# Crave Ai

## What it does
The project does *sentiment analysis* on the user's input and the reviews from the available data on food recipe reviews, and tries to give the Mose optimal results possible of recipes to the users based off of their choices and or mood.  We use database of about `10,000` food recipes and `25,000` food reviews. The user also has the ability to search for recipes directly if they choose to do so. 

## How we built it

Initially we used python to clean up the data and take only a sample of the 250,000 food recipes and 1.2 million reviews for the recipes from the [`Food.com`](https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions) dataset. Once we cleaned up the data, took a good representative sample from the original dataset, we started to build our model from which we would *recommend* recipes to the user. 

We primarily used Javascript for both front end and backend to setup the entire search engine and sentiment analysis for the reviews from the dataset

## Challenges we ran into
We ran into a lot of challenges especially while searching and filtering because of the several tags that were available with the dataset. We also ran into some problems concerning the size of the data itself, which, since we were not using a cloud platform for development, led us to significantly reduce the data size that we could build the model from. Even yet, the project does a good job of giving good recommendations to the user based off of his mood.

## Accomplishments that we're proud of
We are especially proud of the scale to which were able to expand out our project. Considering the scale of the `tags` that were available to us, selecting a sample representative dataset, sentiment analysis, learning new tools like `meteor.js`, `mongo-db`, `natural language tool kit` and the overall effort that everyone put in, considering that for 3 of us were attending our very first Hackathon. 

## What we learned
We learned a lot about different frameworks, working with UI, a full stack development process, finding and debugging, which could potentially be a major part of any project, and team-building and collaboration in general. We would like to take this opportunity to not only thank `HackNC` but to all the participants for being so friendly, and also the sponsors for giving students like us a chance to participate in such a competitive event.

## What's next for CraveAi
There are several routes that we wish that we could've taken with `CraveAi` during this hackathon. Things like integration of social media api, to get top trending food recipes, and advanced search for the user to delve deeper into the entire search and customization process, and also building a user model that could potentially serve as a recommendation system considering user behavior and patterns. We would love to continue working on the project, and are in talks with each other about potential extensions to it. 
