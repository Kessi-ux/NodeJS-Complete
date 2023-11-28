const readline = require('readline');
const fs = require('fs');
const http = require('http')

const html = fs.readFileSync('./Template/index.html', 'utf-8')
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'))
let productListHtml = fs.readFileSync('./Template/product-list.html', 'utf-8');

let productHtmlArray = products.map((prod) =>{
    let output = productListHtml.replace('{{%IMAGE%}}', prod.productImage);
    output = output.replace('{{%NAME%}}', prod.name);
    output = output.replace('{{%MODELNAME%}}', prod.modelName);
    output = output.replace('{{%MODELNO%}}', prod.modelNo);
    output = output.replace('{{%SIZE%}}', prod.size);
    output = output.replace('{{%CAMERA%}}', prod.camera);
    output = output.replace('{{%PRICE%}}', prod.price);
    output = output.replace('{{%COLOR%}}', prod.color);

    return output;
})

//Create a server
const server = http.createServer((request, response) => {
    let path = request.url;
    // response.end(path);

    if (path === '/' || path.toLocaleLowerCase() === '/home'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hello, world'
        });
        response.end(html.replace('{{%CONTENT%}}', productListHtml));
    } else if (path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hello, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in the About Page'));
    } else if (path.toLocaleLowerCase() === '/contact'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hello, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in the Contact Page'));
    }
    
    else if (path.toLocaleLowerCase() === '/product'){
       let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
       response.writeHead(200, {'Content-Type': 'text/html' });
       response.end(productResponseHtml);
       // console.log(productHtmlArray.join(','));
    } 
    
    else{
        response.writeHead(404, {
            'Content-Type' : 'text/html',
            'my-header': 'Hello, world'
        });
        response.end(html.replace('{{%CONTENT%}}','Error 404: page not found'));
    }
});

//step 2: start the server
server.listen(8000, '127.0.0.1', () => {
    console.log('server has started')
})