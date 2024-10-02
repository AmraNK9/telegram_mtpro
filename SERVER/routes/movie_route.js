const express = require('express');

const router = express.Router();
const movieController = require('../controllers/movie_controller')

// Upload single image
router.post('/insert_movie',movieController.insertTeleMovie)
router.get("/get_tele_movies",movieController.getTeleMovies)
router.delete('/duplicate_description',movieController.cleanDuplicateMovies)
router.get('/get_movies',movieController.getMovies)
router.get('/get_duplicate_movies',movieController.getDuplicateMovies)
router.get('/get_movie_choices',movieController.getMoviesChoicesForHome)
router.get('/get_popular',movieController.getPopular)
router.get('/get_trending',movieController.getTrending)
router.get('/get_top_rate',movieController.getTopRate)
router.get('/get_editor_choice',movieController.getEditorChoice)
router.get('/get_new_release',movieController.getNewRelease)
router.get('/get_simillar',movieController.getSimillar)
router.get('/get_movie_with_genere',movieController.getMovieWithGenere)



module.exports = router;