-- Tabela principal de fichas de anamnese
CREATE TABLE IF NOT EXISTS fichas_anamnese (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Dados Pessoais
  nome_completo TEXT NOT NULL,
  email TEXT,
  endereco TEXT,
  whatsapp TEXT,
  data_nascimento TEXT,
  cpf TEXT,
  sexo TEXT,
  estado_civil TEXT,
  
  -- Dados Familiares
  nome_mae TEXT,
  pais_vivos TEXT,
  nome_pai TEXT,
  tem_filhos TEXT,
  
  -- Saúde - Mulher
  menstruacao_regular TEXT,
  suspeita_gravidez TEXT,
  detalhes_gravidez TEXT,
  
  -- Saúde Geral
  diagnostico_doenca_fisica_opcao TEXT,
  diagnostico_doenca_fisica TEXT,
  cirurgias_opcao TEXT,
  cirurgias TEXT,
  doenca_cardiaca_opcao TEXT,
  doenca_cardiaca TEXT,
  pressao_arterial_opcao TEXT,
  pressao_arterial TEXT,
  convulsoes_opcao TEXT,
  convulsoes TEXT,
  cirurgia_bariatrica_opcao TEXT,
  cirurgia_bariatrica TEXT,
  
  -- Saúde Mental
  diagnostico_doenca_psiquiatrica_opcao TEXT,
  diagnostico_doenca_psiquiatrica TEXT,
  diagnostico_esquizofrenia_opcao TEXT,
  diagnostico_esquizofrenia TEXT,
  tentativas_suicidio_opcao TEXT,
  tentativas_suicidio TEXT,
  acompanhamento_psicologico TEXT,
  internacao_psiquiatrica TEXT,
  
  -- Uso de Substâncias
  uso_substancias_opcao TEXT,
  uso_substancias TEXT,
  dependente_quimico TEXT,
  oque_dependente_quimico TEXT,
  alcoolatra TEXT,
  consumo_alcool_opcao TEXT,
  consumo_alcool TEXT,
  
  -- Luto e Traumas
  em_luto TEXT,
  quem_faleceu TEXT,
  abuso_fisico TEXT,
  detalhes_abuso_fisico TEXT,
  memorias_traumaticas_infancia TEXT,
  detalhes_memorias_infancia TEXT,
  trauma_fase_adulta TEXT,
  detalhes_trauma_adulto TEXT,
  abuso_psicologico TEXT,
  detalhes_abuso_psicologico TEXT,
  
  -- Ayahuasca
  motivacao_ayahuasca TEXT,
  primeiro_contato_ayahuasca TEXT,
  experiencias_anteriores TEXT,
  expectativas TEXT,
  
  -- Transtornos de Personalidade
  transtornos_personalidade TEXT, -- JSON array
  outros_transtornos TEXT,
  fale_sobre_transtornos TEXT,
  
  -- Estilo de Vida
  religiao TEXT,
  problema_religioes TEXT,
  tempo_celular TEXT,
  profissao TEXT,
  
  -- Vícios
  vicios TEXT, -- JSON array
  outros_vicios TEXT,
  detalhes_vicios TEXT,
  
  -- Contato de Emergência
  nome_contato_emergencia TEXT,
  telefone_contato_emergencia TEXT,
  
  -- Outros
  coisas_importantes TEXT,
  medicamentos_uso_continuo TEXT,
  disponibilidade_autocura TEXT,
  pratica_autoconhecimento TEXT, -- JSON array
  outra_pratica_description TEXT,
  primeira_pratica TEXT,
  
  -- Consegue Seguir Regras
  consegue_regras TEXT,
  
  -- Metadados
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT
);

-- Tabela de usuários admin
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  nome TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices para busca
CREATE INDEX IF NOT EXISTS idx_fichas_nome ON fichas_anamnese(nome_completo);
CREATE INDEX IF NOT EXISTS idx_fichas_cpf ON fichas_anamnese(cpf);
CREATE INDEX IF NOT EXISTS idx_fichas_email ON fichas_anamnese(email);
CREATE INDEX IF NOT EXISTS idx_fichas_created ON fichas_anamnese(created_at);
