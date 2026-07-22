import { Field, Input, PhoneInput, SectionCard } from './FormFields';

function SectionContatoEmergencia({ register, errors }) {
  return (
    <SectionCard title="Contato de Emergência" subtitle="Pessoa para ser acionada em caso de urgência">
      <div className="p-4 rounded-xl bg-xamas-50 border border-xamas-200/50">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-xamas-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className="text-sm text-xamas-700">
            Essas informações são importantes para garantir a sua segurança e de seus familiares.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Field label="Nome da pessoa de contato" error={errors.nome_contato_emergencia?.message}>
          <Input
            register={(name) => register(name, { required: 'Nome é obrigatório' })}
            name="nome_contato_emergencia"
            error={errors.nome_contato_emergencia}
            placeholder="Nome completo"
          />
        </Field>

        <Field label="Telefone (WhatsApp) de contato" error={errors.telefone_contato_emergencia?.message}>
          <PhoneInput
            register={(name) => register(name, {
              required: 'Telefone é obrigatório',
              minLength: { value: 14, message: 'Número incompleto' },
            })}
            name="telefone_contato_emergencia"
            error={errors.telefone_contato_emergencia}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

export default SectionContatoEmergencia;
