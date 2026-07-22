import { Field, Select, Textarea, SectionCard } from './FormFields';

function SectionSubstancias({ register, watch, errors }) {
  const usoSubstancias = watch('uso_substancias_opcao');
  const consumoAlcool = watch('consumo_alcool_opcao');

  return (
    <SectionCard title="Uso de Substâncias" subtitle="Histórico de uso de substâncias químicas">
      <div className="space-y-4">
        <Field label="Faz uso de alguma substância química e/ou alucinógena?" error={errors.uso_substancias_opcao?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="uso_substancias_opcao"
            error={errors.uso_substancias_opcao}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>
        {usoSubstancias === 'Sim' && (
          <Field label="Descreva o uso" error={errors.uso_substancias?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="uso_substancias"
              error={errors.uso_substancias}
              placeholder="Descreva..."
            />
          </Field>
        )}

        <Field label="Se considera dependente químico?" error={errors.dependente_quimico?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="dependente_quimico"
            error={errors.dependente_quimico}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
              { value: 'Em recuperação', label: 'Em recuperação' },
            ]}
          />
        </Field>

        <Field label="Para você, o que seria um dependente químico?" error={errors.oque_dependente_quimico?.message}>
          <Textarea
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="oque_dependente_quimico"
            error={errors.oque_dependente_quimico}
            placeholder="Descreva sua visão..."
          />
        </Field>

        <Field label="Se considera alcoólatra?" error={errors.alcoolatra?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="alcoolatra"
            error={errors.alcoolatra}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
              { value: 'Em recuperação', label: 'Em recuperação' },
            ]}
          />
        </Field>

        <Field label="Costuma consumir álcool?" error={errors.consumo_alcool_opcao?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="consumo_alcool_opcao"
            error={errors.consumo_alcool_opcao}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>
        {consumoAlcool === 'Sim' && (
          <Field label="Descreva seus hábitos de consumo" error={errors.consumo_alcool?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="consumo_alcool"
              error={errors.consumo_alcool}
              placeholder="Quantas geralmente consome? Costuma consumir mais de uma vez na semana?"
            />
          </Field>
        )}
      </div>
    </SectionCard>
  );
}

export default SectionSubstancias;
