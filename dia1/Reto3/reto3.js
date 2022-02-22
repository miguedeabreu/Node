const fs = require ('fs');
const Person = require ('../Reto2/classPerson');

let readline = require('readline');

let rl = readline.createInterface(process.stdin, process.stdout);

rl.question('What is your name? ', function (name) {
	console.log('Your name is: ' + name);
    
    rl.question('What is your surname? ', function (surname) {
        console.log('Your surname is: ' + surname);

        rl.question('What is your age? ', function (age) {
            console.log('Your age is: ' + age);
            rl.close();

            let person1 = new Person (name, surname, age);

            let myJson = JSON.stringify(person1);

            fs.writeFile('reto3.json', myJson, function(){
                
                fs.readFile('./reto3.json',"utf-8", function(err, data){
                
                    if (err) {
                        console.error(err)
                    }
                    else {
                        console.log(data);
                    } 
                    
                });
                
            });

        });

    });

});     
