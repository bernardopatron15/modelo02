const Usuario = require("../model/Usuario");

function abreadd(req, res) {
  res.render("adm/add");
}

function add(req, res) {
  let adm = new Adm({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
  });

  adm.save().then(function (adm, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/adm/add");
    }
  });
}

function listar(req, res) {
  Adm.find({}).then(function (adms, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("adm/lst", { Adms: adms });
    }
  });
}

function filtrar(req, res) {
  Adm.find({
    nome: new RegExp(req.body.pesquisar.split(" ").join(".*"), "ig"),
  }).then(function (adms, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("adm/lst", { Adms: adms });
    }
  });
}

function del(req, res) {
  Adm.findByIdAndDelete(req.params.id).then(function (adm, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/adm/lst");
    }
  });
}

function abreedt(req, res) {
  Adm.findById(req.params.id).then(function (adm, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("adm/edt", { Adm: adm });
    }
  });
}

function edt(req, res) {
  Adm.findById(req.params.id).then(function (adm, err) {
    if (err) {
      res.send(err);
    } else {
      adm.nome = req.body.nome;
      adm.email = req.body.email;
      adm.senha = req.body.senha;
      adm.save().then(function (adm, err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/adm/lst");
        }
      });
    }
  });
}


module.exports = {
  edt,
  abreedt,
  del,
  filtrar,
  listar,
  add,
  abreadd,
};
