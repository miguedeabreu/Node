const fs = require ('fs');
const Person = require ('../Reto2/classPerson');

let persona1 = new Person("miguel", "rodrigues", 28);

let myJson = JSON.stringify(persona1);
// console.log(myJson);

fs.writeFile('reto2.json', myJson, function(){

    // console.log("Entro al write.");

        fs.readFile('./reto2.json',"utf-8", function(err, data){

        if (err) {
            console.error(err)
        }

        else {
            console.log(data);
        }
    
    })

});
