const fetch = require('node-fetch');
const { options, imagePath } = require('./util');
const fs = require("fs");
async function getSimillarMovie(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/similar`;

    let resJson;
    let movies;

    await fetch(url, options)
        .then(res => res.json())
        .then(json => { resJson = json; movies = resJson['results'] })
        .catch(err => console.error('error:' + err),);


        console.log(resJson)
 

    return movies;

}

getSimillarMovie();

// findMovie("Happy Ghost III").then((v) => console.log(v))


module.exports = { getSimillarMovie }