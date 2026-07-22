const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'tenda-do-xamas-secret-key-change-in-production';

// POST /api/auth/login - Login
router.post('/login', [
  body('username').notEmpty().withMessage('Usuário é obrigatório'),
  body('password').notEmpty().withMessage('Senha é obrigatória')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { username, password } = req.body;
    
    const user = db.prepare('SELECT * FROM usuarios WHERE username = ?').get(username);
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const validPassword = bcrypt.compareSync(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username, nome: user.nome },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        nome: user.nome
      }
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// POST /api/auth/register - Registrar novo usuário (apenas admin)
router.post('/register', [
  body('username').notEmpty().withMessage('Usuário é obrigatório'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('admin_token').equals('tenda-xamas-2024').withMessage('Token de admin inválido')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { username, password, nome } = req.body;
    
    // Verificar se usuário já existe
    const existingUser = db.prepare('SELECT id FROM usuarios WHERE username = ?').get(username);
    
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }
    
    // Criar hash da senha
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    
    // Inserir usuário
    const result = db.prepare(
      'INSERT INTO usuarios (username, password_hash, nome) VALUES (?, ?, ?)'
    ).run(username, passwordHash, nome);
    
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: {
        id: result.lastInsertRowid,
        username,
        nome
      }
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// GET /api/auth/verify - Verificar token
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;
