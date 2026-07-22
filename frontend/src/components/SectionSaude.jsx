import { Field, Input, Select, Textarea, SectionCard } from './FormFields';

function SectionSaude({ register, watch, errors }) {
  const sexo = watch('sexo');

  const diagnosticoFisico = watch('diagnostico_doenca_fisica_opcao');
  const cirurgias = watch('cirurgias_opcao');
  const doencaCardiaca = watch('doenca_cardiaca_opcao');
  const pressaoArterial = watch('pressao_arterial_opcao');
  const convulsoes = watch('convulsoes_opcao');
  const cirurgiaBariatrica = watch('cirurgia_bariatrica_opcao');

  return (
    <SectionCard title="Saúde" subtitle="Histórico de saúde e dados familiares">
      <div className="space-y-4">
        <Field label="Seus pais são vivos?" error={errors.pais_vivos?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="pais_vivos"
            error={errors.pais_vivos}
            options={[
              { value: 'Ambos Vivos', label: 'Ambos vivos' },
              { value: 'Apenas o pai', label: 'Apenas o pai' },
              { value: 'Apenas a mãe', label: 'Apenas a mãe' },
              { value: 'Ambos Mortos', label: 'Ambos falecidos' },
            ]}
          />
        </Field>

        <Field label="Nome da Mãe" error={errors.nome_mae?.message}>
          <Input
            register={(name) => register(name, { required: 'Nome da mãe é obrigatório' })}
            name="nome_mae"
            error={errors.nome_mae}
            placeholder="Nome completo"
          />
        </Field>

        <Field label="Nome do Pai" hint="(opcional)">
          <Input register={register} name="nome_pai" placeholder="Nome completo" />
        </Field>

        <Field label="Você tem filhos?" error={errors.tem_filhos?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="tem_filhos"
            error={errors.tem_filhos}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>
      </div>

      {sexo === 'Feminino' && (
        <div className="space-y-4 pt-4 mt-4 divider">
          <h3 className="text-sm font-bold uppercase tracking-wider text-xamas-500">Saúde da Mulher</h3>

          <Field label="Menstruação regular?" error={errors.menstruacao_regular?.message}>
            <Select
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="menstruacao_regular"
              error={errors.menstruacao_regular}
              options={[
                { value: 'Sim', label: 'Sim' },
                { value: 'Não', label: 'Não' },
              ]}
            />
          </Field>

          <Field label="Tem suspeita de gravidez?" error={errors.suspeita_gravidez?.message}>
            <Select
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="suspeita_gravidez"
              error={errors.suspeita_gravidez}
              options={[
                { value: 'Sim', label: 'Sim' },
                { value: 'Não', label: 'Não' },
              ]}
            />
          </Field>

          {watch('suspeita_gravidez') === 'Sim' && (
            <Field label="Detalhes da gravidez" error={errors.detalhes_gravidez?.message}>
              <Textarea
                register={(name) => register(name, { required: 'Descrição é obrigatória' })}
                name="detalhes_gravidez"
                error={errors.detalhes_gravidez}
                placeholder="Descreva os detalhes..."
              />
            </Field>
          )}
        </div>
      )}

      <div className="space-y-4 pt-4 mt-4 divider">
        <h3 className="text-sm font-bold uppercase tracking-wider text-xamas-500">Histórico de Saúde</h3>

        <Field label="Possui algum diagnóstico de doença física?" error={errors.diagnostico_doenca_fisica_opcao?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="diagnostico_doenca_fisica_opcao"
            error={errors.diagnostico_doenca_fisica_opcao}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>
        {diagnosticoFisico === 'Sim' && (
          <Field label="Descreva o diagnóstico" error={errors.diagnostico_doenca_fisica?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="diagnostico_doenca_fisica"
              error={errors.diagnostico_doenca_fisica}
              placeholder="Descreva..."
            />
          </Field>
        )}

        <Field label="Realizou alguma cirurgia?" error={errors.cirurgias_opcao?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="cirurgias_opcao"
            error={errors.cirurgias_opcao}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>
        {cirurgias === 'Sim' && (
          <Field label="Descreva as cirurgias" error={errors.cirurgias?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="cirurgias"
              error={errors.cirurgias}
              placeholder="Descreva..."
            />
          </Field>
        )}

        <Field label="Possui alguma doença cardíaca?" error={errors.doenca_cardiaca_opcao?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="doenca_cardiaca_opcao"
            error={errors.doenca_cardiaca_opcao}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>
        {doencaCardiaca === 'Sim' && (
          <Field label="Descreva a condição cardíaca" error={errors.doenca_cardiaca?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="doenca_cardiaca"
              error={errors.doenca_cardiaca}
              placeholder="Descreva..."
            />
          </Field>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Possui problema de pressão arterial?" error={errors.pressao_arterial_opcao?.message}>
            <Select
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="pressao_arterial_opcao"
              error={errors.pressao_arterial_opcao}
              options={[
                { value: 'Sim', label: 'Sim' },
                { value: 'Não', label: 'Não' },
              ]}
            />
          </Field>
          {pressaoArterial === 'Sim' && (
            <Field label="Descreva" error={errors.pressao_arterial?.message}>
              <Textarea
                register={(name) => register(name, { required: 'Descrição é obrigatória' })}
                name="pressao_arterial"
                error={errors.pressao_arterial}
                placeholder="Descreva..."
              />
            </Field>
          )}

          <Field label="Já teve convulsão?" error={errors.convulsoes_opcao?.message}>
            <Select
              register={(name) => register(name, { required: 'Campo obrigatório' })}
              name="convulsoes_opcao"
              error={errors.convulsoes_opcao}
              options={[
                { value: 'Sim', label: 'Sim' },
                { value: 'Não', label: 'Não' },
              ]}
            />
          </Field>
          {convulsoes === 'Sim' && (
            <Field label="Descreva" error={errors.convulsoes?.message}>
              <Textarea
                register={(name) => register(name, { required: 'Descrição é obrigatória' })}
                name="convulsoes"
                error={errors.convulsoes}
                placeholder="Descreva..."
              />
            </Field>
          )}
        </div>

        <Field label="Fez cirurgia bariátrica?" error={errors.cirurgia_bariatrica_opcao?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="cirurgia_bariatrica_opcao"
            error={errors.cirurgia_bariatrica_opcao}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>
        {cirurgiaBariatrica === 'Sim' && (
          <Field label="Descreva" error={errors.cirurgia_bariatrica?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="cirurgia_bariatrica"
              error={errors.cirurgia_bariatrica}
              placeholder="Descreva..."
            />
          </Field>
        )}
      </div>
    </SectionCard>
  );
}

export default SectionSaude;
