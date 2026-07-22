import { Field, Select, Textarea, SectionCard } from './FormFields';

function SectionTraumas({ register, watch, errors }) {
  const emLuto = watch('em_luto');
  const abusoFisico = watch('abuso_fisico');
  const traumaFaseAdulta = watch('trauma_fase_adulta');
  const abusoPsicologico = watch('abuso_psicologico');
  const memoriasInfancia = watch('memorias_traumaticas_infancia');

  return (
    <SectionCard title="Traumas e Luto" subtitle="Experiências difíceis e vivências marcantes">
      <div className="space-y-4">
        <Field label="Está em luto?" error={errors.em_luto?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="em_luto"
            error={errors.em_luto}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>

        {emLuto === 'Sim' && (
          <Field label="Quem veio a falecer?" error={errors.quem_faleceu?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="quem_faleceu"
              error={errors.quem_faleceu}
              placeholder="Descreva..."
            />
          </Field>
        )}
      </div>

      <div className="space-y-4 pt-4 mt-4 divider">
        <h3 className="text-sm font-bold uppercase tracking-wider text-xamas-500">Traumas e Abusos</h3>

        <Field label="Já sofreu algum abuso físico?" error={errors.abuso_fisico?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="abuso_fisico"
            error={errors.abuso_fisico}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>

        {abusoFisico === 'Sim' && (
          <Field label="Descreva quem foi o agressor e quando ocorreu" error={errors.detalhes_abuso_fisico?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="detalhes_abuso_fisico"
              error={errors.detalhes_abuso_fisico}
              placeholder="Descreva..."
            />
          </Field>
        )}

        <Field label="Já sofreu abuso psicológico?" error={errors.abuso_psicologico?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="abuso_psicologico"
            error={errors.abuso_psicologico}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>

        {abusoPsicologico === 'Sim' && (
          <Field label="Descreva quem foi o agressor e quando ocorreu" error={errors.detalhes_abuso_psicologico?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="detalhes_abuso_psicologico"
              error={errors.detalhes_abuso_psicologico}
              placeholder="Descreva..."
            />
          </Field>
        )}

        <Field label="Possui memórias traumáticas de sua infância?" error={errors.memorias_traumaticas_infancia?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="memorias_traumaticas_infancia"
            error={errors.memorias_traumaticas_infancia}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>

        {memoriasInfancia === 'Sim' && (
          <Field label="Descreva o que ocorreu" error={errors.detalhes_memorias_infancia?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="detalhes_memorias_infancia"
              error={errors.detalhes_memorias_infancia}
              placeholder="Descreva o que aconteceu..."
            />
          </Field>
        )}

        <Field label="Possui algo traumático na fase adulta?" error={errors.trauma_fase_adulta?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="trauma_fase_adulta"
            error={errors.trauma_fase_adulta}
            options={[
              { value: 'Sim', label: 'Sim' },
              { value: 'Não', label: 'Não' },
            ]}
          />
        </Field>

        {traumaFaseAdulta === 'Sim' && (
          <Field label="Descreva o que aconteceu" error={errors.detalhes_trauma_adulto?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="detalhes_trauma_adulto"
              error={errors.detalhes_trauma_adulto}
              placeholder="Descreva..."
            />
          </Field>
        )}
      </div>
    </SectionCard>
  );
}

export default SectionTraumas;
