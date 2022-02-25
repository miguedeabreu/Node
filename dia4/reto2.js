const Proffesional = require ('./classPro');
const express = require('express');
const app = express();
const PORT = 5000;

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

// VARIABLES GLOBALES

let profesionales = [];

let profesional1 = new Proffesional ("Alan Rickman", 50, "masculino", 70, 180, "gris", 
                    "negro", "blanco", true, "Reino Unido", 1, "actor");

let profesional2 = new Proffesional ("Miley Cyrus", 30, "femenino", 56, 175, "rubio",
                    "azul", "blanco", false, "USA", 0, "cantante");

let profesional3 = new Proffesional ("Emma Watson", 32, "femenino", 54, 170, "castaño",
                    "marron", "blanco", false, "Reino Unido", 0, "actriz");

profesionales.push(profesional1);
profesionales.push(profesional2);
profesionales.push(profesional3);

// let profesionales = null;


// GET

app.get('/profesionales', function (req, res){
    let id = req.query.id;
    let respuesta;

    if (profesionales.length <= id){
        respuesta = {error: true, message: "No existe el id del profesional, puede crear uno en POST o intentar con otro id"};
    }
    else if (profesionales != null && id != null){
        respuesta = {error: false, message: "Existe el id del profesional.", res: profesionales[id]};
    }
    else {
        respuesta = {error: false, res: profesionales};
    }
    res.send(respuesta);
});


// POST 

app.post('/profesionales', function (req, res){
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

    let profesional = new Proffesional (name, age, genre, weight, height, hairColor, eyeColor,
                    race, isRetired, nationality, oscarsNumber, profession);

    profesionales.push(profesional);
    respuesta = {error: false, message: "Nuevo profesional creado exitosamente", res: profesional};
    res.send(respuesta);
});


// PUT

app.put('/profesionales', function (req, res){    
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
    let id = req.body.id;
    
    if (profesionales.length <= id){
        respuesta = {error: false, message: "El índice introducido no existe."};
    }
    else if (profesionales[id] == null){
        respuesta = {error: false, message: "La clase proffesional no existe."};
    }
    else {
        profesionales[id] = new Proffesional (name, age, genre, weight, height, hairColor, 
                            eyeColor, race, isRetired, nationality, oscarsNumber, profession);

        respuesta ={error: false, message: "Profesional modificado correctamente", res: profesionales}   
    }
    res.send(respuesta);
});


// DELETE

app.delete('/profesionales', function (req, res){
    let respuesta;
    let id = req.body.id;

    if (profesionales != null) {
        profesionales.splice(id,1)
        respuesta = {error: false, message: "Proffesional eliminado correctamente."};
    }
    else {
        respuesta = {error: true, 
                    message: "No ha eliminado ningún profesional."};
    }
    res.send(respuesta);
});