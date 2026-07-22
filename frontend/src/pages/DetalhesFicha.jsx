import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function DetalhesFicha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ficha, setFicha] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    loadFicha();
  }, [id]);

  const loadFicha = async () => {
    try {
      const res = await axios.get(`/api/fichas/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFicha(res.data);
      setFormData(res.data);
    } catch {
      toast.error('Ficha não encontrada');
      navigate('/admin');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/fichas/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Ficha atualizada');
      setIsEditing(false);
      loadFicha();
    } catch {
      toast.error('Erro ao salvar');
    }
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }) : '—';

  const renderField = (label, value, field, type = 'text') => {
    if (isEditing) {
      if (type === 'textarea') {
        return (
          <div key={field} className="space-y-1.5">
            <label className="form-label">{label}</label>
            <textarea className="textarea-field" value={formData[field] || ''} onChange={(e) => setFormData((p) => ({ ...p, [field]: e.target.value }))} />
          </div>
        );
      }
      return (
        <div key={field} className="space-y-1.5">
          <label className="form-label">{label}</label>
          <input className="input-field" value={formData[field] || ''} onChange={(e) => setFormData((p) => ({ ...p, [field]: e.target.value }))} />
        </div>
      );
    }
    return (
      <div key={field}>
        <dt className="text-xs font-medium text-sand-400 uppercase tracking-wider">{label}</dt>
        <dd className="mt-1 text-sm text-earth-900 leading-relaxed">
          {value || <span className="text-sand-300 italic">Não informado</span>}
        </dd>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-xamas-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const parseJson = (v) => {
    if (!v) return [];
    if (Array.isArray(v)) return v;
    try { return JSON.parse(v); } catch { return [v]; }
  };

  const sections = [
    {
      title: 'Dados Pessoais',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
      fields: [
        ['Nome Completo', ficha?.nome_completo, 'nome_completo'],
        ['E-mail', ficha?.email, 'email'],
        ['WhatsApp', ficha?.whatsapp, 'whatsapp'],
        ['Data de Nascimento', ficha?.data_nascimento, 'data_nascimento'],
        ['CPF', ficha?.cpf, 'cpf'],
        ['Sexo', ficha?.sexo, 'sexo'],
        ['Estado Civil', ficha?.estado_civil, 'estado_civil'],
        ['Endereço', ficha?.endereco, 'endereco'],
      ],
    },
    {
      title: 'Dados Familiares',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
      fields: [
        ['Nome da Mãe', ficha?.nome_mae, 'nome_mae'],
        ['Nome do Pai', ficha?.nome_pai, 'nome_pai'],
        ['Pais Vivos', ficha?.pais_vivos, 'pais_vivos'],
        ['Tem Filhos', ficha?.tem_filhos, 'tem_filhos'],
      ],
    },
    {
      title: 'Saúde',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
      fields: [
        ['Menstruação Regular', ficha?.menstruacao_regular, 'menstruacao_regular'],
        ['Suspeita de Gravidez', ficha?.suspeita_gravidez, 'suspeita_gravidez'],
        ['Detalhes Gravidez', ficha?.detalhes_gravidez, 'detalhes_gravidez', 'textarea'],
        ['Diagnóstico Doença Física?', ficha?.diagnostico_doenca_fisica_opcao, 'diagnostico_doenca_fisica_opcao'],
        ['Diagnóstico Doença Física', ficha?.diagnostico_doenca_fisica, 'diagnostico_doenca_fisica', 'textarea'],
        ['Realizou Cirurgia?', ficha?.cirurgias_opcao, 'cirurgias_opcao'],
        ['Cirurgias', ficha?.cirurgias, 'cirurgias', 'textarea'],
        ['Tem Doença Cardíaca?', ficha?.doenca_cardiaca_opcao, 'doenca_cardiaca_opcao'],
        ['Doença Cardíaca', ficha?.doenca_cardiaca, 'doenca_cardiaca', 'textarea'],
        ['Problema de Pressão?', ficha?.pressao_arterial_opcao, 'pressao_arterial_opcao'],
        ['Pressão Arterial', ficha?.pressao_arterial, 'pressao_arterial', 'textarea'],
        ['Já Teve Convulsão?', ficha?.convulsoes_opcao, 'convulsoes_opcao'],
        ['Convulsões', ficha?.convulsoes, 'convulsoes', 'textarea'],
        ['Fez Cirurgia Bariátrica?', ficha?.cirurgia_bariatrica_opcao, 'cirurgia_bariatrica_opcao'],
        ['Cirurgia Bariátrica', ficha?.cirurgia_bariatrica, 'cirurgia_bariatrica', 'textarea'],
      ],
    },
    {
      title: 'Saúde Mental',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>,
      fields: [
        ['Tem Diagnóstico Psiquiátrico?', ficha?.diagnostico_doenca_psiquiatrica_opcao, 'diagnostico_doenca_psiquiatrica_opcao'],
        ['Diagnóstico Psiquiátrico', ficha?.diagnostico_doenca_psiquiatrica, 'diagnostico_doenca_psiquiatrica', 'textarea'],
        ['Tem Diagnóstico Esquizofrenia?', ficha?.diagnostico_esquizofrenia_opcao, 'diagnostico_esquizofrenia_opcao'],
        ['Diagnóstico Esquizofrenia', ficha?.diagnostico_esquizofrenia, 'diagnostico_esquizofrenia', 'textarea'],
        ['Já Tentou Suicídio?', ficha?.tentativas_suicidio_opcao, 'tentativas_suicidio_opcao'],
        ['Tentativas de Suicídio', ficha?.tentativas_suicidio, 'tentativas_suicidio', 'textarea'],
        ['Acompanhamento Psicológico', ficha?.acompanhamento_psicologico, 'acompanhamento_psicologico'],
        ['Internação Psiquiátrica', ficha?.internacao_psiquiatrica, 'internacao_psiquiatrica'],
      ],
    },
    {
      title: 'Substâncias',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
      fields: [
        ['Usa Substâncias?', ficha?.uso_substancias_opcao, 'uso_substancias_opcao'],
        ['Uso de Substâncias', ficha?.uso_substancias, 'uso_substancias', 'textarea'],
        ['Dependente Químico', ficha?.dependente_quimico, 'dependente_quimico'],
        ['Conceito de Dependente', ficha?.oque_dependente_quimico, 'oque_dependente_quimico', 'textarea'],
        ['Alcoólatra', ficha?.alcoolatra, 'alcoolatra'],
        ['Consome Álcool?', ficha?.consumo_alcool_opcao, 'consumo_alcool_opcao'],
        ['Consumo de Álcool', ficha?.consumo_alcool, 'consumo_alcool', 'textarea'],
      ],
    },
    {
      title: 'Traumas e Luto',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.024c-1.396 1.64-4.06 2.198-6.302 2.198-2.242 0-4.906-.558-6.302-2.198a23.911 23.911 0 01-1.152-6.024c2.56-.932 5.324-1.44 8.207-1.44z" /></svg>,
      fields: [
        ['Em Luto', ficha?.em_luto, 'em_luto'],
        ['Quem Faleceu', ficha?.quem_faleceu, 'quem_faleceu', 'textarea'],
        ['Abuso Físico', ficha?.abuso_fisico, 'abuso_fisico'],
        ['Detalhes Abuso Físico', ficha?.detalhes_abuso_fisico, 'detalhes_abuso_fisico', 'textarea'],
        ['Memórias Traumáticas Infância', ficha?.memorias_traumaticas_infancia, 'memorias_traumaticas_infancia'],
        ['Detalhes Memórias Infância', ficha?.detalhes_memorias_infancia, 'detalhes_memorias_infancia', 'textarea'],
        ['Trauma Fase Adulta', ficha?.trauma_fase_adulta, 'trauma_fase_adulta'],
        ['Detalhes Trauma Adulto', ficha?.detalhes_trauma_adulto, 'detalhes_trauma_adulto', 'textarea'],
        ['Abuso Psicológico', ficha?.abuso_psicologico, 'abuso_psicologico'],
        ['Detalhes Abuso Psicológico', ficha?.detalhes_abuso_psicologico, 'detalhes_abuso_psicologico', 'textarea'],
      ],
    },
    {
      title: 'Ayahuasca',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
      fields: [
        ['Motivação', ficha?.motivacao_ayahuasca, 'motivacao_ayahuasca', 'textarea'],
        ['Primeiro Contato', ficha?.primeiro_contato_ayahuasca, 'primeiro_contato_ayahuasca'],
        ['Experiências Anteriores', ficha?.experiencias_anteriores, 'experiencias_anteriores', 'textarea'],
        ['Expectativas', ficha?.expectativas, 'expectativas', 'textarea'],
      ],
    },
    {
      title: 'Transtornos de Personalidade',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>,
      fields: [
        ['Transtornos Selecionados', parseJson(ficha?.transtornos_personalidade).join(', '), 'transtornos_personalidade'],
        ['Outros Transtornos', ficha?.outros_transtornos, 'outros_transtornos'],
        ['Fale sobre Transtornos', ficha?.fale_sobre_transtornos, 'fale_sobre_transtornos', 'textarea'],
      ],
    },
    {
      title: 'Estilo de Vida',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
      fields: [
        ['Religião', ficha?.religiao, 'religiao'],
        ['Problema com Religiões', ficha?.problema_religioes, 'problema_religioes', 'textarea'],
        ['Profissão', ficha?.profissao, 'profissao'],
        ['Consegue Seguir Regras', ficha?.consegue_regras, 'consegue_regras'],
        ['Tempo sem Celular', ficha?.tempo_celular, 'tempo_celular', 'textarea'],
        ['Vícios', parseJson(ficha?.vicios).join(', '), 'vicios'],
        ['Outros Vícios', ficha?.outros_vicios, 'outros_vicios'],
        ['Detalhes Vícios', ficha?.detalhes_vicios, 'detalhes_vicios', 'textarea'],
        ['Práticas Autoconhecimento', parseJson(ficha?.pratica_autoconhecimento).join(', '), 'pratica_autoconhecimento'],
        ['Outra Prática', ficha?.outra_pratica_description, 'outra_pratica_description'],
        ['Primeira Prática', ficha?.primeira_pratica, 'primeira_pratica'],
      ],
    },
    {
      title: 'Contato de Emergência',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
      fields: [
        ['Nome do Contato', ficha?.nome_contato_emergencia, 'nome_contato_emergencia'],
        ['Telefone do Contato', ficha?.telefone_contato_emergencia, 'telefone_contato_emergencia'],
      ],
    },
    {
      title: 'Informações Finais',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
      fields: [
        ['Coisas Importantes', ficha?.coisas_importantes, 'coisas_importantes', 'textarea'],
        ['Medicamentos de Uso Contínuo', ficha?.medicamentos_uso_continuo, 'medicamentos_uso_continuo', 'textarea'],
        ['Disponibilidade Autocura', ficha?.disponibilidade_autocura, 'disponibilidade_autocura', 'textarea'],
      ],
    },
  ];

  return (
    <div className="min-h-dvh bg-gradient-to-br from-xamas-50 via-sand-50 to-sage-50">
      {/* Header */}
      <header className="app-header-dark">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <Link to="/admin" className="text-xs text-white/50 hover:text-white/80 transition-colors inline-flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Painel
            </Link>
            <h1 className="text-sm font-bold text-white mt-0.5">{ficha?.nome_completo}</h1>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="btn-ghost text-white/80 hover:text-white hover:bg-white/10 text-xs px-3 py-2">
                  Cancelar
                </button>
                <button onClick={handleSave} className="bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                  Salvar
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn-ghost text-white/80 hover:text-white hover:bg-white/10 text-xs px-3 py-2 gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Editar
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="surface p-5 sm:p-6 animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-xamas-100 flex items-center justify-center text-xamas-600">
                {section.icon}
              </div>
              <h2 className="text-sm font-bold text-earth-800 uppercase tracking-wider">{section.title}</h2>
            </div>
            <div className="divider mb-4" />
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {section.fields.map(([label, value, field, type]) => renderField(label, value, field, type))}
            </dl>
          </div>
        ))}

        {/* Metadata */}
        <div className="surface p-5 opacity-70">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <dt className="text-sand-400 font-medium">ID</dt>
              <dd className="text-earth-700 mt-0.5">#{ficha?.id}</dd>
            </div>
            <div>
              <dt className="text-sand-400 font-medium">Criado em</dt>
              <dd className="text-earth-700 mt-0.5">{fmtDate(ficha?.created_at)}</dd>
            </div>
            <div>
              <dt className="text-sand-400 font-medium">Atualizado</dt>
              <dd className="text-earth-700 mt-0.5">{fmtDate(ficha?.updated_at)}</dd>
            </div>
            <div>
              <dt className="text-sand-400 font-medium">IP</dt>
              <dd className="text-earth-700 mt-0.5">{ficha?.ip_address || '—'}</dd>
            </div>
            <div>
              <dt className="text-sand-400 font-medium">User Agent</dt>
              <dd className="text-earth-700 mt-0.5 break-all">{ficha?.user_agent || '—'}</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}

export default DetalhesFicha;
