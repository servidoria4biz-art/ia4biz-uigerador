# Setup EasyPanel - IA4BIZ UI Gerador

## 📋 Guia Passo a Passo

### 1️⃣ Preparação Local (já feito!)

✅ Arquivos criados:
- `next.config.js` - Configuração otimizada
- `Dockerfile` - Container para produção
- `.dockerignore` - Arquivos ignorados no build
- `.env.production.example` - Template de variáveis

---

### 2️⃣ No EasyPanel - Criar Aplicação

1. **Login no painel:**
   - Acesse: https://painel.servidorseusouza.com.br

2. **Criar Nova Aplicação:**
   - Clique em **"New Project"** ou **"Add Application"**
   - **Name:** `ia4biz-uigerador`
   - **Type:** Docker ou Node.js

3. **Escolher método de deploy:**

   #### Opção A: GitHub (Recomendado)
   - Conecte o repositório GitHub
   - Branch: `main` ou `master`
   - Deploy automático a cada push

   #### Opção B: Upload Manual
   - Compacte o projeto (sem node_modules)
   - Faça upload do arquivo

---

### 3️⃣ Configurar Variáveis de Ambiente

No EasyPanel, vá em **Settings** → **Environment Variables**

Adicione:

```bash
OPENAI_API_KEY=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

NODE_ENV=production

NEXT_TELEMETRY_DISABLED=1
```

**⚠️ Importante:** Nunca commite o `.env` com a chave real no GitHub!

---

### 4️⃣ Configurar Build

Se o EasyPanel pedir comandos de build:

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Port:**
```
3000
```

---

### 5️⃣ Adicionar Domínio Customizado

1. **No EasyPanel:**
   - Vá em **Domains** (a página que você abriu)
   - Clique em **"Add Domain"**
   - Digite: `uigerador.servidorseusouza.com.br`
   - Salve

2. **O EasyPanel vai mostrar:**
   - Um endereço temporário tipo: `ia4biz-uigerador-xxx.easypanel.host`
   - Instruções de DNS

3. **Copie esse endereço** para o próximo passo!

---

### 6️⃣ Configurar DNS no Cloudflare

1. **Acesse:** https://dash.cloudflare.com

2. **Selecione:** servidorseusouza.com.br

3. **Vá em:** DNS → Records

4. **Clique:** Add Record

5. **Preencha:**
   ```
   Type: CNAME
   Name: uigerador
   Target: [ENDEREÇO QUE O EASYPANEL DEU]
   Proxy status: Proxied (laranja ativo)
   TTL: Auto
   ```

6. **Salve**

---

### 7️⃣ Configurar SSL no Cloudflare

1. **SSL/TLS** → **Overview**
   - Modo: **Full** ou **Full (strict)**

2. **Edge Certificates:**
   - ✅ Always Use HTTPS: **ON**
   - ✅ Automatic HTTPS Rewrites: **ON**

---

### 8️⃣ Testar Deploy

Aguarde 2-5 minutos e teste:

```bash
# Testar DNS
nslookup uigerador.servidorseusouza.com.br

# Testar HTTPS
curl -I https://uigerador.servidorseusouza.com.br
```

Ou simplesmente abra no navegador:
```
https://uigerador.servidorseusouza.com.br
```

---

## 🎯 Resultado Esperado

Você vai ver:
- ✅ Logo IA4BIZ com efeito brilhante
- ✅ Cores Navy + Cyan
- ✅ Interface funcionando
- ✅ Geração de UI com IA
- ✅ HTTPS com cadeado verde

---

## 🆘 Problemas Comuns

### App não inicia
- Verifique logs no EasyPanel
- Confirme variáveis de ambiente
- Teste build local: `npm run build && npm start`

### Domínio não resolve
- Aguarde propagação DNS (5-10 min)
- Verifique registro no Cloudflare
- Confirme Proxy está ativo (laranja)

### Erro 502/503
- App ainda está iniciando (aguarde 1-2 min)
- Verifique porta 3000 configurada
- Veja logs do container

### SSL não funciona
- Modo SSL no Cloudflare: Full/Full Strict
- Aguarde geração do certificado (1-2 min)
- Force HTTPS nas configurações

---

## 📊 Monitoramento

### Logs no EasyPanel
- Acesse a aplicação
- Clique em **Logs**
- Monitore erros em tempo real

### Métricas
- CPU usage
- Memory usage
- Request count
- Response time

---

## 🔄 Próximos Passos

Depois que o gerador estiver funcionando:

1. **Deploy N8N:**
   - Subdomínio: `n8n.servidorseusouza.com.br`
   - Image Docker: `n8nio/n8n:latest`
   - Com autenticação obrigatória

2. **Site Principal IA4BIZ:**
   - Subdomínio: `ia4biz.servidorseusouza.com.br`
   - Landing page da agência

3. **API Endpoints:**
   - Subdomínio: `api.servidorseusouza.com.br`
   - APIs para clientes

---

## 📞 Checklist Final

Antes de marcar como concluído:

- [ ] Aplicação criada no EasyPanel
- [ ] Variáveis de ambiente configuradas
- [ ] Build executado com sucesso
- [ ] Domínio customizado adicionado
- [ ] DNS configurado no Cloudflare
- [ ] SSL ativo (HTTPS funcionando)
- [ ] Interface acessível e funcionando
- [ ] Geração de UI testada
- [ ] Logs sem erros críticos

---

**IA4BIZ** - Deploy Guide
*Eficiência hoje. Escala amanhã.*

Para dúvidas, consulte: `ia4biz/DEPLOY-GUIDE.md`
