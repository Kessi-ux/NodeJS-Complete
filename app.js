//import package
const express = require('express');
const fs = require('fs');

let app = express();
let movies = JSON.parse(fs.readFileSync('./Data/movies.json'));

app.use(express.json())

//Route = HTTP METHOD + URL
app.get('/api/v1/movies', (req, res) => {
      res.status(200).json({
        status: "success",
        count: movies.length,
        data: {
            movies: movies
        }
    });
});

app.get('api/v1/movies/:id', (req, res) => {
    const id = req.params.id = 1;

    //find the movie based on ID parameter
    let movie = movies.find(el => el.id === id);

    if (!movie){
        return res.status(404).json({
            status: "fail",
            message: 'Movie with ID' +id+ 'is not found'
        })
    }

    //Send movie in the response
    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    });
})

app.post('/api/v1/movies', (req, res) =>{
    //console.log(req.body);
    const newId = movies[movies.length -1].id + 1;

    const newMovie = Object.assign({id: newId}, req.body )

    movies.push(newMovie);

    fs.writeFile('.Data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                movie : newMovie
            }
        })
    })

  //  res.send('Created');
})

//  
//create a Server
const port = 5050;
app.listen(port, () => {
        console.log('server has started...');
     })
