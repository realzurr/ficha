const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { parse } = require('csv-parse/sync');

const DB_PATH = path.join(__dirname, 'data', 'anamnese.db');
const CSV_PATH = path.join(__dirname, '..', '..', 'fichas', 'Ficha_de_Anamnese_da_Tenda_do_Xamãs_242438508373056', '242438508373056.csv');

// Ler o arquivo CSV
console.log('Lendo arquivo CSV...');
const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');

// Parse do CSV
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  relax_column_count: true
});

console.log(`Encontradas ${records.length} fichas no CSV`);

// Conectar ao banco
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Mapeamento das colunas CSV para campos do banco
const mapCSVToDB = (record) => {
  // Processar nome (juntar Nome e Sobrenome)
  const nome = [record['Nome'], record['Sobrenome']].filter(Boolean).join(' ').trim();
  
  // Processar endereço (juntar rua, bairro, cidade, estado, cep)
  const enderecoParts = [
    record['Endereço (Rua, Número)'],
    record['Bairro'],
    record['Cidade'],
    record['Estado'],
    record['CEP / Código Postal']
  ].filter(Boolean);
  const endereco = enderecoParts.join(', ');
  
  // Processar transtornos de personalidade
  let transtornos = record['Tem diagnóstico ou Suspeita de algum desses transtornos de personalidade?'] || '';
  if (transtornos === 'NENHUM') transtornos = '';
  
  // Processar vícios
  let vicios = record['Você tem algum desses vícios?'] || '';
  if (vicios === 'Nenhum Vicio' || vicios === 'NENHUM') vicios = '';
  
  // Processar práticas de autoconhecimento
  let praticas = record['Se você ainda não deseja consagrar da Medicina Ayahuasca qual dessas outras praticas para auto conhecimento, auto cura e expansao da consciencia interessa voce?'] || '';
  
  // Converter SIM/NAO/Sim/Não para padronização
  const normalizeYesNo = (value) => {
    if (!value) return '';
    const upper = value.toUpperCase();
    if (upper === 'SIM' || upper === 'S' || upper === 'YES' || upper === 'SS') return 'Sim';
    if (upper === 'NÃO' || upper === 'NAO' || upper === 'N' || upper === 'NO') return 'Não';
    return value;
  };

  return {
    nome_completo: nome,
    email: record['E-mail'] || '',
    endereco: endereco,
    whatsapp: record['WhatsApp'] || '',
    data_nascimento: record['Data de Nascimento'] || '',
    cpf: record['CPF'] || '',
    sexo: record['Sexo'] || '',
    estado_civil: record['Qual seu estado cívil?'] || '',
    
    nome_mae: record['Nome de sua Mãe'] || '',
    pais_vivos: record['Seus pais são Vivos?'] || '',
    nome_pai: record['Nome de seu Pai'] || '',
    tem_filhos: normalizeYesNo(record['Você tem filhos?']),
    
    menstruacao_regular: normalizeYesNo(record['Se MULHER responda. Mestruação Regular?']),
    suspeita_gravidez: normalizeYesNo(record['Se MULHER responda. Tem Suspeita de Gravidez?']),
    detalhes_gravidez: record['Detalhes da gravidez, caso esse seja o caso.'] || '',
    
    diagnostico_doenca_fisica: record['Possui algum diagnóstico de doença física?'] || '',
    cirurgias: record['Realizou alguma cirurgia? Descreva.'] || '',
    doenca_cardiaca: record['Possui alguma doença Cardíaca? Descreva.'] || '',
    pressao_arterial: record['Como é sua Pressão Arterial? Descreva.'] || '',
    convulsoes: record['Já teve CONVULSÃO? Sabe o porquê? Descreva.'] || '',
    cirurgia_bariatrica: record['Fez cirurgia BARIÁTRICA? Descreva.'] || '',
    
    diagnostico_doenca_psiquiatrica: record['Tem diagnóstico de DOENÇA PSIQUIÁTRICA? Descreva.'] || '',
    diagnostico_esquizofrenia: record['Tem Diagnóstico de ESQUISOFRENIA? Alguém da familia tem diagóstico? Descreva.'] || '',
    tentativas_suicidio: record['Já tentou SUICÍDIO? Descreva.'] || '',
    acompanhamento_psicologico: normalizeYesNo(record['Faz Acompanhamento psicológico?']),
    internacao_psiquiatrica: normalizeYesNo(record['Já precisou passar por internação psiquiátrica?']),
    
    uso_substancias: record['Faz uso de alguma substância química e/ou alucinógena? Descreva.'] || '',
    dependente_quimico: normalizeYesNo(record['Se considera dependente químico?']),
    oque_dependente_quimico: record['Para você, o que seria um dependente químico?'] || '',
    alcoolatra: normalizeYesNo(record['Se considera alcóolatra?']),
    consumo_alcool: record['Caso consuma "uma cervejinha" no final de semana, quantas geralmente consome? Costuma consumir mais de uma vez na semana? Descreva.'] || '',
    
    em_luto: normalizeYesNo(record['Está em LUTO?']),
    quem_faleceu: record['Caso esteja em LUTO, quem veio a falecer?'] || '',
    abuso_fisico: normalizeYesNo(record['Já sofreu algum abuso físico?']),
    detalhes_abuso_fisico: record['Caso tenha sofrido, descreva quem foi o agressor e quando ocorreu.'] || '',
    memorias_traumaticas_infancia: normalizeYesNo(record['Possui memórias traumáticas de sua infância?']),
    trauma_fase_adulta: normalizeYesNo(record['Possui algo traumático na fase adulta?']),
    detalhes_trauma_adulto: record['Descreva o que aconteceu?'] || '',
    abuso_psicologico: normalizeYesNo(record['Já sofreu abuso PSICOLÓGICO?']),
    detalhes_abuso_psicologico: record['Caso tenha sofrido, descreva quem foi o agressor e quando ocorreu.'] || '',
    
    motivacao_ayahuasca: record['O que levou a Consagrar da Medicina Ayahuasca? Descreva.'] || '',
    primeiro_contato_ayahuasca: normalizeYesNo(record['E o seu primeiro contato com a Medicina Ayahuasca?']),
    experiencias_anteriores: record['Caso nao seja a seu primeiro contato com a Medicina Ayahuasca, descreva como foram suas experiencias anteriores.'] || '',
    expectativas: record['Descreva suas expectativas com relacao ao processo que voce esta iniciando.'] || '',
    
    transtornos_personalidade: transtornos,
    outros_transtornos: record['Outros? Descreva.'] || '',
    fale_sobre_transtornos: record['Fale um pouco a respeito.'] || '',
    
    religiao: record['Qual a sua religião?'] || '',
    problema_religioes: record['Possui algum problema com Religiões?'] || '',
    tempo_celular: record['Você consegue ficar quanto tempo sem usuar seu celular?'] || '',
    profissao: record['Qual a sua profissão?'] || '',
    
    vicios: vicios,
    outros_vicios: record['O que seria o "Outros"?'] || '',
    detalhes_vicios: record['Fale sobre esse(s) vicio(s).'] || '',
    
    nome_contato_emergencia: record['Nome de uma pessoa para contato em caso de urgencia.'] || '',
    telefone_contato_emergencia: record['Telefone de contato (WhatsApp) da pessoa em caso de urgencia.'] || '',
    
    coisas_importantes: record['Existe alguma coisa importante que precisa relatar? Descreva.'] || '',
    medicamentos_uso_continuo: record['Descreva todos os medicamentos de uso contínuo que você utiliza.'] || '',
    disponibilidade_autocura: record['De 0 a 10, o quanto voce esta disponivel e disposto a iniciar o seu processo de autocura, autoconhecimento e expansao da consciencia. Descreva.'] || '',
    pratica_autoconhecimento: praticas,
    outra_pratica_description: '',
    primeira_pratica: '',
    consegue_regras: normalizeYesNo(record['Consegue seguir regras?']),
    
    ip_address: record['IP'] || '',
    user_agent: 'JotForm Import'
  };
};

// Preparar statement de inserção
const insert = db.prepare(`
  INSERT INTO fichas_anamnese (
    nome_completo, email, endereco, whatsapp, data_nascimento, cpf, sexo, estado_civil,
    nome_mae, pais_vivos, nome_pai, tem_filhos,
    menstruacao_regular, suspeita_gravidez, detalhes_gravidez,
    diagnostico_doenca_fisica, cirurgias, doenca_cardiaca, pressao_arterial, convulsoes, cirurgia_bariatrica,
    diagnostico_doenca_psiquiatrica, diagnostico_esquizofrenia, tentativas_suicidio, acompanhamento_psicologico, internacao_psiquiatrica,
    uso_substancias, dependente_quimico, oque_dependente_quimico, alcoolatra, consumo_alcool,
    em_luto, quem_faleceu, abuso_fisico, detalhes_abuso_fisico, memorias_traumaticas_infancia, trauma_fase_adulta, detalhes_trauma_adulto, abuso_psicologico, detalhes_abuso_psicologico,
    motivacao_ayahuasca, primeiro_contato_ayahuasca, experiencias_anteriores, expectativas,
    transtornos_personalidade, outros_transtornos, fale_sobre_transtornos,
    religiao, problema_religioes, tempo_celular, profissao,
    vicios, outros_vicios, detalhes_vicios,
    nome_contato_emergencia, telefone_contato_emergencia,
    coisas_importantes, medicamentos_uso_continuo, disponibilidade_autocura, pratica_autoconhecimento, outra_pratica_description, primeira_pratica, consegue_regras,
    ip_address, user_agent
  ) VALUES (
    @nome_completo, @email, @endereco, @whatsapp, @data_nascimento, @cpf, @sexo, @estado_civil,
    @nome_mae, @pais_vivos, @nome_pai, @tem_filhos,
    @menstruacao_regular, @suspeita_gravidez, @detalhes_gravidez,
    @diagnostico_doenca_fisica, @cirurgias, @doenca_cardiaca, @pressao_arterial, @convulsoes, @cirurgia_bariatrica,
    @diagnostico_doenca_psiquiatrica, @diagnostico_esquizofrenia, @tentativas_suicidio, @acompanhamento_psicologico, @internacao_psiquiatrica,
    @uso_substancias, @dependente_quimico, @oque_dependente_quimico, @alcoolatra, @consumo_alcool,
    @em_luto, @quem_faleceu, @abuso_fisico, @detalhes_abuso_fisico, @memorias_traumaticas_infancia, @trauma_fase_adulta, @detalhes_trauma_adulto, @abuso_psicologico, @detalhes_abuso_psicologico,
    @motivacao_ayahuasca, @primeiro_contato_ayahuasca, @experiencias_anteriores, @expectativas,
    @transtornos_personalidade, @outros_transtornos, @fale_sobre_transtornos,
    @religiao, @problema_religioes, @tempo_celular, @profissao,
    @vicios, @outros_vicios, @detalhes_vicios,
    @nome_contato_emergencia, @telefone_contato_emergencia,
    @coisas_importantes, @medicamentos_uso_continuo, @disponibilidade_autocura, @pratica_autoconhecimento, @outra_pratica_description, @primeira_pratica, @consegue_regras,
    @ip_address, @user_agent
  )
`);

// Inserir fichas em transação
console.log('Importando fichas...');
const insertMany = db.transaction((fichas) => {
  let imported = 0;
  for (const ficha of fichas) {
    try {
      insert.run(ficha);
      imported++;
    } catch (error) {
      console.error(`Erro ao importar ficha de ${ficha.nome_completo}:`, error.message);
    }
  }
  return imported;
});

const fichas = records.map(mapCSVToDB);
const imported = insertMany(fichas);

console.log(`\nImportação concluída!`);
console.log(`Total de fichas no CSV: ${records.length}`);
console.log(`Fichas importadas com sucesso: ${imported}`);

// Verificar total no banco
const total = db.prepare('SELECT COUNT(*) as total FROM fichas_anamnese').get();
console.log(`Total de fichas no banco: ${total.total}`);

db.close();
