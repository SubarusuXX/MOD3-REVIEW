const express = require ("express");

const app = express();


app.use(express.json())

const carros = [
    { id: 1, modelo: "Gol", marca: "Volkswagen", ano: 2020 },
    { id: 2, modelo: "Onix", marca: "Chevrolet", ano: 2021 },
    { id: 3, modelo: "Fiesta", marca: "Ford", ano: 2019 }
]

var contador = 4;
//Consulta de todos os carros
app.get("/carros", (request, response) => {
    response.status(200).json(carros);
});

//cadastrar um novo carro
app.post("/carros", (request, response) => {
    const modelo = request.body.modelo;
    const marca = request.body.marca;
    const ano = request.body.ano; 
    const status = request.body.status;
    
    contador++;

    carros.push({
        id: contador,
        modelo: modelo,
        marca: marca,
        ano: ano,
        status: status
    })

    return response.send(carros);
});

app.get("/carros",(request,response)=>{
    response.status(200).send("soporuqe e gostosinha");
})

app.listen(8080,function(){
    console.log ("Toma sua Filha da Fruta");
})


// para fununciar 127.0.0.1:8080/alunos