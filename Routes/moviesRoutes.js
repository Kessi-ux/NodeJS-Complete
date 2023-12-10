const express = require('express');
const moviesController = require('./../Controller/moviesController');

const router = express.Router();

// router.param('id', (req, res, next, value) =>{
//     console.log('Movie ID is ' + value);
//     next();
// })

router.param('id', (moviesController.checkId))

router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.createMovie)

router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

module.exports = router;
