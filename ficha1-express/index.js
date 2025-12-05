const express = require('express');
const app = express();
app.use(express.json());

const port = 4000;

const nomeApp = "Restaurante Micael";
const autor = "Micael";


const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/restaurante")
  .then(() => console.log("MongoDB ligado com sucesso!"))
  .catch((err) => console.log("Erro ao ligar MongoDB:", err));




const menuController = require('./Controllers/menu_do_dia_db');
app.use('/', menuController);





app.listen(port, () => {
  console.log(`${nomeApp} | autor: ${autor} | Servidor a correr na porta ${port}`);
});
