const fs = require('fs');
let movies = JSON.parse(fs.readFileSync('./Data/movies.json'));

exports.checkId = (req, res, next, value) => {
    console.log('Movie ID is ' + value);
    
    //find movie based on id parameter
    let movie = movies.find(el => el.id === value * 1);

     if(!movie){
         return res.status(404).json({
             status: "fail",
             message: 'Movie with ID ' + value + ' is not found'
         })
}
    next();
}

exports.getAllMovies = (req, res) => {
    res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      count: movies.length,
      data: {
          movies: movies
      }
  });
};

exports.getMovie = (req, res) => {
    //convert ID to number type
    const id = req.params.id * 1;

    //find movie based on id parameter
    let movie = movies.find(el => el.id === id)
    
    //send movie in the response
    res.status(200).json({
        status: "success",
        data: {
            movie : movie
        }
    });
}

exports.createMovie = (req, res) =>{
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

exports.updateMovie = (req, res) => {
    let id = req.params.id * 1;
    let movieToUpdate = movies.find(el => el.id === id);

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

exports.deleteMovie = (req, res) => {
    const id = req.params.id * 1;
    const movieToDelete = movies.find(el => el.id === id);

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
