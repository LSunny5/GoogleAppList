const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const apps = require('./appList.js');

app.use(morgan('common'));
app.use(cors());



app.get('/apps', (req, res) => {
  //get query values
  const { sort, genre = '' } = req.query;

  //temp array for results
  let results = apps;
  let original = results;

  //function for sorting alphabetically
  compareStrings = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }

  //sort actions
  if (sort) {
    //check for sorting by rating or name, else say no sort filter there
    if (!['rating', 'name', 'none'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be either rating or App name...');
      //check for rating query, if present, sort by rating
    } else if (["none"].includes(sort)) {
      results = apps;
    }
    
    else if (["rating"].includes(sort)) {
      //sort, but also sort app name alphabetically after rating
      results.sort((a, b) => {
        return a.Rating - b.Rating || compareStrings(a.App, b.App);
      });
      //check for app name query, if present, sort alphabetically by app name
    } else if (["name"].includes(sort)) {
      results.sort((a, b) => {
        return compareStrings(a.App, b.App);
      });
      //return original list
    } 
  }

  //Genre search actions, search all apps with genre text
  if (genre) {
      results = results.filter(oneApp =>
        oneApp
          .Genres
          .toLowerCase()
          .replace("&", "")
          .replace(";", " ")
          .includes(genre.toLowerCase())
      );
    
    //check to see if there are any results in the filter used, if not return error
    if (results.length === 0) {
      return res
        .status(400)
        .send('Genre search is invalid, please choose from list...');
    }
  }

  //return the response with results
  res
    .json(results);
});

//check to see if server is running
app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});