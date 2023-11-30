//import package
const express = require('express');
//const { Server } = require('http');
let app = express();

//Route = HTTP METHOD + URL
app.get('/', (req, res) => {
   // res.status(200).send('<h4>Hello from express</h4>');
   // res.status(200).send('Hello from express');
    res.status(200).json({message:'Hello, world', status: '200'});
})

app.post('/', () => {

})

//create a Server
const port = 5050;
app.listen(port, () => {
        console.log('server has started...');
     })
