// app.js
const mongoose = require('mongoose');
const Movie = require('./models/movie');
const { connectDb } = require('./connection');

// Replace with your MongoDB connection string
const getMoviesFromDb = async ({limit=10,offset=0}) =>{
// app.js (continued)
await connectDb()
let movies = Movie.find().skip(offset).limit(limit)
return movies;
}

module.exports = {getMoviesFromDb}