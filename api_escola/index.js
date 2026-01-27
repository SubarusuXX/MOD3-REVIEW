const express = require("express");

const app = express();

// app.use(express.json());

app.get("/consultar", (request, response) => {
      response.send("Bem-vindo à API da Escola!");
});

app.post("/cadastrar", (request, response) => {
    const { nome, ra } = request.body;
    //para cadastrar o aluno
    response.send({ nome, ra });
});

//iniciar o servidor guri
app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});

