import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

import SectionDadosPessoais from '../components/SectionDadosPessoais';
import SectionSaude from '../components/SectionSaude';
import SectionSaudeMental from '../components/SectionSaudeMental';
import SectionSubstancias from '../components/SectionSubstancias';
import SectionTraumas from '../components/SectionTraumas';
import SectionAyahuasca from '../components/SectionAyahuasca';
import SectionTranstornos from '../components/SectionTranstornos';
import SectionEstiloVida from '../components/SectionEstiloVida';
import SectionContatoEmergencia from '../components/SectionContatoEmergencia';
import SectionOutros from '../components/SectionOutros';

const SECTIONS = [
  { title: 'Dados Pessoais', icon: '👤', component: SectionDadosPessoais },
  { title: 'Saúde', icon: '💚', component: SectionSaude },
  { title: 'Saúde Mental', icon: '🧠', component: SectionSaudeMental },
  { title: 'Substâncias', icon: '⚗️', component: SectionSubstancias },
  { title: 'Traumas', icon: '🕊️', component: SectionTraumas },
  { title: 'Ayahuasca', icon: '🌿', component: SectionAyahuasca },
  { title: 'Transtornos', icon: '🔮', component: SectionTranstornos },
  { title: 'Estilo de Vida', icon: '🍃', component: SectionEstiloVida },
  { title: 'Emergência', icon: '📞', component: SectionContatoEmergencia },
  { title: 'Finalizar', icon: '✨', component: SectionOutros },
];

function readJsonField(name) {
  const el = document.querySelector(`input[name="${name}"]`);
  const raw = el ? el.value : '[]';
  try { return JSON.parse(raw || '[]'); } catch { return []; }
}

function FormularioAnamnese() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, watch, trigger, setValue, formState: { errors }, reset } = useForm({
    mode: 'onTouched',
    defaultValues: {
      nome_completo: '', email: '', whatsapp: '', data_nascimento: '', cpf: '',
      sexo: '', estado_civil: '', endereco: '',
      nome_mae: '', nome_pai: '', pais_vivos: '', tem_filhos: '',
      menstruacao_regular: '', suspeita_gravidez: '', detalhes_gravidez: '',
      diagnostico_doenca_fisica_opcao: '', diagnostico_doenca_fisica: '',
      cirurgias_opcao: '', cirurgias: '',
      doenca_cardiaca_opcao: '', doenca_cardiaca: '',
      pressao_arterial_opcao: '', pressao_arterial: '',
      convulsoes_opcao: '', convulsoes: '',
      cirurgia_bariatrica_opcao: '', cirurgia_bariatrica: '',
      diagnostico_doenca_psiquiatrica_opcao: '', diagnostico_doenca_psiquiatrica: '',
      diagnostico_esquizofrenia_opcao: '', diagnostico_esquizofrenia: '',
      tentativas_suicidio_opcao: '', tentativas_suicidio: '',
      acompanhamento_psicologico: '', internacao_psiquiatrica: '',
      uso_substancias_opcao: '', uso_substancias: '',
      dependente_quimico: '', oque_dependente_quimico: '',
      alcoolatra: '', consumo_alcool_opcao: '', consumo_alcool: '',
      em_luto: '', quem_faleceu: '',
      abuso_fisico: '', detalhes_abuso_fisico: '',
      abuso_psicologico: '', detalhes_abuso_psicologico: '',
      memorias_traumaticas_infancia: '', detalhes_memorias_infancia: '',
      trauma_fase_adulta: '', detalhes_trauma_adulto: '',
      motivacao_ayahuasca: '', primeiro_contato_ayahuasca: '',
      experiencias_anteriores: '', expectativas: '',
      transtornos_personalidade: '[]', outros_transtornos: '', fale_sobre_transtornos: '',
      religiao: '', problema_religioes: '', profissao: '', consegue_regras: '',
      tempo_celular: '', vicios: '[]', outros_vicios: '', detalhes_vicios: '',
      pratica_autoconhecimento: '[]', outra_pratica_description: '', primeira_pratica: '',
      nome_contato_emergencia: '', telefone_contato_emergencia: '',
      coisas_importantes: '', medicamentos_uso_continuo: '', disponibilidade_autocura: '',
    },
  });

  const onSubmit = async (data) => {
    const vicios = readJsonField('vicios');
    const praticas = readJsonField('pratica_autoconhecimento');
    const transtornos = readJsonField('transtornos_personalidade');
    const payload = { ...data, vicios: JSON.stringify(vicios), pratica_autoconhecimento: JSON.stringify(praticas), transtornos_personalidade: JSON.stringify(transtornos) };

    setIsSubmitting(true);
    try {
      await axios.post('/api/fichas', payload);
      setSubmitted(true);
      toast.success('Ficha enviada com sucesso!');
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message
        || err.response?.data?.error
        || 'Erro ao enviar ficha. Tente novamente.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const SECTION_FIELDS = [
    ['nome_completo', 'email', 'whatsapp', 'data_nascimento', 'cpf', 'sexo', 'estado_civil', 'endereco'],
    ['pais_vivos', 'nome_mae', 'tem_filhos', 'diagnostico_doenca_fisica_opcao', 'cirurgias_opcao', 'doenca_cardiaca_opcao', 'pressao_arterial_opcao', 'convulsoes_opcao', 'cirurgia_bariatrica_opcao'],
    ['diagnostico_doenca_psiquiatrica_opcao', 'diagnostico_esquizofrenia_opcao', 'tentativas_suicidio_opcao', 'acompanhamento_psicologico', 'internacao_psiquiatrica'],
    ['uso_substancias_opcao', 'dependente_quimico', 'oque_dependente_quimico', 'alcoolatra', 'consumo_alcool_opcao'],
    ['em_luto', 'abuso_fisico', 'abuso_psicologico', 'memorias_traumaticas_infancia', 'trauma_fase_adulta'],
    ['motivacao_ayahuasca', 'primeiro_contato_ayahuasca', 'expectativas'],
    [],
    ['religiao', 'problema_religioes', 'profissao', 'consegue_regras', 'tempo_celular', 'primeira_pratica'],
    ['nome_contato_emergencia', 'telefone_contato_emergencia'],
    ['coisas_importantes', 'medicamentos_uso_continuo', 'disponibilidade_autocura'],
  ];

  const next = async () => {
    const values = watch();
    const baseFields = SECTION_FIELDS[currentSection] || [];
    const fieldsToValidate = [...baseFields];

    if (currentSection === 0 && values.data_nascimento) {
      const hoje = new Date();
      hoje.setHours(23, 59, 59, 999);
      const nascimento = new Date(values.data_nascimento + 'T00:00:00');
      const minDate = new Date('1930-01-01T00:00:00');
      if (nascimento < minDate) {
        toast.warning('Data de nascimento não pode ser anterior a 01/01/1930.');
        return;
      }
      if (nascimento > hoje) {
        toast.warning('Data de nascimento não pode ser futura.');
        return;
      }
    }

    if (currentSection === 1) {
      if (values.sexo === 'Feminino') {
        fieldsToValidate.push('menstruacao_regular', 'suspeita_gravidez');
        if (values.suspeita_gravidez === 'Sim') fieldsToValidate.push('detalhes_gravidez');
      }
      if (values.diagnostico_doenca_fisica_opcao === 'Sim') fieldsToValidate.push('diagnostico_doenca_fisica');
      if (values.cirurgias_opcao === 'Sim') fieldsToValidate.push('cirurgias');
      if (values.doenca_cardiaca_opcao === 'Sim') fieldsToValidate.push('doenca_cardiaca');
      if (values.pressao_arterial_opcao === 'Sim') fieldsToValidate.push('pressao_arterial');
      if (values.convulsoes_opcao === 'Sim') fieldsToValidate.push('convulsoes');
      if (values.cirurgia_bariatrica_opcao === 'Sim') fieldsToValidate.push('cirurgia_bariatrica');
    }

    if (currentSection === 2) {
      if (values.diagnostico_doenca_psiquiatrica_opcao === 'Sim') fieldsToValidate.push('diagnostico_doenca_psiquiatrica');
      if (values.diagnostico_esquizofrenia_opcao === 'Sim') fieldsToValidate.push('diagnostico_esquizofrenia');
      if (values.tentativas_suicidio_opcao === 'Sim') fieldsToValidate.push('tentativas_suicidio');
    }

    if (currentSection === 3) {
      if (values.uso_substancias_opcao === 'Sim') fieldsToValidate.push('uso_substancias');
      if (values.consumo_alcool_opcao === 'Sim') fieldsToValidate.push('consumo_alcool');
    }

    if (currentSection === 4) {
      if (values.em_luto === 'Sim') fieldsToValidate.push('quem_faleceu');
      if (values.abuso_fisico === 'Sim') fieldsToValidate.push('detalhes_abuso_fisico');
      if (values.abuso_psicologico === 'Sim') fieldsToValidate.push('detalhes_abuso_psicologico');
      if (values.memorias_traumaticas_infancia === 'Sim') fieldsToValidate.push('detalhes_memorias_infancia');
      if (values.trauma_fase_adulta === 'Sim') fieldsToValidate.push('detalhes_trauma_adulto');
    }

    if (currentSection === 5) {
      if (values.primeiro_contato_ayahuasca === 'Não') fieldsToValidate.push('experiencias_anteriores');
    }

    if (currentSection === 7) {
      const vicios = readJsonField('vicios');
      const praticas = readJsonField('pratica_autoconhecimento');
      if (vicios.includes('Outros')) fieldsToValidate.push('outros_vicios');
      if (vicios.length > 0) fieldsToValidate.push('detalhes_vicios');
      if (praticas.includes('Outros')) fieldsToValidate.push('outra_pratica_description');
      fieldsToValidate.push('pratica_autoconhecimento');
    }

    const emptyFields = fieldsToValidate.filter((f) => {
      if (f === 'transtornos_personalidade' || f === 'vicios' || f === 'pratica_autoconhecimento') {
        const arr = readJsonField(f);
        return arr.length === 0;
      }
      const v = values[f];
      return v === undefined || v === null || v === '';
    });

    if (emptyFields.length > 0) {
      toast.warning('Preencha todos os campos obrigatórios antes de prosseguir.');
      await trigger(emptyFields);
      return;
    }

    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection((p) => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prev = () => {
    if (currentSection > 0) {
      setCurrentSection((p) => p - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const CurrentSection = SECTIONS[currentSection].component;
  const progress = ((currentSection + 1) / SECTIONS.length) * 100;

  if (submitted) {
    return (
      <div className="page-shell">
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="surface-elevated p-8 sm:p-12 max-w-md w-full text-center animate-scale-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-earth-900 mb-2">Ficha Enviada!</h1>
            <p className="text-sand-500 mb-8">
              Obrigado por preencher a ficha de anamnese. Em breve entraremos em contato.
            </p>
            <button
              onClick={() => { reset(); setSubmitted(false); setCurrentSection(0); }}
              className="btn-primary"
            >
              Preencher outra ficha
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      {/* Header */}
      <header className="app-header">
        <div className="max-w-3xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-xamas-400 to-xamas-700 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-earth-900 truncate">Ficha de Anamnese</h1>
              <p className="text-xs text-sand-500 hidden sm:block">Tenda do Xamãs</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-track mx-4 mb-0">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* Section indicator - scrollable pills */}
      <div className="sticky top-[calc(var(--safe-area-top,0px)+56px)] z-40 bg-xamas-50/90 backdrop-blur-md border-b border-sand-200/50">
        <div className="max-w-3xl mx-auto px-4 py-2.5">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
            {SECTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => { setCurrentSection(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  i === currentSection
                    ? 'bg-xamas-600 text-white shadow-sm'
                    : i < currentSection
                    ? 'bg-sage-100 text-sage-700'
                    : 'bg-sand-100 text-sand-500'
                }`}
              >
                <span className="text-[10px]">{s.icon}</span>
                <span className="hidden sm:inline">{s.title}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="flex-1 px-4 py-6 sm:py-8">
        <form id="anamnese-form" onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <CurrentSection register={register} errors={errors} watch={watch} setValue={setValue} />
        </form>
      </main>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 z-50 border-t border-sand-200/50 bg-white/90 backdrop-blur-xl safe-bottom">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={currentSection === 0}
            className="btn-ghost gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <span className="text-xs text-sand-400 font-medium tabular-nums">
            {currentSection + 1}/{SECTIONS.length}
          </span>

          {currentSection === SECTIONS.length - 1 ? (
            <button
              type="submit"
              form="anamnese-form"
              disabled={isSubmitting}
              className="btn-primary gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Ficha
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button type="button" onClick={next} className="btn-primary gap-2">
              <span className="hidden sm:inline">Próximo</span>
              <span className="sm:hidden">Avançar</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormularioAnamnese;
