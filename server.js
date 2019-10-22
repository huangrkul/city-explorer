'use strict';

//all required
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001; //reading port 3000 from .env

app.get('/location', (request, response) => {
  try{
    const city = request.query.data;
    const locationData = fetchLatLong(city);

    console.log(locationData);
    response.send(locationData);
  }
  catch(error){
    console.error(error);
    response.status(500).send('server issue (500)');
  }
})

app.get('/weather', (request, response) => {
  try{
    const weatherData = fetchWeather();

    console.log(weatherData);
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
  response.status(404).send('not found');
})

//this function takes location data submitted from user query and instantiate a series of objects.
function fetchLatLong(location){
  const geoData = require('./data/geo.json');
  console.log(geoData);
  const locationObj = new Location(location, geoData);
  return locationObj;
}

function fetchWeather(){
  const weatherArr = [];
  const weaData = require('./data/darksky.json');
  console.log(weaData);
  for(let i=0; i < weaData.daily.data.length; i++){
    let weatherObj = new Weather(weaData, i);
    weatherArr.push(weatherObj);
  }

  return weatherArr;
}

function Location(city, geoData){
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

function Weather(weaData, index){
  this.forecast = weaData.daily.data[index].summary;
  //this.time = weaData.daily.data[index].time;
  let dateData = new Date(weaData.daily.data[index].time);
  this.time = dateData.toDateString();
}

app.listen(PORT, () => console.log(`app is listening on port ${PORT}!`))

