const express = require('express');
const app = express();

app.get('/', function(req, res){
    console.log("Petición recibida del cliente");
    console.log("request Method: " + req.method);
    console.log("request URL: " + req.url);
    console.log(req.headers['user-agent']);
    let mensaje = {
        status: 200, 
        ok: true, 
        message: 'Recibido!'
    }
    res.send(JSON.stringify(mensaje));  
});

app.get('/bye', function(req, res){
    let mensaje = {
        status: 200, 
        ok: true, 
        message: 'Adios!'
        }
    res.send(JSON.stringify(mensaje));
});

app.listen(6000);
