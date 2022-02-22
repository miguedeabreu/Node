const fs = require ('fs/promises');
const Person = require ('./classPerson');

const readline = require("readline");

function pregunta(pregunta){
    const question = new Promise ( function (resolve, reject){

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
            });

        rl.question(pregunta, function (respuesta){
            resolve(respuesta);
            rl.close();
        });

    });

    return question;
}


// THEN AND CATCH

let persona = new Person();

pregunta("What is your name? ")
.then(function(name){

    persona.name = name;
    console.log('Your name is: ' + name);

    return pregunta("What is your surname? ")
})
.then(function(surname){

    persona.surname = surname;
    console.log('Your surname is: ' + surname);

    return pregunta("What is your age? ")
})
.then(function(age){
    
    persona.age = age;
    console.log('Your age is: ' + age);

    let myJson = JSON.stringify(persona);

    return fs.writeFile('reto2.json', myJson)
})
.then(function(){

    return fs.readFile('reto2.json',"utf-8")
})
.then(function(data){

    console.log(data);
})
.catch(function(error){
    console.log(error);
})



// ASYNC AWAIT

async function asyncAwait2 () {

    try {

        let persona = new Person();

        let name = await pregunta("What is your name? ")
        console.log('Your name is: ' + name);
        persona.name = name;

        let surname = await pregunta("What is your surname? ")
        console.log('Your surname is: ' + surname);
        persona.surname = surname;
        
        let age = await pregunta("What is your age? ")
        console.log('Your age is: ' + age);
        persona.age = age;

        let myJson = JSON.stringify(persona);

        await fs.writeFile('reto2.json', myJson)

        await fs.readFile('reto2.json',"utf-8")
           
    } catch (error) {

        console.log(error)       
    }
}

asyncAwait2()