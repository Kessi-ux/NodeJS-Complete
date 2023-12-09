const express = require('express')
const fs = require('fs');
let movies = JSON.parse(fs.readFileSync('./Data/movies.json'));

const getAllMovies = (req, res) => {
    res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      count: movies.length,
      data: {
          movies: movies
      }
  });
};

const getMovie = (req, res) => {
    //convert ID to number type
    const id = req.params.id * 1;

    //find movie based on id parameter
    let movie = movies.find(el => el.id === id)
    
    if(!movie){
        return res.status(404).json({
            status: "fail",
            message: 'Movie with ID ' + id + ' is not found'
        })
    }

    //send movie in the response
    res.status(200).json({
        status: "success",
        data: {
            movie : movie
        }
    });
}

const createMovie = (req, res) =>{
    const newId = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({id: newId}, req.body)
    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            succes: "success",
            data: {
                movie: newMovie
            }
        })
    })
}

const updateMovie = (req, res) => {
    let id = req.params.id * 1;
    let movieToUpdate = movies.find(el => el.id === id);

    if(!movieToUpdate){
        return res.status(404).json({
            status: "fail",
            message: ' no movie object with ID ' + id + ' is found'
        })
    }

    let index = movies.indexOf(movieToUpdate); //e.g ID = 4 , index = 3 
    
    Object.assign(movieToUpdate, req.body);

    movies[index] = movieToUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: "success",
            data: {
                movie: movieToUpdate
            }
        })
    })
}

const deleteMovie = (req, res) => {
    const id = req.params.id * 1;
    const movieToDelete = movies.find(el => el.id === id);

    if(!movieToDelete){
        return res.status(404).json({
            status: "fail",
            message: ' No movie with ID ' + id + ' is not found to delete'
        })
    }

    const index = movies.indexOf(movieToDelete);

    movies.splice(index, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        })
    })
}


const router = express.Router();

router.route('/')
    .get(getAllMovies)
    .post(createMovie)

router.route('/:id')
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie)

module.exports = router;
