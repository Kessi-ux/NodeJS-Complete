const readline = require('readline');
const fs = require('fs');
const http = require('http')

const html = fs.readFileSync('./Template/index.html', 'utf-8')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please enter your name:", (name) => {
    console.log("You entered: " + name);
    rl.close();
})

rl.on('close', () => {
    console.log("Interface closed");
    process.exit(0);
})



//step 1
// const server = http.createServer((request, response) => {
//     response.end(html);
//     console.log('A new request received');
// });

const server = http.createServer((request, response) => {
    let path = request.url;
    // response.end(path);

    if (path === '/' || path.toLocaleLowerCase() === '/home'){
        response.end(html.replace('{{%CONTENT%}}', 'You are in the Home Page'));
    } else if (path.toLocaleLowerCase() === '/about'){
        response.end(html.replace('{{%CONTENT%}}', 'You are in the About Page'));
    } else if (path.toLocaleLowerCase() === '/contact'){
        response.end(html.replace('{{%CONTENT%}}', 'You are in the Contact Page'));
    }  else{
        response.end('Error 404: page not found');
    }
});

//step 2: start the server
server.listen(8000, '127.0.0.1', () => {
    console.log('server has started')
})