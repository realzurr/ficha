import { Field, Select, Textarea, SectionCard } from './FormFields';

function SectionSaudeMental({ register, watch, errors }) {
  const diagnosticoPsiquiatrico = watch('diagnostico_doenca_psiquiatrica_opcao');
  const esquizofrenia = watch('diagnostico_esquizofrenia_opcao');
  const tentativasSuicidio = watch('tentativas_suicidio_opcao');

  return (
    <SectionCard title="Saúde Mental" subtitle="Acompanhamento psicológico e psiquiátrico">
      <div className="space-y-4">
        <Field label="Tem diagnóstico de doença psiquiátrica?" error={errors.diagnostico_doenca_psiquiatrica_opcao?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="diagnostico_doenca_psiquiatrica_opcao"
            error={errors.diagnostico_doenca_psiquiatrica_opcao}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>
        {diagnosticoPsiquiatrico === 'Sim' && (
          <Field label="Descreva o diagnóstico" error={errors.diagnostico_doenca_psiquiatrica?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="diagnostico_doenca_psiquiatrica"
              error={errors.diagnostico_doenca_psiquiatrica}
              placeholder="Descreva..."
            />
          </Field>
        )}

        <Field label="Tem diagnóstico de esquizofrenia? Alguém da família tem diagnóstico?" error={errors.diagnostico_esquizofrenia_opcao?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="diagnostico_esquizofrenia_opcao"
            error={errors.diagnostico_esquizofrenia_opcao}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>
        {esquizofrenia === 'Sim' && (
          <Field label="Descreva" error={errors.diagnostico_esquizofrenia?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="diagnostico_esquizofrenia"
              error={errors.diagnostico_esquizofrenia}
              placeholder="Descreva..."
            />
          </Field>
        )}

        <Field label="Já tentou suicídio?" error={errors.tentativas_suicidio_opcao?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="tentativas_suicidio_opcao"
            error={errors.tentativas_suicidio_opcao}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>
        {tentativasSuicidio === 'Sim' && (
          <Field label="Descreva" error={errors.tentativas_suicidio?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="tentativas_suicidio"
              error={errors.tentativas_suicidio}
              placeholder="Descreva..."
            />
          </Field>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Faz acompanhamento psicológico?" error={errors.acompanhamento_psicologico?.message}>
            <Select
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="acompanhamento_psicologico"
              error={errors.acompanhamento_psicologico}
              options={[
                { value: 'Sim', label: 'Sim' },
                { value: 'Não', label: 'Não' },
              ]}
            />
          </Field>

          <Field label="Já precisou de internação psiquiátrica?" error={errors.internacao_psiquiatrica?.message}>
            <Select
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="internacao_psiquiatrica"
              error={errors.internacao_psiquiatrica}
              options={[
                { value: 'Sim', label: 'Sim' },
                { value: 'Não', label: 'Não' },
              ]}
            />
          </Field>
        </div>
      </div>
    </SectionCard>
  );
}

export default SectionSaudeMental;
