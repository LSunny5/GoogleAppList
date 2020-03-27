const app = require('./app');

//check to see if server is running
app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });