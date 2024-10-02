// app.js
const mongoose = require('mongoose');
const Movie = require('./models/movie');
const { connectDb } = require('./connection');

const getMoviesFromDb = async ({ limit = 10, offset = 0 }) => {
    let movies = Movie.Movie.find().skip(offset).limit(limit)
    return movies;
}


const getTrendingMovieFromDb = async ({ limit = 10, offset = 0 }) => {
    let movies = Movie.Trending.find().skip(offset).limit(limit)
    return movies;
}

const getPopularMovieFromDb = async ({ limit = 10, offset = 0 }) => {
    let movies = Movie.Popular.find().skip(offset).limit(limit)
    return movies;
}

const getTopRateMovieFromDb = async ({ limit = 10, offset = 0 }) => {
    let movies = Movie.TopRating.find().skip(offset).limit(limit)
    return movies;
}

const getEditorChoiceMovieFromDb = async ({ limit = 10, offset = 0 }) => {
    let movies = Movie.EditorChoice.find().skip(offset).limit(limit)
    return movies;
}


module.exports = { getMoviesFromDb, getTrendingMovieFromDb, getPopularMovieFromDb, getTopRateMovieFromDb, getEditorChoiceMovieFromDb }