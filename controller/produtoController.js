const Produto = require('../model/Produto')

function abreadd(req, res) {
    res.render('produto/add')
}

function add(req, res) {
    let tempo = req.body.tempo; // Supondo que você esteja recebendo o valor do formulário corretamente

    // Obtendo a hora e minuto a partir do valor do tempo
    let [hora, minuto] = tempo.split(':');

    // Criando um novo objeto Date
    let data = new Date();
    data.setHours(hora);
    data.setMinutes(minuto);
    let produto = new Produto({
        titulo: req.body.titulo,
        genero: req.body.genero,
        diretor: req.body.diretor,
        ano: parseInt(req.body.ano),
        foto: req.body.foto,
        tempo: data
    })

    produto.save().then(function (produto, err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/produto/add")
        }
    })
}

function listar(req, res) {
    Produto.find({}).then(function (produtos, err) {
        if (err) {
            res.send(err)
        } else {
            res.render('produto/lst', {
                Produtos: produtos
            })
        }
    })
}

function filtrar(req, res) {
    Produto.find({
        titulo: new RegExp(req.body.pesquisar.split(' ').join('.*'), 'ig')
    }).then(function (produtos, err) {
        if (err) {
            res.send(err)
        } else {
            res.render('produto/lst', {
                Produtos: produtos
            })
        }
    })
}

function del(req, res) {
    Produto.findByIdAndDelete(req.params.id).then(function (produto, err) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/produto/lst')
        }
    })
}

function abreedt(req, res) {
    Produto.findById(req.params.id).then(function (produto, err) {
        if (err) {
            res.send(err)
        } else {
            res.render('produto/edt', {
                Produto: produto
            })
        }
    })
}

function edt(req, res) {
    Produto.findById(req.params.id).then(function (produto, err) {
        if (err) {
            res.send(err)
        } else {
            let tempo = req.body.tempo; 
            // Obtendo a hora e minuto a partir do valor do tempo
            let [hora, minuto] = tempo.split(':');

            // Criando um novo objeto Date
            let data = new Date();
            data.setHours(hora);
            data.setMinutes(minuto);
            produto.titulo = req.body.titulo;
            produto.genero = req.body.genero;
            produto.diretor = req.body.diretor;
            produto.ano = req.body.ano;
            produto.foto = req.body.foto;
            produto.tempo = data;
            produto.save().then(function (produto, err) {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect('/produto/lst')
                }const express = require('express');
                const path = require('path');
                const app = express();const express = require('express');
                const path = require('path');
                const app = express();
                const port = process.env.PORT || 3000
                
                app.use(express.urlencoded({extended:true}))
                app.set('view engine', 'ejs');
                
                app.use(express.static(path.join(__dirname, 'public')));
                
                const usuarioroutes = require('./routes/UsuarioRoutes')
                const produtoroutes = require('./routes/ProdutoRoutes')
                const postRoutes = require('./routes/PostRoutes')
                app.use(usuarioroutes)
                app.use(produtoroutes)
                app.use(postRoutes)
                
                app.listen(port, function(){
                    console.log('Servidor funcionando!')
                })
                const port = process.env.PORT || 3000
                
                app.use(express.urlencoded({extended:true}))
                app.set('view engine', 'ejs');
                
                app.use(express.static(path.join(__dirname, 'public')));
                
                const usuarioroutes = require('./routes/UsuarioRoutes')
                const produtoroutes = require('./routes/ProdutoRoutes')
                const postRoutes = require('./routes/PostRoutes')
                app.use(usuarioroutes)
                app.use(produtoroutes)
                app.use(postRoutes)
                
                app.listen(port, function(){
                    console.log('Servidor funcionando!')
                })
            })
        }
    })
}




module.exports = {
    abreadd,
    add,
    listar,
    filtrar,
    abreedt,
    edt,
    del
}