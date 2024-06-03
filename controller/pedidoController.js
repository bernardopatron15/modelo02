const Pedido = require('../model/Pedido')

function add(req, res) {
    let pedido = new Pedido({
      nome: req.body.nome,
      cpf: req.body.cpf,
      email: req.body.email,
      endereco: req.body.endereco,
      cidade: req.body.cidade,
      cep: req.body.cep,
      celular: req.body.celular,
    });
  
    produto.save()
      .then(function (pedido) {
        res.redirect("/home");
      })
      .catch(function (err) {
        res.send(err);
      });
  }


function listar(req, res) {
    Pedido.find({}).then(function (pedidos, err) {
        if (err) {
            res.send(err);
        } else {
            res.render('pedido/lst', {
                Pedidos: pedidos
            });
        }
    });
}

function filtrar(req, res) {
    Pedido.find({
        titulo: new RegExp(req.body.pesquisar.split(' ').join('.*'), 'ig')
    }).then(function (pedidos, err) {
        if (err) {
            res.send(err)
        } else {
            res.render('pedido/lst', {
                Pedidos: pedidos
            })
        }
    })
}

function del(req, res) {
    Pedido.findByIdAndDelete(req.params.id).then(function (pedido, err) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/pedido/lst')
        }
    })
}

module.exports = {
    add,
    listar,
    filtrar,
    del
}