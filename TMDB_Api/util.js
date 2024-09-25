const accssToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWVkNWVkZDkxZWUwMWVlYjFiZTRhNTkyODgxYmNhZCIsIm5iZiI6MTcyNzE1OTMxMS4xMDExNDcsInN1YiI6IjYzZDIwMTIyNjZhZTRkMDA3YmY2N2Q2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RvPaTE2OksMKbF5fxqrP1Oc3joI3LvEXDSZEDtNTxeo";

const apiKey = "49ed5edd91ee01eeb1be4a592881bcad"

const options = {
    method: 'GET', headers: {
        accept: 'application/json',
        Authorization: accssToken
    }
};

const imagePath = "https://image.tmdb.org/t/p/w500"

module.exports = {options,apiKey,accssToken,imagePath}