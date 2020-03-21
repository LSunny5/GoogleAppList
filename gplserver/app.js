const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const apps = require('./appList.js');

app.use(morgan('common'));
app.use(cors());

app.get('/apps', (req, res) => {

  //SORTING FUNCTIONS
  const { sort } = req.query;

  //function for sorting alphabetically
  compareStrings = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }
  
  if (sort) {
    //check for sorting by rating or name, else say no sort filter there
    if (!['rating', 'name'].includes(sort)) {
      console.log('No sort filter applied');
      return res
        .status(400)
        .send('Sort must be either rating or App name...');

    //check for rating query, if present, sort by rating
    } else if (["rating"].includes(sort)) {
      //sort, but also sort app name alphabetically after rating
      apps.sort((a, b) => {
        return a.Rating - b.Rating || compareStrings(a.App, b.App);
      });
    //check for app name query, if present, sort alphabetically by app name
    } else if (["name"].includes(sort)) {
      apps.sort((a, b) => {
        return compareStrings(a.App, b.App);
      });
    }
  }




  /*  
 
 
     
 
    */


  //const tempArray = Object.keys(apps).map( key => { return apps[key];});

  //  if (sort = "Rating") {
  //  apps.sort((a, b) => {
  //  return a.Rating[sort] > a.Rating[sort] ? 1 : a.Rating[sort] < b.Rating[sort] ? -1 : 0;
  //});
  //}




  /*  const jsonAsArray = 
     .sort(function (itemA, itemB) {
       return itemA.score < itemB.score;
     }); */

  //appGenre = "" } = req.query;

  //sort apps by rating or app
  //  if (sort) {
  //   if (!['Rating', 'App'].includes(sort)) {
  //   return res
  //  .status(400)
  //   .send('No sort filter applied...')
  //}
  //}
  /* if (sort = "rating") {
    apps
      .sort((a.Rating, b.Rating) => {
        return a.Rating[sort] > a.Rating[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  } */




  //filter for genres
  // let results = apps
  //    .filter(googleApp =>
  //      googleApp
  //      .Genres
  //.includes(appGenre));
  //    .toLowerCase()
  //  .includes(search.toLowerCase()));




  res
    .json(apps);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});