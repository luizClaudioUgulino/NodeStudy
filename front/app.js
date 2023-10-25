

/// importações dos modulos
var express = require('express');
var fetch = require('node-fetch');
var expressHandlebars = require('express-handlebars');
var bodyparser = require('body-parser');


// app
var app = express();

// body-parser

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// template
app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'principal' }));
app.set('view engine', 'handlebars');

// Especificar arquivos estáticos
app.use(express.static(__dirname + '/publico'));


//rotas

app.get('/', function (req, res) {
    
    fetch('http://localhost:3000/clientes',{method:'GET'})
    .then(resposta => resposta.json())
    .then(resposta => res.render('inicio', {
        dados:resposta
    }));

});


app.post('/cadastrar', function(req,res){
let nome = req.body.nome;
let idade = req.body.idade;
let dados = {'nome': nome, 'idade': idade};

fetch('http://localhost:3000/clientes', {
    method:'POST',
    body: JSON.stringify(dados),
    headers:{'Content-Type':'application/json'}
})
.then(res.redirect('/'));

});

app.get('/selecionar/:id', function(req,res){
let id = req.params.id;

fetch('http://localhost:3000/clientes/' + id, {method:'GET'})
.then(resposta => resposta.json())
.then(resposta => res.render('selecionar', {dados:resposta}));


})

app.post('/editar', function(req,res){
    let nome = req.body.nome;
    let idade = req.body.idade;
    let id = req.body.id;
    
    fetch('http://localhost:3000/clientes/' + id, {
        method:'PUT',
        body: JSON.stringify({'nome': nome, 'idade': idade}),
        headers:{'Content-Type':'application/json'}
    })
    .then(res.redirect('/'));
    
    });

    app.get('/remover/:id', function(req,res){
        let id = req.params.id;
        fetch('http://localhost:3000/clientes/' + id, {method:'DELETE'})
        .Then(res.redirect('/'));
    });




app.listen(8080);