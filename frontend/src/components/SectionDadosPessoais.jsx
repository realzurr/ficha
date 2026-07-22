import { Field, Input, Select, PhoneInput, CpfInput, SectionCard } from './FormFields';

function SectionDadosPessoais({ register, errors }) {
  return (
    <SectionCard title="Dados Pessoais" subtitle="Todas as informações são obrigatórias">
      <div className="space-y-4">
        <Field label="Nome Completo" error={errors.nome_completo?.message}>
          <Input
            register={(name) => register(name, { required: 'Nome é obrigatório' })}
            name="nome_completo"
            error={errors.nome_completo}
            placeholder="Como consta no documento"
          />
        </Field>

        <Field label="E-mail" error={errors.email?.message}>
          <Input
            register={(name) => register(name, {
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido',
              },
            })}
            name="email"
            type="email"
            error={errors.email}
            placeholder="exemplo@email.com"
          />
        </Field>

        <Field label="WhatsApp" error={errors.whatsapp?.message}>
          <PhoneInput
            register={(name) => register(name, {
              required: 'WhatsApp é obrigatório',
              minLength: { value: 14, message: 'Número incompleto' },
            })}
            name="whatsapp"
            error={errors.whatsapp}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Data de Nascimento" error={errors.data_nascimento?.message}>
            <Input
              register={(name) => register(name, {
                required: 'Data de nascimento é obrigatória',
                min: { value: '1930-01-01', message: 'Data não pode ser anterior a 01/01/1930' },
                max: { value: new Date().toISOString().split('T')[0], message: 'Data não pode ser futura' },
              })}
              name="data_nascimento"
              type="date"
              error={errors.data_nascimento}
            />
          </Field>

          <Field label="CPF" error={errors.cpf?.message}>
            <CpfInput
              register={(name) => register(name, { required: 'CPF é obrigatório' })}
              name="cpf"
              error={errors.cpf}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Sexo" error={errors.sexo?.message}>
            <Select
              register={(name) => register(name, { required: ' Sexo é obrigatório' })}
              name="sexo"
              error={errors.sexo}
              options={[
                { value: 'Masculino', label: 'Masculino' },
                { value: 'Feminino', label: 'Feminino' },
                { value: 'Outro', label: 'Outro' },
                { value: 'Prefiro não informar', label: 'Prefiro não informar' },
              ]}
            />
          </Field>

          <Field label="Estado Civil" error={errors.estado_civil?.message}>
            <Select
              register={(name) => register(name, { required: 'Estado civil é obrigatório' })}
              name="estado_civil"
              error={errors.estado_civil}
              options={[
                { value: 'Solteiro(a)', label: 'Solteiro(a)' },
                { value: 'Casado(a)', label: 'Casado(a)' },
                { value: 'Divorciado(a)', label: 'Divorciado(a)' },
                { value: 'Viúvo(a)', label: 'Viúvo(a)' },
                { value: 'União Estável', label: 'União Estável' },
              ]}
            />
          </Field>
        </div>

        <Field label="Endereço" error={errors.endereco?.message}>
          <Input
            register={(name) => register(name, { required: 'Endereço é obrigatório' })}
            name="endereco"
            placeholder="Rua, número, bairro, cidade - UF"
            error={errors.endereco}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

export default SectionDadosPessoais;
