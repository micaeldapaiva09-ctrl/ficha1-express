const express = require('express');
const router = express.Router();
const Prato = require('../Models/PratoModel');


router.get('/', async (req, res) => {
  try {
    const lista = await Prato.find().sort({ cod: 1 });
    return res.status(200).json(lista);
  } catch (err) {
    return res.status(500).json({ error: "Erro interno" });
  }
});


router.get('/:cod', async (req, res) => {
  try {
    const cod = Number(req.params.cod);
    const prato = await Prato.findOne({ cod });
    if (!prato) return res.status(400).json({ error: "Código não encontrado" });
    return res.status(200).json(prato);
  } catch (err) {
    return res.status(500).json({ error: "Erro interno" });
  }
});


router.post('/', async (req, res) => {
  const { cod, nome, categoria, tipo } = req.body;

  if (!cod || !nome || !categoria || !tipo) {
    return res.status(400).json({ error: "Body inválido — faltam campos" });
  }

  try {
    const prato = new Prato({
      cod,
      nome,
      categoria,
      tipo
    });

    await prato.save();
    res.status(201).json(prato);
  } catch (err) {
    res.status(500).json({ error: "Erro ao inserir no MongoDB" });
  }
});



router.patch('/:cod', async (req, res) => {
  try {
    const cod = Number(req.params.cod);
    const { nome, categoria, tipo } = req.body;

    const prato = await Prato.findOne({ cod });
    if (!prato) return res.status(400).json({ error: "Código não encontrado" });

    if (nome) prato.nome = nome;
    if (categoria) prato.categoria = categoria;
    if (tipo) prato.tipo = tipo;

    await prato.save();

    return res.status(200).json({ message: "Prato atualizado", prato });
  } catch (err) {
    return res.status(500).json({ error: "Erro interno" });
  }
});


router.delete('/:cod', async (req, res) => {
  try {
    const cod = Number(req.params.cod);
    const removido = await Prato.findOneAndDelete({ cod });

    if (!removido) return res.status(400).json({ error: "Código não encontrado" });

    return res.status(200).json({ message: "Prato removido", removido });

  } catch (err) {
    return res.status(500).json({ error: "Erro interno" });
  }
});


router.delete('/', async (req, res) => {
  try {
    await Prato.deleteMany({});
    return res.status(200).json({ message: "Todos os pratos removidos" });
  } catch (err) {
    return res.status(500).json({ error: "Erro interno" });
  }
});

module.exports = router;
