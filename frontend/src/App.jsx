import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import FormularioAnamnese from './pages/FormularioAnamnese';
import PainelAdmin from './pages/PainelAdmin';
import Login from './pages/Login';
import DetalhesFicha from './pages/DetalhesFicha';

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormularioAnamnese />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PainelAdmin />} />
        <Route path="/admin/ficha/:id" element={<DetalhesFicha />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        toastClassName="toast-custom"
      />
    </Router>
  );
}

export default App;
