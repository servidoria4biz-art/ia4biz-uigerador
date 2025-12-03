# Configuração de Domínios - IA4BIZ

## 🌐 Estrutura de Domínios

**Domínio Principal:** `ia4biz.com.br`

### Subdomínios Planejados

```
ia4biz.com.br                    → Site principal da agência IA4BIZ
├── www.ia4biz.com.br           → Redirect para ia4biz.com.br
├── n8n.ia4biz.com.br           → N8N - Automações e workflows
├── uigerador.ia4biz.com.br     → Gerador de UI com IA
├── app.ia4biz.com.br           → Aplicação principal (futuro)
└── api.ia4biz.com.br           → API endpoints (futuro)
```

---

## 🎯 Prioridade de Deploy

### 1º - Gerador de UI
**Subdomínio:** `uigerador.ia4biz.com.br`
**Status:** ✅ Pronto para deploy
**Localização:** `/Users/gruposeusouza/gerador-ui-ia`

### 2º - N8N
**Subdomínio:** `n8n.ia4biz.com.br`
**Status:** ⏳ Próximo passo
**Tipo:** Docker (n8nio/n8n)

### 3º - Site Principal
**Subdomínio:** `ia4biz.com.br` (root)
**Status:** 📋 Planejamento
**Tipo:** Landing page institucional

---

## ☁️ DNS no Cloudflare

### Passo 1: Acessar Cloudflare
```
https://dash.cloudflare.com
```

### Passo 2: Selecionar Domínio
Clique em: **ia4biz.com.br**

### Passo 3: Adicionar Registros DNS

#### Para o Gerador de UI:

**Após criar a aplicação no EasyPanel**, adicione:

```
Type: CNAME
Name: uigerador
Target: [SEU-APP].easypanel.host
Proxy: ✅ Proxied (ícone laranja)
TTL: Auto
```

#### Para o N8N (futuramente):

```
Type: CNAME
Name: n8n
Target: [SEU-N8N].easypanel.host
Proxy: ✅ Proxied
TTL: Auto
```

#### Para o WWW (redirect):

```
Type: CNAME
Name: www
Target: ia4biz.com.br
Proxy: ✅ Proxied
TTL: Auto
```

---

## 🔐 Configurações SSL Cloudflare

### Modo SSL/TLS
1. Vá em: **SSL/TLS** → **Overview**
2. Selecione: **Full (strict)** ← RECOMENDADO
   - Ou: **Full** (se der erro no certificado)

### Edge Certificates
1. **SSL/TLS** → **Edge Certificates**
2. Ative:
   - ✅ **Always Use HTTPS:** ON
   - ✅ **Automatic HTTPS Rewrites:** ON
   - ✅ **Minimum TLS Version:** TLS 1.2
   - ✅ **Opportunistic Encryption:** ON
   - ✅ **TLS 1.3:** ON

### Page Rules (opcional, mas recomendado)
Criar regra para forçar HTTPS:

```
URL: http://*ia4biz.com.br/*
Setting: Always Use HTTPS
```

---

## 🚀 Deploy no EasyPanel

### URLs Temporárias

Após criar as aplicações, o EasyPanel vai gerar URLs temporárias:

```
ia4biz-uigerador.easypanel.host     → Gerador UI
ia4biz-n8n.easypanel.host           → N8N
```

**Use essas URLs** como "Target" nos registros CNAME do Cloudflare!

---

## 📋 Checklist de Configuração

### Cloudflare
- [ ] Domínio ia4biz.com.br adicionado
- [ ] Nameservers apontados para Cloudflare
- [ ] SSL/TLS configurado (Full Strict)
- [ ] Always Use HTTPS ativado
- [ ] CNAME para uigerador criado
- [ ] CNAME para n8n criado (quando deploy)

### EasyPanel
- [ ] Aplicação uigerador criada
- [ ] Variáveis de ambiente configuradas
- [ ] Domínio customizado adicionado
- [ ] Deploy concluído com sucesso
- [ ] URL temporária obtida

### DNS
- [ ] Propagação concluída (teste: nslookup)
- [ ] HTTPS funcionando (cadeado verde)
- [ ] Redirecionamento HTTP→HTTPS ativo

---

## 🧪 Testar Configuração

### Via Terminal

```bash
# Testar resolução DNS
nslookup uigerador.ia4biz.com.br

# Testar conectividade HTTPS
curl -I https://uigerador.ia4biz.com.br

# Testar redirecionamento HTTP→HTTPS
curl -I http://uigerador.ia4biz.com.br
```

### Via Navegador

Acesse e verifique:
- ✅ `https://uigerador.ia4biz.com.br` (deve carregar)
- ✅ Cadeado verde (SSL válido)
- ✅ Interface IA4BIZ aparecendo
- ✅ Geração de UI funcionando

---

## 🎨 Resultado Final

Quando tudo estiver configurado:

```
https://uigerador.ia4biz.com.br
    ↓
✅ Interface com logo IA4BIZ
✅ Cores oficiais (Navy + Cyan)
✅ SSL válido (cadeado verde)
✅ Geração de UI funcionando
✅ Performance otimizada (Cloudflare CDN)
✅ DDoS protection automático
```

---

## 🔄 Próximos Subdomínios

### N8N - Automações
```
Subdomínio: n8n.ia4biz.com.br
Porta: 5678
Autenticação: Obrigatória
Variáveis:
  - N8N_BASIC_AUTH_ACTIVE=true
  - N8N_BASIC_AUTH_USER=admin
  - N8N_BASIC_AUTH_PASSWORD=[SENHA-FORTE]
  - N8N_HOST=n8n.ia4biz.com.br
  - N8N_PROTOCOL=https
  - WEBHOOK_URL=https://n8n.ia4biz.com.br/
```

### Site Principal
```
Subdomínio: ia4biz.com.br (root)
Tipo: Landing page Next.js
Seções:
  - Hero com proposta de valor
  - 4 Pilares (Automação, Escala, Vendas, Segurança)
  - Cases de sucesso
  - Serviços
  - Contato
```

---

## 📊 Monitoramento Cloudflare

### Analytics
- Tráfego por subdomínio
- Requests por país
- Bandwidth usage
- Cache hit rate

### Security
- Firewall events
- Threats blocked
- Bot score analytics

### Performance
- Page load time
- Origin response time
- Cache effectiveness

---

**IA4BIZ.COM.BR** - Configuração Completa
*Eficiência hoje. Escala amanhã.*

🧠 Automação · Escala · Vendas · Segurança
