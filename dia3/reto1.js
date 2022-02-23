const http = require('http');

const server = http.createServer(function (request, response){

    console.log("Petición recibida por el cliente");
    console.log("request URL: " + request.url);
    console.log(request.headers['content-type']);
    console.log(request.headers['content-length']);
    console.log(request.headers['user-agent']);

    if (request.url == '/bye') {
 
        let mensaje = {
        status: 200, 
        ok: true, 
        message: 'Adios!'
        }
        response.write(JSON.stringify(mensaje));
    
    } else {
        
        let mensaje = {
        status: 200, 
        ok: true, 
        message: 'Recibido!'
        }
        response.write(JSON.stringify(mensaje));
    }
    response.end();
})

server.listen(3000)