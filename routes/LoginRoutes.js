const express = require("express");
const router = express.Router();
const Usuario = require("../model/Usuario");

router.post("/", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca o usuário no banco de dados
    const usuario = await Usuario.findOne({ email, senha });

    if (usuario) {
      // Autenticação bem-sucedida
      res.redirect("/home"); // Redireciona para a página inicial após o login
    } else {
      // Credenciais inválidas
      res.status(401).send("Nome de usuário ou senha incorretos");
    }
  } catch (error) {
    console.error("Erro ao tentar fazer login:", error);
    res.status(500).send("Ocorreu um erro ao tentar fazer login");
  }
});

module.exports = router;
