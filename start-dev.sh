#!/bin/bash

# Script para iniciar o Sistema de Anamnese em ambiente de desenvolvimento
# Uso: ./start-dev.sh

DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==================================="
echo "  Sistema de Anamnese - Tenda do Xamãs"
echo "  Iniciando ambiente de desenvolvimento..."
echo "==================================="
echo ""

# Verificar se as dependências estão instaladas
if [ ! -d "$DIR/backend/node_modules" ]; then
    echo "[1/3] Instalando dependências do backend..."
    (cd "$DIR/backend" && npm install)
fi

if [ ! -d "$DIR/frontend/node_modules" ]; then
    echo "[2/3] Instalando dependências do frontend..."
    (cd "$DIR/frontend" && npm install)
fi

# Verificar se o banco de dados existe
if [ ! -f "$DIR/backend/data/anamnese.db" ]; then
    echo "[3/3] Criando banco de dados..."
    (cd "$DIR/backend" && npm run migrate && node create-admin.js)
fi

echo ""
echo "Iniciando servidores..."
echo ""

# Função para encerrar processos ao sair
cleanup() {
    echo ""
    echo "Encerrando servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Iniciar backend
echo "=> Backend: http://localhost:30015"
(cd "$DIR/backend" && npm run dev) &
BACKEND_PID=$!

# Aguardar um pouco para o backend iniciar
sleep 2

# Iniciar frontend
echo "=> Frontend: http://localhost:30016"
(cd "$DIR/frontend" && npm run dev) &
FRONTEND_PID=$!

echo ""
echo "==================================="
echo "  Servidores iniciados com sucesso!"
echo "==================================="
echo ""
echo "  Frontend: http://localhost:30016"
echo "  Backend:  http://localhost:30015/api"
echo "  Admin:    http://localhost:30016/login"
echo ""
echo "  Credenciais admin:"
echo "  Usuario: admin"
echo "  Senha:   admin123"
echo ""
echo "  Pressione Ctrl+C para encerrar"
echo "==================================="
echo ""

# Aguardar processos
wait
