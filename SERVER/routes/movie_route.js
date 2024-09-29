const express = require('express');

const router = express.Router();
const movieController = require('../controllers/movie_controller')

// Upload single image
router.post('/insert_movie',movieController.insertTeleMovie)
router.get("/get_tele_movies",movieController.getTeleMovies)
router.delete('/duplicate_description',movieController.cleanDuplicateMovies)
router.get('/get_movies',movieController.getMovies)
router.get('/get_duplicate_movies',movieController.getDuplicateMovies)


module.exports = router;