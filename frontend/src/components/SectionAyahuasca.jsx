import { Field, Select, Textarea, SectionCard } from './FormFields';

function SectionAyahuasca({ register, watch, errors }) {
  const primeiroContato = watch('primeiro_contato_ayahuasca');

  return (
    <SectionCard title="Medicina Ayahuasca" subtitle="Sua jornada e expectativas">
      <div className="space-y-4">
        <Field label="O que levou a consagrar da Medicina Ayahuasca?" error={errors.motivacao_ayahuasca?.message}>
          <Textarea
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="motivacao_ayahuasca"
            error={errors.motivacao_ayahuasca}
            placeholder="Descreva sua motivação..."
          />
        </Field>

        <Field label="É o seu primeiro contato com a Medicina Ayahuasca?" error={errors.primeiro_contato_ayahuasca?.message}>
          <Select
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="primeiro_contato_ayahuasca"
            error={errors.primeiro_contato_ayahuasca}
            options={[
              { value: 'Sim', label: 'Sim, é o primeiro' },
              { value: 'Não', label: 'Não, já tive experiências anteriores' },
            ]}
          />
        </Field>

        {primeiroContato === 'Não' && (
          <Field label="Descreva como foram suas experiências anteriores" error={errors.experiencias_anteriores?.message}>
            <Textarea
              register={(name) => register(name, { required: 'Descrição é obrigatória' })}
              name="experiencias_anteriores"
              error={errors.experiencias_anteriores}
              placeholder="Descreva suas experiências..."
            />
          </Field>
        )}

        <Field label="Suas expectativas com relação ao processo" error={errors.expectativas?.message}>
          <Textarea
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="expectativas"
            error={errors.expectativas}
            placeholder="Descreva suas expectativas..."
          />
        </Field>
      </div>
    </SectionCard>
  );
}

export default SectionAyahuasca;
