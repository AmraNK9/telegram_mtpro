const fetch = require('node-fetch');
const { options, imagePath } = require('./util');
async function getTopRateMovies() {
    const url = `https://api.themoviedb.org/3/movie/top_rated`;

    let resJson;
    let movies;
    await fetch(url, options)
        .then(res => res.json())
        .then(json => { resJson = json; movies = resJson['results'] })
        .catch(err => console.error('error:' + err),);

    // console.log(movie)

    console.log(resJson)
    if (movies == null) {
        return {}
    }
    return movies;

}

// findMovie("Happy Ghost III").then((v) => console.log(v))


module.exports = { getTopRateMovies }