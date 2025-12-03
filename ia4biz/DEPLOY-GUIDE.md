# Guia de Deploy - IA4BIZ

## 🌐 Configuração de Domínio e Subdomínios

### Estrutura Planejada

```
DOMÍNIO PRINCIPAL
├── seudominio.com.br              → Site principal IA4BIZ (futuro)
├── n8n.seudominio.com.br         → N8N Workflows
├── uigerador.seudominio.com.br   → Gerador de UI
└── api.seudominio.com.br         → APIs (futuro)
```

---

## 📋 Pré-requisitos

- ✅ Domínio registrado (Registro.br)
- ✅ DNS no Cloudflare
- ✅ Conta no EasyPanel
- ✅ Projeto Next.js pronto

---

## 1️⃣ Configurar DNS no Cloudflare

### Acessar Cloudflare
1. Entre em: https://dash.cloudflare.com
2. Selecione seu domínio
3. Vá em **DNS** → **Records**

### Adicionar Registros DNS

Para cada subdomínio, adicione um registro **CNAME** ou **A**:

#### Opção A: Se EasyPanel fornece IP (registro A)
```
Type: A
Name: n8n
IPv4: [IP DO SERVIDOR EASYPANEL]
Proxy: ✅ Proxied (laranja)
TTL: Auto
```

```
Type: A
Name: uigerador
IPv4: [IP DO SERVIDOR EASYPANEL]
Proxy: ✅ Proxied (laranja)
TTL: Auto
```

#### Opção B: Se EasyPanel fornece domínio (registro CNAME)
```
Type: CNAME
Name: n8n
Target: seu-app.easypanel.host
Proxy: ✅ Proxied (laranja)
TTL: Auto
```

```
Type: CNAME
Name: uigerador
Target: seu-app.easypanel.host
Proxy: ✅ Proxied (laranja)
TTL: Auto
```

### 🔒 SSL/TLS no Cloudflare

1. Vá em **SSL/TLS** → **Overview**
2. Selecione: **Full (strict)** ou **Full**
3. Em **Edge Certificates**:
   - ✅ Always Use HTTPS: ON
   - ✅ Automatic HTTPS Rewrites: ON

---

## 2️⃣ Preparar Projeto para Deploy

### Criar arquivo de configuração Next.js

Arquivo: `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,

  // Variáveis de ambiente públicas
  env: {
    NEXT_PUBLIC_APP_NAME: 'IA4BIZ UI Generator',
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### Criar .dockerignore (para EasyPanel)
```
node_modules
.next
.git
.env.local
.DS_Store
*.log
npm-debug.log*
.vscode
.idea
```

### Criar Dockerfile (se EasyPanel exigir)
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
```

---

## 3️⃣ Deploy no EasyPanel

### Via Interface Web

1. **Login no EasyPanel**
   - Acesse seu painel

2. **Criar Novo Projeto**
   - Click em "New Project"
   - Nome: `ia4biz-uigerador`

3. **Conectar GitHub** (recomendado)
   - Faça push do código para GitHub
   - Conecte repositório no EasyPanel
   - Deploy automático em cada commit

4. **Ou Upload Manual**
   - Compacte o projeto: `tar -czf projeto.tar.gz .`
   - Upload via interface

5. **Configurar Variáveis de Ambiente**
   - Adicione: `OPENAI_API_KEY=sk-proj-...`
   - Adicione outras variáveis necessárias

6. **Configurar Domínio Customizado**
   - Vá em Settings → Domains
   - Adicione: `uigerador.seudominio.com.br`
   - EasyPanel vai gerar certificado SSL automaticamente

### Via CLI (se disponível)

```bash
# Instalar CLI do EasyPanel (se existir)
npm install -g easypanel-cli

# Login
easypanel login

# Deploy
easypanel deploy --app ia4biz-uigerador --domain uigerador.seudominio.com.br
```

---

## 4️⃣ Fazer Build Local (testar antes)

```bash
# Navegar até o projeto
cd /Users/gruposeusouza/gerador-ui-ia

# Instalar dependências
npm install

# Criar build de produção
npm run build

# Testar build localmente
npm start

# Acesse: http://localhost:3000
```

Se funcionar local, vai funcionar no servidor!

---

## 5️⃣ Deploy N8N no EasyPanel

### Criar Instância N8N

1. **Novo Projeto no EasyPanel**
   - Nome: `ia4biz-n8n`
   - Tipo: Docker Image
   - Image: `n8nio/n8n:latest`

2. **Variáveis de Ambiente**
   ```
   N8N_BASIC_AUTH_ACTIVE=true
   N8N_BASIC_AUTH_USER=admin
   N8N_BASIC_AUTH_PASSWORD=[SENHA FORTE AQUI]
   N8N_HOST=n8n.seudominio.com.br
   N8N_PROTOCOL=https
   N8N_PORT=5678
   WEBHOOK_URL=https://n8n.seudominio.com.br/
   ```

3. **Configurar Domínio**
   - Adicione: `n8n.seudominio.com.br`

4. **Persistência de Dados**
   - Configure volume: `/home/node/.n8n`

---

## 6️⃣ Verificar Deploy

### Testar Subdomínios

```bash
# Testar DNS
nslookup uigerador.seudominio.com.br
nslookup n8n.seudominio.com.br

# Testar HTTPS
curl -I https://uigerador.seudominio.com.br
curl -I https://n8n.seudominio.com.br
```

### Checklist Final

- [ ] DNS configurado no Cloudflare
- [ ] Registros CNAME/A criados
- [ ] SSL/TLS ativo (cadeado verde)
- [ ] Deploy no EasyPanel concluído
- [ ] Variáveis de ambiente configuradas
- [ ] Domínios customizados funcionando
- [ ] N8N com autenticação ativa
- [ ] Gerador de UI acessível

---

## 🔒 Segurança

### N8N
- ✅ Sempre use autenticação
- ✅ Senha forte (mínimo 16 caracteres)
- ✅ Considere adicionar 2FA
- ✅ Restrinja acesso por IP se possível

### Gerador UI
- ✅ Considere adicionar autenticação para uso interno
- ✅ Rate limiting na API
- ✅ Monitore uso da API OpenAI

### Cloudflare
- ✅ Firewall ativo
- ✅ Bot protection
- ✅ DDoS protection automático

---

## 📊 Monitoramento

### Logs no EasyPanel
- Acesse logs de cada aplicação
- Monitore erros
- Acompanhe performance

### Analytics Cloudflare
- Tráfego por subdomínio
- Requisições bloqueadas
- Performance metrics

---

## 🆘 Troubleshooting

### Domínio não resolve
- Aguarde propagação DNS (até 48h, geralmente 5-10min)
- Verifique registros no Cloudflare
- Teste com: `dig uigerador.seudominio.com.br`

### SSL não funciona
- Verifique modo SSL no Cloudflare (Full/Full Strict)
- Certifique-se que EasyPanel gerou certificado
- Limpe cache do Cloudflare

### App não carrega
- Verifique logs no EasyPanel
- Confirme variáveis de ambiente
- Teste build localmente primeiro

---

**IA4BIZ** - Deploy e Infraestrutura
*Eficiência hoje. Escala amanhã.*
