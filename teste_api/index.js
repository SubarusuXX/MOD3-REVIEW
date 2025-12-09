const express = require ("express");

const app = express();
//middleware para ler JSON
app.use(express.json());

//array para armazenar pessoas
const pessoas = [{
    nome: "João",
    email: "joao@gmail.com",
    status: true
}];

//funcao para consultar pessoas
app.get("/consultar", (request, response) => {
    const { nome, email, status } = request.query;

    let resultado = pessoas;

    // Filtro por nome
    if (nome) {
        resultado = resultado.filter((i) => i.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    // Filtro por email
    if (email) {
        resultado = resultado.filter((i) => i.email.toLowerCase().includes(email.toLowerCase()));
    }

    // Filtro por status
    if (status !== undefined) {
        resultado = resultado.filter((i) => i.status === (status === 'true'));
    }

    return response.send(resultado);
});
//funcao para cadastrar pessoa
app.post("/cadastrar",(request,response) => {
    const { nome, email, status } = request.body;

    pessoas.push({ nome, email, status });

    return response.send({nome, email, status});
});
//iniciar o servidor
app.listen(8080,() => {
    console.log("Servidor rodando na porta 8080");
});