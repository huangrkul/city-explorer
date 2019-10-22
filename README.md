# City Explorer

**Author**: Will Huang
**Version**: 1.0.3 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->
This app will take user location inquery and output and map location as well as weather forecast for the next week.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
1. Create basic server with all packages installed (express, dotenv, cors)
1. Create an account on google map and get a API key
1. Use https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/ as your front-end.

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
- Languages: Javascript
- Libraries: express.js, dotenv.js, cors.js

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
== 1.0.3 ==
- created an error object and output it when filepath isn't /weather or /location.

== 1.0.2 ==
- created a GET to fetch specific data from darsky.json.
- formatted the timestamp to expected date output using toDateString().
- confirmed it's rendered correctly on the front-end.

== 1.0.1 ==
- created a GET to fetch specific data from geo.json.
- confirmed it's rendered correctly on the front-end.

== 1.0.0 ==
- basic server completed and deployed on heroku.