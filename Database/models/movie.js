const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import the v4 function from uuid

// Define the schema for the provided JSON data
const movieSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4
    },
    poster: {
        type: String,
        required: true
    },
    tmdb_id: {
        type: Number,
        required: true,
        // unique: true
    },
    title: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        // required: true
    },
    rating: {
        type: Number,
        // required: true
    },
    rate_count: {
        type: Number,
        // required: true
    },
    popularity: {
        type: Number,
        // required: true
    },
    genre_ids: {
        type: [Number],
        required: true
    },
    backdrop_path: {
        type: String,
        required: true
    },
    // overview: {
    //     type: String,
    //     // required: true
    // },
    original_language: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tele_link: {
        type: String,
        required: true
    }
},{timestamps: true});

// Create the model using the schema
const Movie = mongoose.model('Movie', movieSchema);
const Popular = mongoose.model('Popular',movieSchema);
const Trending = mongoose.model("Trending",movieSchema);
const TopRating = mongoose.model("TopRating",movieSchema);

const EditorChoice = mongoose.model("EditorChoice",movieSchema)

module.exports = {Movie,Popular,Trending,EditorChoice,TopRating};
