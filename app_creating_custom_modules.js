const fs = require('fs');
const http = require('http');
const url = require('url');

const html = fs.readFileSync('./Template/index.html', 'utf-8')
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'))
let productListHtml = fs.readFileSync('./Template/product-list.html', 'utf-8');
let productDetailHtml = fs.readFileSync('./Template/product-details.html', 'utf-8');

//custom module
const replaceHtml = require('./Modules/replaceHtml');

//Create a server
const server = http.createServer((request, response) => {
    let {query, pathname: path} = url.parse(request.url, true)
   
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
    
    else if (path.toLocaleLowerCase() === '/products'){
       if (!query.id){
        let productHtmlArray = products.map((prod) =>{
           return replaceHtml(productListHtml, prod);
        })

        let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
        response.writeHead(200, {'Content-Type': 'text/html' });
        response.end(productResponseHtml);
       } 
       else{
        let prod = products[query.id]
        let productDetailResponseHtml = replaceHtml(productDetailHtml, prod)
        response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml));
    }}
    
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


