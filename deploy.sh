#!/bin/bash
# ============================================
# Script de Deploy - Sistema Anamnese Tenda do Xamãs
# ============================================

set -e

APP_NAME="anamnese-tenda"
APP_DIR="/opt/$APP_NAME"
NODE_ENV="production"
PORT=30015

echo "=========================================="
echo "  Deploy - Sistema Anamnese Tenda do Xamãs"
echo "=========================================="

# 1. Instalar dependências do sistema (se necessário)
echo ""
echo "[1/7] Verificando dependências do sistema..."
if ! command -v node &> /dev/null; then
    echo "  Node.js não encontrado. Instalando..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

if ! command -v pm2 &> /dev/null; then
    echo "  PM2 não encontrado. Instalando..."
    sudo npm install -g pm2
fi

echo "  Node.js: $(node -v)"
echo "  NPM: $(npm -v)"
echo "  PM2: $(pm2 -v)"

# 2. Criar diretório da aplicação
echo ""
echo "[2/7] Preparando diretório da aplicação..."
sudo mkdir -p "$APP_DIR"
sudo chown $(whoami):$(whoami) "$APP_DIR"

# 3. Copiar arquivos
echo ""
echo "[3/7] Copiando arquivos..."
rsync -av --exclude='node_modules' --exclude='.git' --exclude='dist' ./ "$APP_DIR/"

# 4. Instalar dependências
echo ""
echo "[4/7] Instalando dependências do backend..."
cd "$APP_DIR/backend"
npm install --production

echo ""
echo "[5/7] Instalando e buildando frontend..."
cd "$APP_DIR/frontend"
npm install
npm run build

# 5. Configurar variáveis de ambiente
echo ""
echo "[6/7] Configurando variáveis de ambiente..."
cat > "$APP_DIR/backend/.env" << EOF
NODE_ENV=production
PORT=$PORT
FRONTEND_URL=http://localhost:$PORT
JWT_SECRET=$(openssl rand -hex 32)
EOF

# 6. Criar admin padrão
echo ""
echo "[7/7] Criando usuário admin padrão..."
cd "$APP_DIR/backend"
node create-admin.js 2>/dev/null || echo "  Admin já existe ou erro ao criar"

# 7. Configurar PM2
echo ""
echo "Configurando PM2..."
cd "$APP_DIR"

pm2 delete $APP_NAME 2>/dev/null || true

pm2 start backend/server.js \
  --name "$APP_NAME" \
  --cwd "$APP_DIR/backend" \
  --env production \
  --max-memory-restart 256M \
  --log-date-format "YYYY-MM-DD HH:mm:ss"

pm2 save

# Configurar PM2 para iniciar com o sistema
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $(whoami) --hp /home/$(whoami) 2>/dev/null || true

echo ""
echo "=========================================="
echo "  Deploy concluído com sucesso!"
echo "=========================================="
echo ""
echo "  Aplicação: http://localhost:$PORT"
echo "  API:       http://localhost:$PORT/api"
echo "  Health:    http://localhost:$PORT/api/health"
echo ""
echo "  Comandos úteis:"
echo "    pm2 status          - Ver status"
echo "    pm2 logs $APP_NAME  - Ver logs"
echo "    pm2 restart $APP_NAME - Reiniciar"
echo "    pm2 stop $APP_NAME  - Parar"
echo ""
echo "  Credenciais admin:"
echo "    Login: admin"
echo "    Senha: admin123"
echo "    (Alterar após primeiro acesso!)"
echo ""
