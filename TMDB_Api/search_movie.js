const fetch = require('node-fetch');
const { options, imagePath } = require('./util');
async function findMovie(querry = '') {
    const url = `https://api.themoviedb.org/3/search/movie?query="${querry}"&include_adult=false&language=en-US&page=1`;

    let resJson;
    let movie;
    await fetch(url, options)
        .then(res => res.json())
        .then(json => { resJson = json; movie = resJson['results'][0] })
        .catch(err => console.error('error:' + err),);

    // console.log(movie)

    console.log(resJson)
    if (movie == null) {
        return {}
    }
    return {
        "poster": imagePath + movie['poster_path'],
        "id": movie['id'],
        "title": movie['title'],
        "release_date": movie['release_date'],
        "rating": movie['vote_average'],
        "rate_count": movie['vote_count'],
        "popularity": movie['popularity'],
        "genre_ids": movie['genre_ids'],
        "backdrop_path": imagePath + movie['backdrop_path'],
        "overview":movie['overview'],
        "original_language":movie['original_language']
    }

}

findMovie("Happy Ghost III").then((v) => console.log(v))


module.exports = { findMovie }