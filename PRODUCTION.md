# Deploy em Produção

## Pré-requisitos no servidor

- Ubuntu 20.04+ / Debian 11+
- Node.js 20+ (será instalado automaticamente)
- Acesso SSH com sudo

## Passo a passo

### 1. Enviar o projeto para o servidor

```bash
# Do computador local
rsync -avz --exclude='node_modules' --exclude='.git' --exclude='dist' \
  /home/renato.peixoto/projetos/site_tenda/ficha/sistema-anamnese/ \
  usuario@seu-servidor:/tmp/anamnese-tenda/
```

### 2. Acessar o servidor e rodar o deploy

```bash
# Conectar no servidor
ssh usuario@seu-servidor

# Copiar para /tmp
cd /tmp/anamnese-tenda

# Rodar script de deploy
sudo bash deploy.sh
```

### 3. (Opcional) Configurar Nginx como reverse proxy

```bash
# Copiar configuração do Nginx
sudo cp nginx-anamnese.conf /etc/nginx/sites-available/anamnese

# Editar o arquivo - trocar seu-dominio.com.br pelo domínio real
sudo nano /etc/nginx/sites-available/anamnese

# Ativar o site
sudo ln -s /etc/nginx/sites-available/anamnese /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. (Opcional) Configurar SSL com Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com.br
```

## Comandos de gerenciamento

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs anamnese-tenda

# Reiniciar
pm2 restart anamnese-tenda

# Parar
pm2 stop anamnese-tenda

# Iniciar com o sistema
pm2 startup
pm2 save
```

## Acesso

- **URL:** http://seu-servidor:30015 (sem Nginx) ou http://seu-dominio.com.br (com Nginx)
- **Admin:** admin / admin123

## Backup do banco

```bash
cp /opt/anamnese-tenda/backend/data/anamnese.db /backup/anamnese-$(date +%Y%m%d).db
```
