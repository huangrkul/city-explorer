'use strict';

//all required
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001; //reading port 3000 from .env

app.get('/location', handleLocation);

let locales = {};

function handleLocation (request, response){
  const city = request.query.data;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`;

  if( locales[url] ){
    console.log('using cache');
    response.send(locales[url]);
  } else {
    console.log('getting data from api');
    superagent.get(url)
      .then(resultsFromSuperagent => {
        // console.log(resultsFromSuperagent.body.results[0].geometry);
        const locationObj = new Location(city, resultsFromSuperagent.body.results[0]);

        // store location in the in-memory location object cache
        locales[url] = locationObj;

        response.status(200).send(locationObj);
      })
      .catch ((error) => {
        console.error(error);
        response.status(500).send('Our bad, yo.');
      })
  }
}



app.get('/weather', (request, response) => {
  try{
    const weatherData = fetchWeather();
    response.send(weatherData);
  }
  catch(error){
    console.error(error);
    response.status(500).send('server issue (500)');
  }
})

//app.get('/', (request, response) => response.send('Hello World!'))

//error msg handling for status 404
app.get('*',(request, response) => {
  //response.status(404).send('not found');
  const Error = {
    status: 500,
    responseText: 'Sorry, something went wrong'
  };
  response.send(Error);
})

//this function takes location data submitted from user query and instantiate a series of objects.
// function fetchLocation(location){
//   const geoData = require('./data/geo.json');
//   const locationObj = new Location(location, geoData);
//   return locationObj;
// }

function fetchWeather(){
  // const weatherArr = [];
  const weaData = require('./data/darksky.json');
  const weatherArr = weaData.daily.data.map(prop => {
    let weatherObj = new Weather(prop);
    return weatherObj;
  });
  return weatherArr;
}

function Location(city, geoData){
  this.search_query = city;
  this.formatted_query = geoData.formatted_address;
  this.latitude = geoData.geometry.location.lat;
  this.longitude = geoData.geometry.location.lng;
}

function Weather(weaData){
  this.forecast = weaData.summary;
  let dateData = new Date(weaData.time * 1000);
  this.time = dateData.toDateString();
}

app.listen(PORT, () => console.log(`app is listening on port ${PORT}!`))


/*
app.get('/location', handleLocation)
function handleLocation(request, response){
  //code block
}
*/

/*
  superagent.get('absolute url')
  .then(response from superagent => {
    responseFromSuperAgent.body
  })
  .catch(console.error)
*/

/*in-memeory-cache
//if locations doesn't have it, fetch it, and store it.
let locations = {};
/////////////////*/
