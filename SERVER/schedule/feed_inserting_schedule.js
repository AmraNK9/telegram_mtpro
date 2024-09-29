const { connect } = require("mongoose");
const { insertTopRatingToDb, insertTrendingToDb, insertPopularToDb } = require("../../Database/data_insertion");
const { Movie } = require("../../Database/models/movie");
const { getPopular } = require("../../TMDB_Api/popular_movie");
const { getTopRateMovies } = require("../../TMDB_Api/top_rate_movie");
const { getTrending } = require("../../TMDB_Api/trending_movies");
const { connectDb } = require("../../Database/connection");

const insertingMovieFeed = async () => {
    await connectDb()

    let movieList = await getPopular()
    let tmdbIds = []; // Replace with your actual tmdb_id array

    movieList.forEach(element => {
        tmdbIds.push(element.id)
    });

    console.log("tmdb ids -> ", tmdbIds)

    // Query to find movies where tmdb_id is in the given array
   await Movie.find({ tmdb_id: { $in: tmdbIds } })
        .then((movies) => {
            // console.log("Movies found:", movies);
            insertPopularToDb(movies)
        })
        .catch((err) => {
            console.error("Error finding movies:", err);
        });
    //Trendig
    let trendings = await getTrending()
    let trendingTmdbIds = []; // Replace with your actual tmdb_id array

    trendings.forEach(element => {
        trendingTmdbIds.push(element.id)
    });
    console.log("tmdb ids -> ", trendingTmdbIds.length)

    // Query to find movies where tmdb_id is in the given array
   await Movie.find({ tmdb_id: { $in: trendingTmdbIds } })
        .then((movies) => {
            // console.log("Movies found:", movies);
            insertTrendingToDb(movies)
        })
        .catch((err) => {
            console.error("Error finding movies:", err);
        });

    //TopRating
    let topRating = await getTopRateMovies()
    let topRatingTmdbIds = []; // Replace with your actual tmdb_id array

    topRating.forEach(element => {
        topRatingTmdbIds.push(element.id)
    });
    console.log("tmdb ids -> ", topRatingTmdbIds.length)

    // Query to find movies where tmdb_id is in the given array
   await Movie.find({ tmdb_id: { $in: trendingTmdbIds } })
        .then((movies) => {
            // console.log("Movies found:", movies);
            insertTopRatingToDb(movies)
        })
        .catch((err) => {
            console.error("Error finding movies:", err);
        });
}


module.exports = { insertingMovieFeed }