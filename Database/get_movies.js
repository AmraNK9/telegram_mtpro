// app.js
const mongoose = require('mongoose');
const Movie = require('./models/movie');
const { connectDb } = require('./connection');

const getMoviesFromDb = async ({ limit = 10, offset = 0 }) => {
    let movies = Movie.Movie.find().skip(offset).limit(limit).sort({createdAt:-1})
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

const getNewReleaseMovieFromDb = async ({ limit = 10, offset = 0 }) => {
    let movies = Movie.Movie.find().skip(offset).limit(limit).sort({release_date:-1});
    return movies;
}

const getMovieWithGenereFromDb = async ({ limit = 20, offset = 0 ,id}) => {
    let movies = Movie.Movie.find({genre_ids: id}).skip(offset).limit(limit);
    return movies;
}

const getMoviesWithTmdbId = async ({ limit = 20, offset = 0 ,id}) => {
    let movies = Movie.Movie.find({tmdb_id: id}).skip(offset).limit(limit);
    return movies;
}



module.exports = { getMoviesFromDb, getTrendingMovieFromDb, getPopularMovieFromDb, getTopRateMovieFromDb, getEditorChoiceMovieFromDb, getNewReleaseMovieFromDb,getMovieWithGenereFromDb,getMoviesWithTmdbId }