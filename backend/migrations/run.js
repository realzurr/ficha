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

// Ler e executar migrações
const migrationFile = path.join(__dirname, '001_create_fichas.sql');
const migration = fs.readFileSync(migrationFile, 'utf8');

console.log('Executando migrações...');
db.exec(migration);
console.log('Migrações concluídas com sucesso!');

db.close();
