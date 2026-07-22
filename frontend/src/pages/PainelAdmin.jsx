import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function PainelAdmin() {
  const [fichas, setFichas] = useState([]);
  const [stats, setStats] = useState({ total: 0, hoje: 0, semana: 0 });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    loadData();
  }, [page, search]);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [fichasRes, statsRes] = await Promise.all([
        axios.get('/api/fichas', {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, limit: 20, search },
        }),
        axios.get('/api/fichas/stats/overview', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setFichas(fichasRes.data.fichas);
      setPagination(fichasRes.data.pagination);
      setStats(statsRes.data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta ficha?')) return;
    try {
      await axios.delete(`/api/fichas/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Ficha excluída');
      loadData();
    } catch {
      toast.error('Erro ao excluir');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const fmtDate = (d) => new Date(d).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  return (
    <div className="min-h-dvh bg-gradient-to-br from-xamas-50 via-sand-50 to-sage-50">
      {/* Header */}
      <header className="app-header-dark">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">Painel Administrativo</h1>
              <p className="text-xs text-white/60">Tenda do Xamãs</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn-ghost text-white/80 hover:text-white hover:bg-white/10 text-xs px-3 py-2">
              Formulário
            </Link>
            <button onClick={logout} className="btn-ghost text-white/80 hover:text-white hover:bg-white/10 text-xs px-3 py-2">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in">
          {[
            { label: 'Total', value: stats.total, color: 'xamas' },
            { label: 'Hoje', value: stats.hoje, color: 'sage' },
            { label: '7 dias', value: stats.semana, color: 'sand' },
          ].map((s) => (
            <div key={s.label} className="surface p-4 text-center">
              <p className="text-xs font-medium text-sand-500 uppercase tracking-wider">{s.label}</p>
              <p className={`text-2xl sm:text-3xl font-bold mt-1 text-${s.color}-600`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="surface p-3">
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nome, CPF ou email..."
              className="input-field pl-10"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="surface-elevated overflow-hidden">
          <div className="px-5 py-4 border-b border-sand-100">
            <h2 className="text-sm font-bold text-earth-800 uppercase tracking-wider">Fichas Recebidas</h2>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-xamas-300 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-sand-400 mt-3">Carregando...</p>
            </div>
          ) : fichas.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sand-400">Nenhuma ficha encontrada</p>
            </div>
          ) : (
            <>
              {/* Mobile cards */}
              <div className="sm:hidden divide-y divide-sand-100">
                {fichas.map((f) => (
                  <div key={f.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <p className="font-semibold text-earth-900 truncate">{f.nome_completo}</p>
                        <p className="text-xs text-sand-400 mt-0.5">{fmtDate(f.created_at)}</p>
                      </div>
                      <span className="badge-neutral shrink-0 ml-2">#{f.id}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-xs text-sand-500">
                      {f.email && <span className="truncate max-w-[180px]">{f.email}</span>}
                      {f.whatsapp && <span>{f.whatsapp}</span>}
                    </div>
                    <div className="flex gap-3 pt-1">
                      <Link to={`/admin/ficha/${f.id}`} className="text-xs font-semibold text-xamas-600 hover:text-xamas-700">
                        Ver detalhes →
                      </Link>
                      <button onClick={() => handleDelete(f.id)} className="text-xs font-medium text-sand-400 hover:text-red-500 ml-auto">
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs font-semibold text-sand-500 uppercase tracking-wider border-b border-sand-100">
                      <th className="px-5 py-3">Nome</th>
                      <th className="px-5 py-3">CPF</th>
                      <th className="px-5 py-3">Email</th>
                      <th className="px-5 py-3">Data</th>
                      <th className="px-5 py-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-50">
                    {fichas.map((f) => (
                      <tr key={f.id} className="hover:bg-xamas-50/50 transition-colors">
                        <td className="px-5 py-3 font-medium text-earth-900">{f.nome_completo}</td>
                        <td className="px-5 py-3 text-sand-500">{f.cpf || '—'}</td>
                        <td className="px-5 py-3 text-sand-500 max-w-[200px] truncate">{f.email || '—'}</td>
                        <td className="px-5 py-3 text-sand-400 text-xs">{fmtDate(f.created_at)}</td>
                        <td className="px-5 py-3 text-right space-x-3">
                          <Link to={`/admin/ficha/${f.id}`} className="text-xs font-semibold text-xamas-600 hover:text-xamas-700">
                            Ver
                          </Link>
                          <button onClick={() => handleDelete(f.id)} className="text-xs font-medium text-sand-400 hover:text-red-500">
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-5 py-3 border-t border-sand-100 flex items-center justify-between">
                <p className="text-xs text-sand-400">
                  {pagination.total} fichas — página {page} de {pagination.pages}
                </p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="btn-ghost text-xs px-3 py-2 disabled:opacity-30"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                    disabled={page === pagination.pages}
                    className="btn-ghost text-xs px-3 py-2 disabled:opacity-30"
                  >
                    Próxima →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default PainelAdmin;
