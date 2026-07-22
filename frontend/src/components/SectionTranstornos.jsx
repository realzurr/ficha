import { useState, useEffect } from 'react';
import { Field, Input, Textarea, SectionCard } from './FormFields';

const TRANSTORNOS = [
  'Nenhum Transtorno',
  'Transtorno de Personalidade Borderline',
  'Transtorno Bipolar',
  'Transtorno de Ansiedade Generalizada',
  'Transtorno Obsessivo-Compulsivo (TOC)',
  'Transtorno de Estresse Pós-Traumático',
  'Transtorno de Despersonalização',
  'Transtorno Dissociativo',
  'Depressão Maior',
  'Transtorno de Personalidade Narcisista',
  'Transtorno de Personalidade Antissocial',
  'Outros',
];

function SectionTranstornos({ register, watch, errors }) {
  const formValue = watch('transtornos_personalidade');
  const outrosTranstornos = watch('outros_transtornos');

  const [selected, setSelected] = useState(() => {
    try { return JSON.parse(formValue || '[]'); } catch { return []; }
  });

  useEffect(() => {
    const el = document.querySelector('input[name="transtornos_personalidade"]');
    if (el) el.value = JSON.stringify(selected);
  }, [selected]);

  const toggle = (t) => {
    setSelected((prev) => {
      if (t === 'Nenhum Transtorno') {
        return prev.includes(t) ? [] : [t];
      }
      const next = prev.filter((x) => x !== 'Nenhum Transtorno');
      return next.includes(t) ? next.filter((x) => x !== t) : [...next, t];
    });
  };

  return (
    <SectionCard title="Transtornos de Personalidade" subtitle="Diagnósticos ou suspeitas">
      <div className="space-y-4">
        <div>
          <label className="form-label">Selecione, se houver</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TRANSTORNOS.map((t) => (
              <label
                key={t}
                className={`radio-card ${selected.includes(t) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  className="shrink-0"
                  checked={selected.includes(t)}
                  onChange={() => toggle(t)}
                />
                <span className="text-sm">{t}</span>
              </label>
            ))}
          </div>
          <input type="hidden" name="transtornos_personalidade" ref={() => {}} />
        </div>

        {selected.includes('Outros') && (
          <Field label="Descreva o(s) outro(s) transtorno(s)" error={errors.outros_transtornos?.message}>
            <Input
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="outros_transtornos"
              error={errors.outros_transtornos}
              placeholder="Descreva..."
            />
          </Field>
        )}

        {selected.includes('Outros') && (
          <Field label="Fale um pouco a respeito" error={errors.fale_sobre_transtornos?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="fale_sobre_transtornos"
              error={errors.fale_sobre_transtornos}
              placeholder="Detalhes sobre os transtornos mencionados..."
            />
          </Field>
        )}
      </div>
    </SectionCard>
  );
}

export default SectionTranstornos;
