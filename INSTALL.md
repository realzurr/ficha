# Instalação Manual - Sistema Anamnese Tenda do Xamãs

## Pré-requisitos

- Ubuntu 20.04+ / Debian 11+
- Acesso SSH com sudo
- Git instalado (opcional, caso envie via rsync/scp)

---

## Passo 1 — Instalar Node.js 20+

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v  # deve mostrar v20.x.x
npm -v   # deve mostrar 10.x.x
```

---

## Passo 2 — Instalar PM2

```bash
sudo npm install -g pm2
pm2 -v  # deve mostrar a versão
```

---

## Passo 3 — Criar diretório da aplicação

```bash
sudo mkdir -p /opt/anamnese-tenda
sudo chown $USER:$USER /opt/anamnese-tenda
```

---

## Passo 4 — Copiar os arquivos para o servidor

No **seu computador local**, execute:

```bash
rsync -avz --exclude='node_modules' --exclude='dist' --exclude='.git' \
  /home/renato.peixoto/projetos/site_tenda/ficha/sistema-anamnese/ \
  usuario@SEU_SERVIDOR:/tmp/anamnese-tenda/
```

Substitua `usuario@SEU_SERVIDOR` pelo seu usuário e IP/domínio do servidor.

Se não quiser usar rsync, pode usar scp:

```bash
scp -r --exclude='node_modules' --exclude='dist' --exclude='.git' \
  /home/renato.peixoto/projetos/site_tenda/ficha/sistema-anamnese/* \
  usuario@SEU_SERVIDOR:/tmp/anamnese-tenda/
```

---

## Passo 5 — Mover para o diretório final

No **servidor**:

```bash
cp -r /tmp/anamnese-tenda/* /opt/anamnese-tenda/
```

---

## Passo 6 — Instalar dependências do backend

```bash
cd /opt/anamnese-tenda/backend
npm install --production
```

---

## Passo 7 — Instalar dependências e buildar o frontend

```bash
cd /opt/anamnese-tenda/frontend
npm install
npm run build
```

Após isso, a pasta `dist/` será criada com os arquivos estáticos do frontend.

---

## Passo 8 — Criar variáveis de ambiente

```bash
cat > /opt/anamnese-tenda/backend/.env << 'EOF'
NODE_ENV=production
PORT=30015
FRONTEND_URL=http://localhost:30015
JWT_SECRET=COLE_UMA_STRING_ALEATORIA_AQUI
EOF
```

Para gerar um JWT_SECRET seguro:

```bash
openssl rand -hex 32
```

Cole o resultado no lugar de `COLE_UMA_STRING_ALEATORIA_AQUI`.

---

## Passo 9 — Criar usuário admin

```bash
cd /opt/anamnese-tenda/backend
node create-admin.js
```

Credenciais padrão:
- **Login:** admin
- **Senha:** admin123

---

## Passo 10 — Testar o servidor

```bash
cd /opt/anamnese-tenda/backend
node server.js
```

Abra o navegador e acesse: `http://SEU_SERVIDOR:30015`

Se funcionar, pressione `Ctrl+C` para parar.

---

## Passo 11 — Iniciar com PM2 (produção)

```bash
pm2 start /opt/anamnese-tenda/backend/server.js --name anamnese-tenda
pm2 save
pm2 startup
```

O último comando vai mostrar algo como:

```
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u SEU_USUARIO --hp /home/SEU_USUARIO
```

**Copie e execute esse comando** para o PM2 iniciar automaticamente com o sistema.

---

## Passo 12 — Verificar status

```bash
pm2 status
pm2 logs anamnese-tenda
```

---

## (Opcional) Passo 13 — Configurar Nginx

Se quiser acesso pela porta 80 (HTTP) e não pela 30015:

```bash
sudo apt install nginx -y

sudo cp /opt/anamnese-tenda/nginx-anamnese.conf /etc/nginx/sites-available/anamnese

sudo nano /etc/nginx/sites-available/anamnese
# Troque "seu-dominio.com.br" pelo seu domínio ou IP

sudo ln -s /etc/nginx/sites-available/anamnese /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

---

## (Opcional) Passo 14 — SSL com Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d seu-dominio.com.br
```

---

## Comandos úteis

```bash
pm2 status                    # Ver status
pm2 logs anamnese-tenda       # Ver logs em tempo real
pm2 restart anamnese-tenda    # Reiniciar
pm2 stop anamnese-tenda       # Parar
pm2 delete anamnese-tenda     # Remover
```

---

## Backup do banco

```bash
cp /opt/anamnese-tenda/backend/data/anamnese.db /backup/anamnese-$(date +%Y%m%d).db
```

---

## Acesso

| URL | Descrição |
|-----|-----------|
| http://SEU_SERVIDOR:30015 | Sem Nginx |
| http://SEU_SERVIDOR | Com Nginx |
| http://SEU_SERVIDOR:30015/api/health | Health check da API |
