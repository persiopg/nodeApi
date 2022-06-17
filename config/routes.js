const express = require('express');
const routes = express.Router();

var db = [
    {nome:'joao',email:'joao@gmail.com',password:'123456', usuario: 'joaoj'},
    {nome:'maria',email:'maria@gmail.com',password:'123456', usuario: 'mariam'},
    {nome:'jose',email:'jose@gmail.com',password:'123456', usuario: 'josej'}
]

// buscar Dados
routes.get('/', (req, res) => {
    return res.json(db);
});

// inserir dados
routes.post('/cadastrar', (req, res) => {
    const body = req.body;
    console.log(verificaExiste(body));
    if(validaSenha(body)){
        return res.json("Senha invalida");
    }else{

        if(verificaExiste(body)){
            return res.json("Usuario ja existe ou email ja cadastrado");
        }
        else{            
        db.push(body);
        return res.json(db);
        };    
    };    
});

// deleta cadastro
routes.delete('/userDelet/:id', (req, res) => {
    const id = req.params.id;

    let newDb = db[id];
    if(newDb == undefined || newDb == null){
        return res.json("Usuario não encontrado");
    }
    db.splice(id, 1);
    return res.json(newDb);
});

//retorna usuario por id
routes.get('/user/:id', (req, res) => {
    const id = req.params.id;

    if(db[id] == undefined || db[id]== null){
        return res.json("Usuario não encontrado");
    }

    return res.json(db[id]);
});

routes.put('/alterar/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    if(db[id] == undefined || db[id] == null){
        return res.json("Usuario não encontrado");
    }
    
    if(validaSenha(body)){
        return res.json("Senha invalida");
    }else{

        if(verificaExiste(body)){
            return res.json("Usuario ja existe ou email ja cadastrado");
        }
        else{            
            db[id] = body;
            return res.json(db[id]);
        };    
    }
    
});


module.exports = routes;

//verifica se exite usuario ou email cadastrado
function verificaExiste(body){
    for(let i = 0; i < db.length; i++){
        if(body.email == db[i].email || body.usuario == db[i].usuario){
            return true;
        }
    }
    return false;
}

//verifica se senha é valida
function validaSenha(body){
    if(body.password.length < 6){
        return true;
    }
    return false;
}