const fs = require ('fs/promises');
const Person = require ('./classPerson');

let persona1 = new Person ("Miguel", "Rodrigues", 28);

let myJson = JSON.stringify(persona1);
// console.log(myJson);

// THEN AND CATCH

fs.writeFile('reto1.json', myJson)
.then(function(){

    // console.log("Entra al write");
    return fs.readFile('reto1.json',"utf-8")
})

.then(function(data){

    console.log(data);
})

.catch(function(error){
    console.log(error);
})


// ASYNC AWAIT

// async function asyncAwait (){

//     try {

//         await fs.writeFile('reto1.json', myJson)

//         const newObject = await fs.readFile('reto1.json',"utf-8");
    
//         console.log(JSON.parse(newObject));
    
//     } catch (error) {

//         console.log(error);
//     }
// }

// asyncAwait()