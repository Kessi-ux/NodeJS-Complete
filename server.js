const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

//console.log(app.get('env'));
console.log(process.env);

//create a Server
const port = process.env.PORT || 5050;

app.listen(port, () => {
        console.log('server has started...');
     })