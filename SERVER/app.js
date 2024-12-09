const express = require('express')
const app = express()
const cors = require('cors');

const movieRouter = require("../SERVER/routes/movie_route");
const { connectDb } = require('../Database/connection');
const { job } = require('./schedule/schedule');

app.use(express.json()); // application/json
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
 
// app.use(compression());
app.use(cors());

connectDb().then(
    (v)=>{
        job
        app.use(movieRouter)
        app.use((err, req, res, next) => {
            const status = err.status || 500;
            const message = err.message;
            res.status(status).json({ message: message });
        });
        
        app.listen(8080); // localhost:8080
    }
)


