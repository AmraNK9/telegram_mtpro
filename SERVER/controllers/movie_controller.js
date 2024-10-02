
const asyncHandler = require("express-async-handler");
const { getAndInsertTeleMoviesToDb } = require("../../Telegram_Api/get_and_insert");
const { deleteDuplicateDescriptions, getDuplicateMovies } = require("../../Database/data_cleaning");
const { getMoviesFromDb, getTrendingMovieFromDb, getTopRateMovieFromDb, getPopularMovieFromDb, getEditorChoiceMovieFromDb, getNewReleaseMovieFromDb, getMovieWithGenereFromDb } = require("../../Database/get_movies");
const { getPopular } = require("../../TMDB_Api/popular_movie");
const { Movie } = require("../../Database/models/movie");
const { insertPopularToDb, insertTrendingToDb, insertTopRatingToDb } = require("../../Database/data_insertion");
const { getTrending } = require("../../TMDB_Api/trending_movies");
const { getSimillarMovie } = require("../../TMDB_Api/get_simillar_movie");

exports.insertTeleMovie = asyncHandler(async (req, res, next) => {
    const channelName = req.body.channelName;
    let movieList = await getAndInsertTeleMoviesToDb(channelName)
    res.json({ success: true, movieList });
});

exports.getTeleMovies = asyncHandler(async (req, res, next) => {
    const channelName = req.body.channelName;
    let movieList = await getAndInsertTeleMoviesToDb(channelName, { onlyGet: true })
    res.json({ success: true, movieList });
})

exports.cleanDuplicateMovies = asyncHandler(async (req, res, next) => {
    await deleteDuplicateDescriptions()
    res.json({ success: true });
})

exports.getMovies = asyncHandler(async (req, res, next) => {
    const { limit = 10, offset = 0 } = req.query;
    let movieList = await getMoviesFromDb({ offset: offset, limit: limit })
    res.json({ success: true, movieList });
})

exports.getDuplicateMovies = asyncHandler(async (req, res, next) => {
    const { limit = 10, offset = 0 } = req.query;
    let movieList = await getDuplicateMovies({ offset: offset, limit: limit })
    res.json({ success: true, movieList });
})


exports.getMoviesChoicesForHome = asyncHandler(async(req,res,next)=>{
    const { limit = 15, offset = 0 } = req.query;

    let trendingMovies = await getTrendingMovieFromDb({ offset: offset, limit: limit });
    let topRatingMovies = await getTopRateMovieFromDb({ offset: offset, limit: limit });
    let popularMovies = await getPopularMovieFromDb({ offset: offset, limit: limit });
    let editorChoices = await getEditorChoiceMovieFromDb({ offset: offset, limit: limit });
    res.json({
        success:true,
        trendingMovies,
        topRatingMovies,
        popularMovies,
        editorChoices
    })
})

exports.getPopular = asyncHandler(async(req,res,next)=>{
    const { limit = 15, offset = 0 } = req.query;
    let movieList = await getPopularMovieFromDb({ offset: offset, limit: limit })
    res.json({ success: true, movieList });
})

exports.getTrending = asyncHandler(async(req,res,next)=>{
    const { limit = 15, offset = 0 } = req.query;
    let movieList = await getTrendingMovieFromDb({ offset: offset, limit: limit })
    res.json({ success: true, movieList });
})

exports.getTopRate = asyncHandler(async(req,res,next)=>{
    const { limit = 15, offset = 0 } = req.query;
    let movieList = await getTopRateMovieFromDb({ offset: offset, limit: limit })
    res.json({ success: true, movieList });
})

exports.getEditorChoice = asyncHandler(async(req,res,next)=>{
    const { limit = 15, offset = 0 } = req.query;
    let movieList = await getEditorChoiceMovieFromDb({ offset: offset, limit: limit })
    res.json({ success: true, movieList });
})

exports.getNewRelease = asyncHandler(async(req,res,next)=>{
    const { limit = 15, offset = 0 } = req.query;
    let movieList = await getNewReleaseMovieFromDb({ offset: offset, limit: limit })
    res.json({ success: true, movieList });
})

exports.getMovieWithGenere = asyncHandler(async(req,res,next)=>{
    const { limit = 15, offset = 0 ,id } = req.query;
    let movieList = await getMovieWithGenereFromDb({ offset: offset, limit: limit ,id })
    res.json({ success: true, movieList });
})

exports.getSimillar = asyncHandler(async(req,res,next)=>{
    const { limit = 15, offset = 0 , id} = req.query;
    let movieList = await getSimillarMovie(id)
    let tmdbIds = []
    movieList.forEach(element => {
        tmdbIds.push(element.id)
    });
 let simillarMovie =   await Movie.find({ tmdb_id: { $in: tmdbIds } }).limit(20)
    .catch((err) => {
        console.error("Error finding movies:", err);
    });    res.json({ success: true, "movieList":simillarMovie });
})