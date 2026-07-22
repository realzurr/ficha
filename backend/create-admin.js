const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, 'data', 'anamnese.db');

// Garantir que a pasta data existe
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

// Criar tabela de usuários se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nome TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Verificar se já existe um admin
const existingAdmin = db.prepare('SELECT id FROM usuarios WHERE username = ?').get('admin');

if (existingAdmin) {
  console.log('Usuário admin já existe!');
  console.log('Usuário: admin');
  console.log('Senha: admin123');
} else {
  // Criar usuário admin padrão
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('admin123', salt);
  
  db.prepare('INSERT INTO usuarios (username, password_hash, nome) VALUES (?, ?, ?)')
    .run('admin', passwordHash, 'Administrador');
  
  console.log('Usuário admin criado com sucesso!');
  console.log('');
  console.log('=== CREDENCIAIS DE ACESSO ===');
  console.log('Usuário: admin');
  console.log('Senha: admin123');
  console.log('');
  console.log('IMPORTANTE: Altere a senha após o primeiro login!');
}

db.close();
