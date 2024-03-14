const Produto = require('../model/Produto')

function abreadd(req, res) {
    res.render('produto/add')
}

function add(req, res) {
   // Supondo que você esteja recebendo o valor do formulário corretamente

    // Obtendo a hora e minuto a partir do valor do tempo

    // Criando um novo objeto Date
    let produto = new Produto({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        preco: parseInt(req.body.preco),
        foto: req.body.foto,
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
        if (err) {<td>
            <img style="width: 200px;" src="/fotos/<%=usuario.foto %>" alt="Foto do Usuário">
        </td>
            res.send(err)
        } else {
            res.render('produto/lst', {
                Produtos: produtos
            })
        }
    })
}<td>
<img style="width: 200px;" src="/fotos/<%=usuario.foto %>" alt="Foto do Usuário">
</td>

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
            produto.descricao = req.body.descricao;
            produto.categorias = req.body.categorias;
            produto.preco = req.body.preco;
            produto.foto = req.body.foto;
            produto.save().then(function (produto, err) {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect('/produto/lst')
                }
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