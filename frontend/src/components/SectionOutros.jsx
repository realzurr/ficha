import { Field, Textarea, SectionCard } from './FormFields';

function SectionOutros({ register, errors }) {
  return (
    <SectionCard title="Informações Finais" subtitle="Observações e medicamentos">
      <div className="space-y-4">
        <Field label="Existe algo importante que precisa relatar?" error={errors.coisas_importantes?.message}>
          <Textarea
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="coisas_importantes"
            error={errors.coisas_importantes}
            placeholder="Qualquer informação que considere importante..."
          />
        </Field>

        <Field label="Medicamentos de uso contínuo" error={errors.medicamentos_uso_continuo?.message}>
          <Textarea
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="medicamentos_uso_continuo"
            error={errors.medicamentos_uso_continuo}
            placeholder="Liste todos os medicamentos..."
          />
        </Field>

        <Field label="Disponibilidade para o processo (0 a 10)" error={errors.disponibilidade_autocura?.message}>
          <Textarea
            register={(name) => register(name, { required: 'Campo obrigatório' })}
            name="disponibilidade_autocura"
            error={errors.disponibilidade_autocura}
            placeholder="De 0 a 10, o quanto você está disponível e disposto a iniciar o seu processo de autocura, autoconhecimento e expansão da consciência?"
          />
        </Field>

        <div className="p-4 rounded-xl bg-sage-50 border border-sage-200/50">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <p className="text-sm text-sage-800">
              Ao enviar esta ficha, declaro que todas as informações prestadas são verdadeiras e que estou ciente de que dados falsos podem comprometer meu atendimento.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export default SectionOutros;
