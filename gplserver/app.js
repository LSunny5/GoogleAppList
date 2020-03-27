const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const apps = require('./appList.js');

app.use(morgan('common'));
app.use(cors());

app.get('/apps', (req, res) => {
  //get query values
  const { sort, genre = "" } = req.query;

  //function for sorting alphabetically
  compareStrings = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }

  sortList = tempArray => {
    //check for sorting by rating or name, else say no sort filter there
    if (["rating"].includes(sort)) {
      const temp = [...tempArray].sort((a, b) => {
        return a.Rating - b.Rating || compareStrings(a.App, b.App);
      });
      return res.json(temp);

      //check for app name query, if present, sort alphabetically by app name
    } else if (["name"].includes(sort)) {
      const temp = [...tempArray].sort((a, b) => {
        return compareStrings(a.App, b.App);
      });
      return res.json(temp);
    }
  }

  //initial page load, return all apps if null or none for filters
  if ((!genre && !sort) || (["none"].includes(genre) && ["none"].includes(sort)) ||
    (["none"].includes(sort) && !genre) || (["none"].includes(genre) && !sort)) {
    return res.json(apps);
  }

  //Genre search actions, search all apps with genre text
  if (genre) {
    //if genre is none then return full array
    if (["none"].includes(genre)) {
      return sortList(apps);
    }

    //filter apps based on genre type selected
    let results = apps.filter(oneApp =>
      oneApp
        .Genres
        .toLowerCase()
        .replace("&", "")
        .replace(";", " ")
        .includes(genre.toLowerCase())
    );

    //genre and sort filter applied
    if (sort) {
      if (["none"].includes(sort)) {
        return res.json(results);
      }
      return sortList(results);
    }
    return res.json(results);
  }
  
  //sort if genre is null
  if (sort && !genre) {
    return sortList(apps);
  }

});

module.exports = app;