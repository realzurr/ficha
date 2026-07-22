const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, '..', 'data', 'anamnese.db');

// Garantir que a pasta data existe
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

// Executar todas as migrations .sql em ordem
const migrationFiles = fs.readdirSync(__dirname)
  .filter(f => f.endsWith('.sql'))
  .sort();

for (const file of migrationFiles) {
  const migration = fs.readFileSync(path.join(__dirname, file), 'utf8');
  console.log(`Executando ${file}...`);
  db.exec(migration);
}

console.log('Migrações concluídas com sucesso!');

db.close();
