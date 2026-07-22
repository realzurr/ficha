export function Field({ label, hint, error, children, className = '' }) {
  return (
    <div className={`space-y-1.5 animate-fade-in ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {hint && <span className="form-label-hint">{hint}</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="form-error">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ register, name, error, className = '', ...props }) {
  const registerProps = typeof register === 'function' ? register(name) : register(name);
  return (
    <input
      className={`input-field ${error ? 'input-error' : ''} ${className}`}
      {...registerProps}
      {...props}
    />
  );
}

export function Textarea({ register, name, error, className = '', ...props }) {
  const registerProps = typeof register === 'function' ? register(name) : register(name);
  return (
    <textarea
      className={`textarea-field ${error ? 'input-error' : ''} ${className}`}
      {...registerProps}
      {...props}
    />
  );
}

export function Select({ register, name, error, options, placeholder = 'Selecione...', className = '' }) {
  const registerProps = typeof register === 'function' ? register(name) : register(name);
  return (
    <select
      className={`select-field ${error ? 'input-error' : ''} ${className}`}
      {...registerProps}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function PhoneInput({ register, name, error, className = '', ...props }) {
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits.replace(/(\d{0,2})/, '($1');
    if (digits.length <= 7) return digits.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };

  const baseRegister = typeof register === 'function' ? register(name, {
    onChange: (e) => { e.target.value = formatPhone(e.target.value); },
  }) : register(name);

  const { onChange: originalOnChange, ...restRegister } = baseRegister;

  const handleChange = (e) => {
    const formatted = formatPhone(e.target.value);
    e.target.value = formatted;
    if (originalOnChange) originalOnChange(e);
  };

  return (
    <input
      className={`input-field ${error ? 'input-error' : ''} ${className}`}
      {...restRegister}
      onChange={handleChange}
      type="tel"
      inputMode="numeric"
      placeholder="(00) 00000-0000"
      maxLength={15}
      {...props}
    />
  );
}

export function CpfInput({ register, name, error, className = '', ...props }) {
  const formatCpf = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits.replace(/(\d{0,3})/, '$1');
    if (digits.length <= 6) return digits.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    if (digits.length <= 9) return digits.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  };

  const baseRegister = typeof register === 'function' ? register(name, {
    onChange: (e) => { e.target.value = formatCpf(e.target.value); },
  }) : register(name);

  const { onChange: originalOnChange, ...restRegister } = baseRegister;

  const handleChange = (e) => {
    const formatted = formatCpf(e.target.value);
    e.target.value = formatted;
    if (originalOnChange) originalOnChange(e);
  };

  return (
    <input
      className={`input-field ${error ? 'input-error' : ''} ${className}`}
      {...restRegister}
      onChange={handleChange}
      type="text"
      inputMode="numeric"
      placeholder="000.000.000-00"
      maxLength={14}
      {...props}
    />
  );
}

export function RadioGroup({ register, name, options, watch }) {
  const currentValue = watch ? watch(name) : '';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`radio-card ${currentValue === opt.value ? 'selected' : ''}`}
        >
          <input type="radio" className="shrink-0" value={opt.value} {...register(name)} />
          <span className="text-sm font-medium">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

export function SectionCard({ children, title, subtitle, className = '' }) {
  return (
    <div className={`surface p-5 sm:p-6 space-y-5 ${className}`}>
      {title && (
        <div className="space-y-1">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="text-sm text-sand-500">{subtitle}</p>}
          <div className="divider mt-3" />
        </div>
      )}
      {children}
    </div>
  );
}
