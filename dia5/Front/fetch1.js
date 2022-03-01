let final = document.getElementById("final");
let id = document.getElementById("id").value 

class Proffesional {
    
    constructor (name, age, genre, weight, height, id=0)
    {
        this.name = name;
        this.age = age;
        this.genre = genre;
        this.weight = weight;
        this.height = height;
        this.id = id;
    }
}

function postProfesional()
{
    let profesional = new Proffesional (document.getElementById("name").value,
                                        document.getElementById("age").value,
                                        document.getElementById("genre").value,
                                        document.getElementById("weight").value,
                                        document.getElementById("height").value)
    
    const url = "http://localhost:5000/profesionales";

    if (validar(profesional))
    {
        let param = 
            {
                headers: {"Content-type": "application/json; charset= UTF-8"},
                body: JSON.stringify(profesional),
                method: "POST"
            }

        fetch(url, param)
        .then(function(data)
        {
            return data.json()
        })
        .then(function(result)
        {
            if (result.error)
                showToast("ERROR: " +  result.message, "bg-danger")
            else
                showToast("Profesional Creado Correctamente", "bg-success")

            console.log(result)
        })
        .catch(function(error)
        {
            console.log(error)
        })
    }
}

function getProfesional()
{
    let url = "http://localhost:5000/profesionales";
    let id = document.getElementById("id").value 

    if (id != ""){
        url += `?i=${id}`
    }

    let param = 
    {
        headers: {"Content-type": "application/json; charset= UTF-8"},
        method: "GET"
    }

    fetch(url, param)
    .then(function(data)
    {
        return data.json()
    })
    .then(function(result)
    {      
        if (!result.error) {
            
            // console.log(result);
            let array = result.res

            if (id === ""){

            for (let id = 0 ; id < array.length ; id++){
                // console.log(array)
                final.innerHTML += `<p><div class="card text-white bg-info mb-3" style="max-width: 18rem;">
                <div class="card-header">TU FAMOSO ES: </div>
                <div class="card-body">
                    <h5 class="card-title"><p>${array[id].name}</p></h5>
                    <p class="card-text">Edad: ${array[id].age} años</p>
                    <p class="card-text">Genero: ${array[id].genre}</p>
                    <p class="card-text">Peso: ${array[id].weight} Kg</p>
                    <p class="card-text">Altura: ${array[id].height} cm</p>
                </div>
                </div></p>`
            }
        }
        else {
            console.log(array)
            final.innerHTML += `<p><div class="card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">TU FAMOSO ES: </div>
            <div class="card-body">
                <h5 class="card-title"><p>${array[id].name}</p></h5>
                <p class="card-text">Edad: ${array[id].age} años</p>
                <p class="card-text">Genero: ${array[id].genre}</p>
                <p class="card-text">Peso: ${array[id].weight} Kg</p>
                <p class="card-text">Altura: ${array[id].height} cm</p>
            </div>
            </div></p>`
        }
    }
    else {
        showToast("ERROR: " +  result.message, "bg-danger")
    }})
    .catch(function(error)
    {
        console.log(error)
    })
    final.innerHTML = ""
}

function putProfesional() {
    
    let profesional = new Proffesional (document.getElementById("name").value,
                                        document.getElementById("age").value,
                                        document.getElementById("genre").value,
                                        document.getElementById("weight").value,
                                        document.getElementById("height").value,
                                        document.getElementById("id").value)
    
    const url = "http://localhost:5000/profesionales";

    let param = 
        {
            headers: {"Content-type": "application/json; charset= UTF-8"},
            body: JSON.stringify(profesional),
            method: "PUT"
        }

    fetch(url, param)
    .then(function(data)
    {
        return data.json()
    })
    .then(function(result)
    {
        if (!result.error)
            showToast(result.message, "bg-success")
        else
            showToast(result.message, "bg-success")
    })
    .catch(function(error)
    {
        console.log(error)
    })
}


function deleteProfesional() {
    let id = document.getElementById("id").value;

    if (id != ""){
        id= Number(id);

        let profesional = new Proffesional ("","","","","",id)
        
        const url = "http://localhost:5000/profesionales";

        let param = 
            {
                headers: {"Content-type": "application/json; charset= UTF-8"},
                body: JSON.stringify(profesional),
                method: "DELETE"
            }
    
        fetch(url, param)
        .then(function(data)
        {
            return data.json()
        })
        .then(function(result)
        {
            if (!result.error){
                showToast(result.message, "bg-success")
            }   
            else{
                showToast("El ID no existe", "bg-danger")
            }    
        })
        .catch(function(error)
        {
            console.log(error)
        })
    } else {
        showToast("Introduce un ID", "bg-danger")
    }
}







function validar(profesional)
{
    resultado = false
    if (profesional.name == "" || profesional.name == "null")
    {
        showToast("AVISO: Campo nombre no informado", "bg-warning")
    }
    else if (profesional.age == "" || profesional.age == "null")
    {
        showToast("AVISO: Campo edad no informado", "bg-warning")
    }
    else if (profesional.genre == "" || profesional.genre == "null")
    {
        showToast("AVISO: Campo genero no informado", "bg-warning")
    }
    else if (profesional.weight == "" || profesional.weight == "null")
    {
        showToast("AVISO: Campo peso no informado", "bg-warning")
    }
    else if (profesional.height == "" || profesional.height == "null")
    {
        showToast("AVISO: Campo altura no informado", "bg-warning")
    }
    else
        resultado = true

    return resultado;
}

function showToast(message, color)
{
    document.getElementById("toastText").innerText=message;
    let toastElement  = document.getElementById('toast')

    toastElement.className = toastElement.className.replace("bg-warning").replace("bg-danger") + " "  + color;

    let toast = new bootstrap.Toast(toastElement)
    toast.show()
}