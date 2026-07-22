import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Field, Input } from '../components/FormFields';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Bem-vindo!');
      navigate('/admin');
    } catch {
      toast.error('Usuário ou senha inválidos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-xamas-400 to-xamas-700 flex items-center justify-center shadow-glow">
              <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-earth-900">Painel Administrativo</h1>
            <p className="text-sm text-sand-500 mt-1">Tenda do Xamãs</p>
          </div>

          {/* Form */}
          <div className="surface-elevated p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Field label="Usuário" error={errors.username?.message}>
                <Input
                  register={register}
                  name="username"
                  error={errors.username}
                  placeholder="Digite seu usuário"
                  autoComplete="username"
                />
              </Field>

              <Field label="Senha" error={errors.password?.message}>
                <Input
                  register={register}
                  name="password"
                  type="password"
                  error={errors.password}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                />
              </Field>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full mt-2 gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Entrando...
                  </>
                ) : 'Entrar'}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-sand-500 hover:text-xamas-600 transition-colors inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Voltar ao formulário
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
