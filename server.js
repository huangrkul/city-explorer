'use strict';

const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001; //reading port 3000 from .env
const cors = require('cors');

app.use(cors());

app.get('/', (request, response) => response.send('Hello World!'))
app.get('*',(request, response) => {
  response.status(404).send('not found');
})

app.listen(PORT, () => console.log(`app is listening on port ${PORT}!`))
