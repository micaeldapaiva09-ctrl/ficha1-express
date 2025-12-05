const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'ficheiro_menu.txt');

function lerFicheiro() {
  if (!fs.existsSync(filePath)) return "[]";
  return fs.readFileSync(filePath, 'utf8');
}

function gravarFicheiro(data) {
  fs.writeFileSync(filePath, data, 'utf8');
}

module.exports = { lerFicheiro, gravarFicheiro };
