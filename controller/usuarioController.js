const Usuario = require("../model/Usuario");
const Produto = require("../model/Produto");

function abreadd(req, res) {
  res.render("usuario/add");
}

function abrelogin(req, res) {
  res.render("login");
}

function abrehome(req, res) {
  Produto.find({}).populate('categoria').then(function (produtos, err) {
    if (err) {
        res.send(err)
    } else {
        res.render('home', {
            Produtos: produtos,
            usuario: req.user // Supondo que o objeto de usuário esteja disponível em req.user
        })
    }
  });
}

function renderHome(req, res) {
  res.render('home'); // Supondo que você queira renderizar a página 'home.ejs'
}

function abrecategoria(req, res) {
  res.render("categoria");
}

async function abrecheckout(req, res) {
  try {
    const produto = await Produto.findById(req.params.id).populate('categoria');
    res.render('checkout', {
      produto: produto,
      usuario: req.user // Supondo que o objeto de usuário esteja disponível em req.user
    });
  } catch (err) {
    res.send(err);
  }
}

async function abreproduto(req, res) {
  try {
    const produto = await Produto.findById(req.params.id).populate('categoria');
    res.render('produto', {
      produto: produto,
      usuario: req.user // Supondo que o objeto de usuário esteja disponível em req.user
    });
  } catch (err) {
    res.send(err);
  }
}


function add(req, res) {
  let usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    foto: req.file.filename,
    cpf: req.body.cpf,
    endereco: req.body.endereco,
    cidade: req.body.cidade,
    cep: req.body.cep,
    celular: req.body.celular,
  });

  usuario.save().then(function (usuario, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/usuario/add");
    }
  });
}

function listar(req, res) {
  Usuario.find({}).then(function (usuarios, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("usuario/lst", { Usuarios: usuarios });
    }
  });
}

function filtrar(req, reviewss) {
  Usuario.find({
    nome: new RegExp(req.body.pesquisar.split(" ").join(".*"), "ig"),
  }).then(function (usuarios, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("usuario/lst", { Usuarios: usuarios });
    }
  });
}

function del(req, res) {
  Usuario.findByIdAndDelete(req.params.id).then(function (usuario, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/usuario/lst");
    }
  });
}

function abreedt(req, res) {
  Usuario.findById(req.params.id).then(function (usuario, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("usuario/edt", { Usuario: usuario });
    }
  });
}

function edt(req, res) {
  Usuario.findById(req.params.id).then(function (usuario, err) {
    if (err) {
      res.send(err);
    } else {
      usuario.nome = req.body.nome;
      usuario.email = req.body.email;
      usuario.senha = req.body.senha; // Correção aqui
      usuario.foto = req.body.foto;
      usuario.cpf = req.body.cpf;
      usuario.endereco = req.body.endereco;
      usuario.cidade = req.body.cidade;
      usuario.cep = req.body.cep;
      usuario.celular = req.body.celular;
      usuario.save().then(function (usuario, err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/usuario/lst");
        }
      });
    }
  });
}

function logout(req, res) {
  // Aqui você pode limpar as informações de autenticação do usuário, como remover o token de sessão, limpar cookies, etc.
  
  // Redireciona o usuário para a página de login após o logout
  res.redirect('/home');
}

module.exports = {
  edt,
  abreedt,
  del,
  filtrar,
  listar,
  add,
  abreadd,
  abrelogin,
  abrehome,
  abrecategoria,
  abrecheckout,
  abreproduto,
  renderHome,
  logout,
};
