const { lerFicheiro, gravarFicheiro } = require('../shared/functions');
const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
  const conteudo = lerFicheiro();
  const lista = JSON.parse(conteudo);
  res.status(200).json(lista);
});



router.get('/:cod', (req, res) => {
  const cod = Number(req.params.cod);

  const conteudo = lerFicheiro();
  const lista = JSON.parse(conteudo);

  const prato = lista.find(p => p.cod === cod);

  if (!prato) {
    return res.status(400).json({ error: "Código não encontrado" });
  }

  res.status(200).json(prato);
});



router.post('/', (req, res) => {
  const { cod, nome, categoria, tipo } = req.body;

  if (!cod || !nome || !categoria || !tipo) {
    return res.status(400).json({ error: "Body inválido — faltam campos" });
  }

  const conteudo = lerFicheiro();
  const lista = JSON.parse(conteudo);

  // verificar se cod já existe
  if (lista.find(p => p.cod === cod)) {
    return res.status(400).json({ error: "Código já existe" });
  }

  const novoPrato = { cod, nome, categoria, tipo };
  lista.push(novoPrato);

  gravarFicheiro(JSON.stringify(lista));

  res.status(200).json({ message: "Prato adicionado", pratos: lista });
});



router.patch('/:cod', (req, res) => {
  const cod = Number(req.params.cod);
  const { nome, categoria, tipo } = req.body;

  const conteudo = lerFicheiro();
  const lista = JSON.parse(conteudo);

  const prato = lista.find(p => p.cod === cod);

  if (!prato) {
    return res.status(400).json({ error: "Código não encontrado" });
  }

  if (nome) prato.nome = nome;
  if (categoria) prato.categoria = categoria;
  if (tipo) prato.tipo = tipo;

  gravarFicheiro(JSON.stringify(lista));

  res.status(200).json({ message: "Prato atualizado", prato });
});



router.delete('/:cod', (req, res) => {
  const cod = Number(req.params.cod);

  const conteudo = lerFicheiro();
  const lista = JSON.parse(conteudo);

  const index = lista.findIndex(p => p.cod === cod);

  if (index === -1) {
    return res.status(400).json({ error: "Código não encontrado" });
  }

  const removido = lista.splice(index, 1);

  gravarFicheiro(JSON.stringify(lista));

  res.status(200).json({ message: "Prato removido", removido });
});



router.delete('/', (req, res) => {
  const lista = [];
  gravarFicheiro(JSON.stringify(lista));
  res.status(200).json({ message: "Todos os pratos removidos", pratos: lista });
});


module.exports = router;
