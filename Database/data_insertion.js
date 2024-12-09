// app.js
const mongoose = require('mongoose');
const {Movie, Trending, Popular, EditorChoice, TopRating} = require('./models/movie');
const fs = require('fs');
const { connectDb } = require('./connection');

// Replace with your MongoDB connection string
const insertMovieToDb = async (jsonPath) =>{
// app.js (continued)
const jsonData = fs.readFileSync(jsonPath, 'utf-8');

const movies = JSON.parse(jsonData);

connectDb()

Movie.insertMany(movies)
  .then(() => {
    console.log(movies)
    console.log('Data inserted successfully');
  })
  .catch(err => console.log(err));
}

// Replace with your MongoDB connection string
const insertEditorChoiceToDb = async (movies) =>{
  // app.js (continued)
  // const jsonData = fs.readFileSync(jsonPath, 'utf-8');
  
  // const movies = JSON.parse(jsonData);
  
  EditorChoice.insertMany(movies)
    .then(() => {
      console.log('Data inserted successfully');
      mongoose.connection.close(); // Close the connection after insertion
    })
    .catch(err => console.log(err));
  }

  // Replace with your MongoDB connection string
const insertPopularToDb = async (movies) =>{
  // app.js (continued)
  // const jsonData = fs.readFileSync(jsonPath, 'utf-8');
  
  // const movies = JSON.parse(jsonData);
  
  Popular.insertMany(movies)
    .then(() => {
      console.log('Data inserted successfully');
      mongoose.connection.close(); // Close the connection after insertion
    })
    .catch(err => console.log(err));
  }

  // Replace with your MongoDB connection string
const insertTrendingToDb = async (movies) =>{
  // app.js (continued)
  
  
  Trending.insertMany(movies)
    .then(() => {
      console.log('Data inserted successfully');
    })
    .catch(err => console.log(err));
  }

  const insertTopRatingToDb = async (movies) =>{
    // app.js (continued)
    // const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    
    // const movies = JSON.parse(jsonData);
    
    TopRating.insertMany(movies)
      .then(() => {
        console.log('Data inserted successfully');
      })
      .catch(err => console.log(err));
    }

module.exports = {insertMovieToDb,insertEditorChoiceToDb,insertPopularToDb,insertTrendingToDb,insertTopRatingToDb}