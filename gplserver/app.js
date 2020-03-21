const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const apps = require('./appList.js');

app.use(morgan('common')); 
app.use(cors());

app.get('/apps', (req, res) => {
    const { sort, appGenre = "" } = req.query;

    //sort apps by rating or app
    if (sort) {
      if (!['Rating', 'App'].includes(sort)) {
        return res
          .status(400)
          .send('No sort filter applied...')


      }
    }

    if (sort) {
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }




    //filter for genres
    let results = apps
        .filter(googleApp =>
            googleApp
              .Genres
              .includes(appGenre));
              //.toLowerCase()
              //.includes(search.toLowerCase()));




    res
       .json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});