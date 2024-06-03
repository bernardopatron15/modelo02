const Produto = require("../model/Produto");
const Categoria = require('../model/Categoria');

function abreadd(req, res) {
  console.log("oi mundo")
  Categoria.find({})
    .then(function(categorias) {
      res.render('produto/add', {
        Produto: {}, // Passa um objeto vazio como Produto
        Categorias: categorias
      });
    })
    .catch(function(err) {
      res.send("oi mundo");
    }); 
}


function add(req, res) {
  let produto = new Produto({
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    categoria: req.body.categoria,
    preco: parseInt(req.body.preco),
    foto: req.file.filename,
  });

  produto.save()
    .then(function (produto) {
      res.redirect("/produto/add");
    })
    .catch(function (err) {
      res.send(err);
    });
}

function listar(req, res) {
  Produto.find({}).populate('categoria').then(function (produtos, err) {
    if (err) {
      res.send(err);
    } else {
      Categoria.find({}).then(function(categorias) {
        res.render('produto/lst', {
          Produtos: produtos,
          Categorias: categorias
        });
      }).catch(function(err) {
        res.send(err);
      });async function abreproduto(req, res) {
        Produto.findById(req.params.id).populate('categoria').then(function (produto, err) {
          if (err) {
              res.send(err)
          } else {
              res.render('produto', {
                  produto: produto
              })
          }
      })
      }
    }
  });
}

function filtrar(req, res) {
  Produto.find({
    titulo: new RegExp(req.body.pesquisar.split(" ").join(".*"), "ig"),
  })
    .then(function (produtos) {
      res.render("produto/lst", {
        Produtos: produtos,
      });
    })
    .catch(function (err) {
      res.send(err);
    });
}

function del(req, res) {
  Produto.findByIdAndDelete(req.params.id)
    .then(function () {
      res.redirect("/produto/lst");
    })
    .catch(function (err) {
      res.send(err);
    });
}

function abreedt(req, res) {
  Produto.findById(req.params.id)
    .then(function (produto) {
      res.render("produto/edt", {
        Produto: produto,
      });
    })
    .catch(function (err) {
      res.send(err);
    });
}

function edt(req, res) {
  Produto.findById(req.params.id)
    .then(function (produto) {
      let tempo = req.body.tempo;
      let [hora, minuto] = tempo.split(":");
      let data = new Date();
      data.setHours(hora);
      data.setMinutes(minuto);

      produto.titulo = req.body.titulo;
      produto.descricao = req.body.descricao;
      produto.categoria = req.body.categoria;
      produto.preco = req.body.preco;
      produto.foto = req.body.foto;

      return produto.save();
    })
    .then(function () {
      res.redirect("/produto/lst");
    })
    .catch(function (err) {
      res.send(err);
    });
}

module.exports = {
  abreadd,
  add,
  listar,
  filtrar,
  abreedt,
  edt,
  del,
};
