const express = require("express");
const knex = require("knex");

const db = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "admin",
        database: "escola"
    }
})

const app = express();

app.use(express.json());

app.get("/buscar", async (request, response) => {

    const data = await db("ALUNOS").select();

    console.log(data);

    response.send("Bem-vindo à API da Escola!");
});

app.post("/cadastrar", async (request, response) => {
    const { nome, ra } = request.body;
    
    const data = await db("ALUNOS").insert({ nome, ra });

    if (data.length >0 ){
        response.send("Aluno cadastrado com sucesso!");
    } else {
        response.send("Erro ao cadastrar aluno.");
    }

    response.send({ nome, ra });
});


app.put("/atualizar/:ra", (request, response) => {
    response.send("Aluno atualizado com sucesso!");
});

app.delete("/deletar/:ra", (request, response) => {
    response.send("Aluno deletado com sucesso!");
});


//iniciar o servidor guri
app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});

