const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'anamnese.db');

// Garantir que a pasta data existe
const fs = require('fs');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

// Habilitar WAL mode para melhor performance
db.pragma('journal_mode = WAL');

// Habilitar foreign keys
db.pragma('foreign_keys = ON');

// Obter colunas válidas da tabela
const validColumns = db.prepare("PRAGMA table_info(fichas_anamnese)").all().map(c => c.name);

function filterValidColumns(data) {
  const filtered = {};
  for (const key of Object.keys(data)) {
    if (validColumns.includes(key)) {
      filtered[key] = data[key];
    }
  }
  return filtered;
}

module.exports = db;
module.exports.filterValidColumns = filterValidColumns;
module.exports.validColumns = validColumns;
