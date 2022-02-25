const Proffesional = require ('./classPro');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(function (request, response, next){
    request.requestTime = new Date();
    console.log(`Peticion ${request.method}: ${request.requestTime}`);
    next();
});

app.listen(PORT, "localhost", function(){
    console.log("Server is listen on port " + PORT + " en localhost EXPRESS");
});


// VARIABLE GLOBAL 

let proffesional = new Proffesional ("Alan Rickman", 50, "masculino", 70, 180, "gris", 
                    "negro", "blanco", true, "Reino Unido", 1, "actor");
                
// let proffesional = null;



// GET 

app.get('/proffesional', function (req, res){
    let respuesta;

    if (proffesional != null){
        // console.log("Hay pro sin importar quien es");
        respuesta ={error: false, message: "Existe proffesional.", res: proffesional};
    }
    else {
        respuesta ={error: false, message: "No existe proffesional, puede crear uno en POST"};
    }
    res.send(respuesta);
});


// POST -> Realizado uno a uno con cada clave/valor de mi objeto, se puede hacer direc-
//         tamente con el objeto entero que es una variable como en el caso PUT.

app.post('/proffesional', function (req, res){
    let respuesta;
    let name = req.body.name;
    let age = req.body.age;
    let genre = req.body.genre;
    let weight = req.body.weight;
    let height = req.body.height;
    let hairColor = req.body.hairColor;
    let eyeColor = req.body.eyeColor;
    let race = req.body.race;
    let isRetired = req.body.isRetired;
    let nationality = req.body.nationality;
    let oscarsNumber = req.body.oscarsNumber;
    let profession = req.body.profession;

    if (proffesional == null){
        proffesional = {name: name,
                        age: age,
                        genre: genre,
                        weight: weight,
                        height: height,
                        hairColor: hairColor,
                        eyeColor: eyeColor,
                        race: race,
                        isRetired: isRetired,
                        nationality: nationality,
                        oscarsNumber: oscarsNumber,
                        profession: profession};
    
        respuesta = {error: false, message: "Proffesional creado exitosamente", 
                    res: proffesional};
    }
    else {
        respuesta = {error: true, 
                    message: "Proffesional ya existe, usa PUT para modificarlo."};
    }
    res.send(respuesta);
});


// PUT 

app.put('/proffesional', function (req, res){
    let respuesta;

    if (proffesional != null){
        proffesional = req.body
        respuesta = {error: false, message: "Proffesional modificado con éxito", res: proffesional};
    }
    else {
        respuesta ={error: true, message: "No existe proffesional, puede crear uno en POST"};
    }
    res.send(respuesta);
});


// DELETE

app.delete('/proffesional', function (req, res){
    let respuesta;

    if (proffesional != null) {
        proffesional = null;
        respuesta = {error: false, message: "Proffesional eliminado correctamente."};
    }
    else {
        respuesta = {error: true, 
                    message: "Proffesional no existe, puede agregar uno usando POST."};
    }
    res.send(respuesta);
});