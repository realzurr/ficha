const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../database');
const { filterValidColumns } = require('../database');

// Validações
const fichaValidation = [
  body('nome_completo').notEmpty().withMessage('Nome é obrigatório')
];

// GET /api/fichas - Listar todas as fichas
router.get('/', (req, res) => {
  try {
    const { search, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM fichas_anamnese';
    let countQuery = 'SELECT COUNT(*) as total FROM fichas_anamnese';
    const params = [];
    
    if (search) {
      const searchClause = ' WHERE nome_completo LIKE ? OR cpf LIKE ? OR email LIKE ?';
      query += searchClause;
      countQuery += searchClause;
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    
    const fichas = db.prepare(query).all(...params, parseInt(limit), parseInt(offset));
    const { total } = db.prepare(countQuery).get(...params);
    
    res.json({
      fichas,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar fichas:', error);
    res.status(500).json({ error: 'Erro ao buscar fichas' });
  }
});

// GET /api/fichas/:id - Buscar ficha por ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const ficha = db.prepare('SELECT * FROM fichas_anamnese WHERE id = ?').get(id);
    
    if (!ficha) {
      return res.status(404).json({ error: 'Ficha não encontrada' });
    }
    
    res.json(ficha);
  } catch (error) {
    console.error('Erro ao buscar ficha:', error);
    res.status(500).json({ error: 'Erro ao buscar ficha' });
  }
});

// POST /api/fichas - Criar nova ficha
router.post('/', fichaValidation, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const data = req.body;
    
    // Filtrar apenas colunas válidas do banco
    const filtered = filterValidColumns(data);
    
    // Converter arrays/objetos para JSON strings
    if (filtered.transtornos_personalidade && Array.isArray(filtered.transtornos_personalidade)) {
      filtered.transtornos_personalidade = JSON.stringify(filtered.transtornos_personalidade);
    }
    if (filtered.vicios && Array.isArray(filtered.vicios)) {
      filtered.vicios = JSON.stringify(filtered.vicios);
    }
    if (filtered.pratica_autoconhecimento && Array.isArray(filtered.pratica_autoconhecimento)) {
      filtered.pratica_autoconhecimento = JSON.stringify(filtered.pratica_autoconhecimento);
    }
    
    // Adicionar metadados
    filtered.ip_address = req.ip;
    filtered.user_agent = req.get('User-Agent');
    
    const columns = Object.keys(filtered).join(', ');
    const placeholders = Object.keys(filtered).map(() => '?').join(', ');
    const values = Object.values(filtered);
    
    const result = db.prepare(
      `INSERT INTO fichas_anamnese (${columns}) VALUES (${placeholders})`
    ).run(...values);
    
    const ficha = db.prepare('SELECT * FROM fichas_anamnese WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json(ficha);
  } catch (error) {
    console.error('Erro ao criar ficha:', error);
    res.status(500).json({ error: 'Erro ao criar ficha' });
  }
});

// PUT /api/fichas/:id - Atualizar ficha
router.put('/:id', fichaValidation, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { id } = req.params;
    const fichaExistente = db.prepare('SELECT * FROM fichas_anamnese WHERE id = ?').get(id);
    
    if (!fichaExistente) {
      return res.status(404).json({ error: 'Ficha não encontrada' });
    }
    
    const data = req.body;
    data.updated_at = new Date().toISOString();
    
    // Filtrar apenas colunas válidas do banco
    const filtered = filterValidColumns(data);
    filtered.updated_at = new Date().toISOString();
    
    // Converter arrays/objetos para JSON strings
    if (filtered.transtornos_personalidade && Array.isArray(filtered.transtornos_personalidade)) {
      filtered.transtornos_personalidade = JSON.stringify(filtered.transtornos_personalidade);
    }
    if (filtered.vicios && Array.isArray(filtered.vicios)) {
      filtered.vicios = JSON.stringify(filtered.vicios);
    }
    if (filtered.pratica_autoconhecimento && Array.isArray(filtered.pratica_autoconhecimento)) {
      filtered.pratica_autoconhecimento = JSON.stringify(filtered.pratica_autoconhecimento);
    }
    
    const setClause = Object.keys(filtered).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(filtered), id];
    
    db.prepare(`UPDATE fichas_anamnese SET ${setClause} WHERE id = ?`).run(...values);
    
    const ficha = db.prepare('SELECT * FROM fichas_anamnese WHERE id = ?').get(id);
    res.json(ficha);
  } catch (error) {
    console.error('Erro ao atualizar ficha:', error);
    res.status(500).json({ error: 'Erro ao atualizar ficha' });
  }
});

// DELETE /api/fichas/:id - Deletar ficha (soft delete)
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const ficha = db.prepare('SELECT * FROM fichas_anamnese WHERE id = ?').get(id);
    
    if (!ficha) {
      return res.status(404).json({ error: 'Ficha não encontrada' });
    }
    
    // Soft delete - marcar como deletada
    db.prepare('UPDATE fichas_anamnese SET updated_at = ? WHERE id = ?')
      .run(new Date().toISOString(), id);
    
    res.json({ message: 'Ficha removida com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar ficha:', error);
    res.status(500).json({ error: 'Erro ao deletar ficha' });
  }
});

// GET /api/fichas/stats/overview - Estatísticas
router.get('/stats/overview', (req, res) => {
  try {
    const total = db.prepare('SELECT COUNT(*) as total FROM fichas_anamnese').get();
    const hoje = db.prepare(
      "SELECT COUNT(*) as total FROM fichas_anamnese WHERE DATE(created_at) = DATE('now')"
    ).get();
    const semana = db.prepare(
      "SELECT COUNT(*) as total FROM fichas_anamnese WHERE created_at >= DATE('now', '-7 days')"
    ).get();
    
    res.json({
      total: total.total,
      hoje: hoje.total,
      semana: semana.total
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

module.exports = router;
