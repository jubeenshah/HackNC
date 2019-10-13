
import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';


import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Grid from "@material-ui/core/Grid";
import Nav from './Nav';
import LoadingPage from './LoadingPage';
import Home from './Home';

import { debounce } from 'lodash';






const AppTheme = createMuiTheme({
  palette: {
    type: 'dark'
  },
});

function randomString(length) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(
    ""
  );

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  var str = "";
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

export default class App extends Component {
  constructor() {
    super()


    // Delay action 2 seconds
    this.onSearchChangeDebounced = debounce(this.onSearchChangeDebounced, 650)
    this.loadRecipeSuggestions();

  }

 

  loadRecipeSuggestions(){
    this.recipesApi({
      params: {
        getNames: [{ q: "" }]
      }
    }).then(res => {
      console.log("Loaded Recipe Suggestions: ", res)
      var contentdata = this.state.contentdata;

      var targetPage = contentdata.home;
      targetPage.data["recipe_suggestions"] = res;
      contentdata.home = targetPage;

      this.setState({
        contentdata: contentdata
      });
    })
  }

  recipesApi = request => {


    console.log("Recipes api: ", request);

    const api = {      
      getNames: (obj) => {
        
        //Send Post
        return new Promise((resolve, reject) => {
          Meteor.call("recipes.getNames", {}, (error, result) => {
            if (error) {
              console.log(error.reason);
              reject();

            }


            resolve(result);
          });
        })
      },


    };

    var promises = [];
    Object.keys(request.params).map(param => {
      request.params[param].map(obj => {
        promises.push(api[param](obj));
      });
    });

    return Promise.all(promises).then(res => {
      console.log("API request completed.");
      return res;
    });
  };

  









  //Wait for type to stop trigger

  onSearchChangeDebounced = (q, p) => {
    // Delayed logic goes here
    if (q.length > 0) {



    }
  }

  onSearchChangeInstant = (q, p) => {
    // Delayed logic goes here
    if (q.length > 0) {


    }
  }




  //-----------------------------------------Handlers---------------------------------------------------------------
  switchView = (p) => {

    this.setState({
      current_view: p
    }

    )

  }






  //------------------------------------------------------------------------------------------------------------------------


  state = {

    current_view: "home",

    contentdata: {
      nav: {
        data: {},
        handlers: {
          switchView: this.switchView

        }
      },

      //----------Home------------
      home: {
        loading: false,
        data: {},
        jsx: Home,
        handlers: {
          switchView: this.switchView

        }
      },




      server_page: {
        loading: true,
        server: null
      }


    }
  };


  render() {
    var viewString = this.state.current_view;
    var CurrentView = this.state.contentdata[viewString].jsx;
    var viewLoading = this.state.contentdata[viewString].loading;
    var viewData = this.state.contentdata[viewString].data;
    var viewHandlers = this.state.contentdata[viewString].handlers;

    var navData = this.state.contentdata.nav.data;
    var navHandlers = this.state.contentdata.nav.handlers;



    return (
      <Grid container alignItems="center" justify="center" spacing={0}>
        <Grid item xs={12}>
          <Nav data={navData} {...navHandlers} />
        </Grid>
        {viewLoading ? <Grid item xs={12}>
          <LoadingPage />
        </Grid> : <Grid item xs={12}>
            <CurrentView data={viewData} {...viewHandlers} />
          </Grid>}

      </Grid>
    );
  }
}


