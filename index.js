const express = require('express');
require('./bot');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    //you can easily setup a more advanced frontend here
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Bot starter app listening at http://localhost:${port}`)
  })