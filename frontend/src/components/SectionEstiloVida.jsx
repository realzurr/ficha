import { useState, useEffect } from 'react';
import { Field, Input, Select, Textarea, SectionCard } from './FormFields';

const VICIOS = [
  'Tabagismo', 'Jogo (ludopatia)', 'Alimentos', 'Pornografia',
  'Celular/redes sociais', 'Trabalho (workaholic)', 'Compras', 'Outros',
];

const PRATICAS = [
  'Meditação', 'Yoga', 'Terapia holística', 'Reiki',
  'Chamado da natureza', 'Dança', 'Arte', 'Outros',
];

function SectionEstiloVida({ register, watch, errors }) {
  const formVicios = watch('vicios');
  const formPraticas = watch('pratica_autoconhecimento');
  const outrosVicios = watch('outros_vicios');

  const [selVicios, setSelVicios] = useState(() => {
    try { return JSON.parse(formVicios || '[]'); } catch { return []; }
  });
  const [selPraticas, setSelPraticas] = useState(() => {
    try { return JSON.parse(formPraticas || '[]'); } catch { return []; }
  });

  useEffect(() => {
    const el = document.querySelector('input[name="vicios"]');
    if (el) el.value = JSON.stringify(selVicios);
  }, [selVicios]);

  useEffect(() => {
    const el = document.querySelector('input[name="pratica_autoconhecimento"]');
    if (el) el.value = JSON.stringify(selPraticas);
  }, [selPraticas]);

  const toggle = (arr, setArr, val) => {
    setArr((p) => (p.includes(val) ? p.filter((x) => x !== val) : [...p, val]));
  };

  return (
    <SectionCard title="Estilo de Vida" subtitle="Religião, profissão, vícios e práticas">
      <div className="space-y-4">
        <Field label="Qual a sua religião?" error={errors.religiao?.message}>
          <Input
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="religiao"
            error={errors.religiao}
            placeholder="Ex: Cristã, Espírita, Umbanda..."
          />
        </Field>

        <Field label="Possui algum problema com religiões?" error={errors.problema_religioes?.message}>
          <Textarea
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="problema_religioes"
            error={errors.problema_religioes}
            placeholder="Descreva, se houver..."
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Qual a sua profissão?" error={errors.profissao?.message}>
            <Input
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="profissao"
              error={errors.profissao}
            />
          </Field>

          <Field label="Consegue seguir regras?" error={errors.consegue_regras?.message}>
            <Select
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="consegue_regras"
              error={errors.consegue_regras}
              options={[
                { value: 'Sim', label: 'Sim' },
                { value: 'Não', label: 'Não' },
              ]}
            />
          </Field>
        </div>

        <Field label="Quanto tempo fica sem o celular?" error={errors.tempo_celular?.message}>
          <Textarea
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="tempo_celular"
            error={errors.tempo_celular}
            placeholder="Descreva seus hábitos..."
          />
        </Field>
      </div>

      <div className="space-y-4 pt-4 mt-4 divider">
        <h3 className="text-sm font-bold uppercase tracking-wider text-xamas-500">Vícios</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {VICIOS.map((v) => (
            <label key={v} className={`radio-card ${selVicios.includes(v) ? 'selected' : ''}`}>
              <input
                type="checkbox"
                className="shrink-0"
                checked={selVicios.includes(v)}
                onChange={() => toggle(selVicios, setSelVicios, v)}
              />
              <span className="text-sm">{v}</span>
            </label>
          ))}
        </div>
        <input type="hidden" name="vicios" ref={() => {}} />

        {selVicios.includes('Outros') && (
          <Field label="Outros vícios — descreva" error={errors.outros_vicios?.message}>
            <Input
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="outros_vicios"
              error={errors.outros_vicios}
              placeholder="Descreva..."
            />
          </Field>
        )}

        {selVicios.length > 0 && (
          <Field label="Fale sobre esse(s) vício(s)" error={errors.detalhes_vicios?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="detalhes_vicios"
              error={errors.detalhes_vicios}
              placeholder="Detalhes..."
            />
          </Field>
        )}
      </div>

      <div className="space-y-4 pt-4 mt-4 divider">
        <h3 className="text-sm font-bold uppercase tracking-wider text-xamas-500">
          Outras práticas de autoconhecimento
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRATICAS.map((p) => (
            <label key={p} className={`radio-card ${selPraticas.includes(p) ? 'selected' : ''}`}>
              <input
                type="checkbox"
                className="shrink-0"
                checked={selPraticas.includes(p)}
                onChange={() => toggle(selPraticas, setSelPraticas, p)}
              />
              <span className="text-sm">{p}</span>
            </label>
          ))}
        </div>
        <input type="hidden" name="pratica_autoconhecimento" ref={() => {}} />

        {selPraticas.includes('Outros') && (
          <Field label="Outra prática? Descreva" error={errors.outra_pratica_description?.message}>
            <Input
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="outra_pratica_description"
              error={errors.outra_pratica_description}
              placeholder="Descreva..."
            />
          </Field>
        )}

        <Field label="É a primeira prática?" error={errors.primeira_pratica?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="primeira_pratica"
            error={errors.primeira_pratica}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

export default SectionEstiloVida;
