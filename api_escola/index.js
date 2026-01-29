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

    const {id} = request.query;

    var data = [];

try {
    if (id) {
        data = await db("ALUNOS").select().where({ id });
    } else {
        data = await db("ALUNOS").select();
    }

    response.send(data);
} catch (error) {
    console.log(error);
    response.status(500).send("Erro ao buscar alunos."); 
});

app.post("/cadastrar", async (request, response) => {
    const { id, nome, ra } = request.body;
    
    const data = await db("ALUNOS").insert({ id, nome, ra });

    if (data.length >0 ){
        response.send("Aluno cadastrado com sucesso!");
    } else {
        response.status(500).send("Erro ao cadastrar aluno.");
    }

    response.send({ nome, ra });
});


app.put("/atualizar/:id", async (request, response) => {
    const { id } = request.params;
    const { nome, ra, status } = request.body


    if (!Number.isInteger(Number(id))){
        response.send ({msg: "O parametro ID precisa ser um número inteiro."});
    }

    const data = await db("ALUNOS").update ({ 
        nome, 
        ra,
        status
    }).where({ id });

    if (data == 1) {
        response.send({msg:"Aluno atualizado com sucesso!"});
    } else {
        response.send({msg:"Erro ao atualizar aluno."});
    }

    response.send({id, nome, ra, status});
    
});

app.delete("/deletar/:id", async(request, response) => {

    const { id } = request.params;

    const data = await db ("ALUNOS").delete().where({ id });

    if (data == 1) {
        response.send("Aluno deletado com sucesso!");
    } else {
        response.send("Erro ao deletar aluno.");
    }
    response.send("Aluno deletado com sucesso!");
});


//iniciar o servidor guri
app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});

