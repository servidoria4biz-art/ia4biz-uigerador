# IA4BIZ - Gerador de UI com IA

## 📋 Visão Geral do Projeto

Ferramenta profissional para geração de interfaces web usando Inteligência Artificial, com identidade visual IA4BIZ completa.

---

## 🎨 Identidade Visual Aplicada

### Cores Implementadas
- **Midnight Navy:** `#071425` - Background principal
- **Deep Navy:** `#0B1F36` - Background secundário
- **Tech Cyan:** `#14B8D4` - Cor principal de destaque
- **Tech Blue:** `#3B82F6` - Gradientes e botões
- **Growth Green:** `#22C55E` - Acento no logo
- **Cool Gray:** `#94A3B8` - Textos secundários

### Elementos de Marca
- Logo centralizado com símbolo ⚡ (representa brain-circuit)
- Título "IA4BIZ" com gradiente cyan→blue→green
- Tagline "IA for business"
- Slogan "Eficiência hoje. Escala amanhã."
- Footer com os 4 Pilares: Automação · Escala · Vendas · Segurança

---

## 📁 Estrutura do Projeto

```
gerador-ui-ia/
├── ia4biz/                          # Organização IA4BIZ
│   ├── README.md                    # Documentação principal
│   ├── PROJETO-OVERVIEW.md          # Este arquivo
│   ├── brand/                       # Identidade visual
│   │   └── IA4BIZ-BRAND.md         # Manual da marca
│   ├── templates/                   # Templates prontos
│   │   └── README.md               # Guia de templates
│   ├── prompts/                     # Prompts otimizados
│   │   ├── README.md               # Guia de prompts
│   │   └── PROMPT-BARBEARIA-SEU-SOUZA.txt
│   └── assets/                      # Logos e imagens
│
├── pages/
│   ├── api/
│   │   └── generate.js             # API OpenAI GPT-4o
│   └── index.js                    # Interface principal
│
├── styles/
│   └── Home.module.css             # Estilos IA4BIZ
│
├── .env.local                      # Chave API OpenAI
└── package.json                    # Dependências

```

---

## 🚀 Tecnologias

- **Framework:** Next.js 16.0.6
- **UI:** React 18.3.1
- **IA:** OpenAI GPT-4o
- **Styling:** CSS Modules
- **API:** Next.js API Routes

---

## ⚙️ Como Usar

### 1. Iniciar o Servidor
```bash
cd /Users/gruposeusouza/gerador-ui-ia
npm run dev
```

### 2. Acessar
Abra o navegador em: `http://localhost:3000`

### 3. Gerar Interface
1. Descreva a interface desejada no campo de texto
2. Use os prompts otimizados da pasta `ia4biz/prompts/`
3. Clique em "🚀 Gerar Interface"
4. Visualize o resultado no painel direito
5. Baixe o HTML completo se desejar

---

## 📝 Prompts Disponíveis

### Barbearia Seu Souza
Arquivo: `ia4biz/prompts/PROMPT-BARBEARIA-SEU-SOUZA.txt`
- Landing page premium para barbearia
- Modelo de assinatura/clube
- Design sofisticado preto/branco/dourado
- Seções completas: Hero, Planos, Serviços, Depoimentos

### Próximos Prompts
- Landing page e-commerce
- Dashboard administrativo
- Formulários multi-step
- Aplicativo SaaS

---

## 🔐 Configuração da API

O arquivo `.env.local` contém a chave da API OpenAI:

```
OPENAI_API_KEY=sk-proj-...
```

**Modelo usado:** GPT-4o (gpt-4o)
**Tokens máximos:** 4096
**Temperature:** 0.7

---

## 🎯 Diferenciais IA4BIZ

### Identidade Profissional
- Design moderno com cores corporativas
- Branding consistente em todos os elementos
- Logo e tagline sempre visíveis

### Prompts Otimizados
- Templates testados e validados
- Estrutura clara e reproduzível
- Resultados profissionais garantidos

### Organização
- Estrutura de pastas clara
- Documentação completa
- Fácil manutenção e escala

---

## 🔄 Próximos Passos

1. **Templates**
   - Criar templates prontos para clientes
   - Landing pages SaaS
   - Dashboards
   - E-commerce

2. **Integrações**
   - N8N para workflows automatizados
   - EasyPanel para deploy
   - GitHub para versionamento

3. **Melhorias**
   - Upload de arquivos (logos, imagens)
   - Editor de código inline
   - Histórico de gerações
   - Exportação em múltiplos formatos

---

## 📞 Suporte

Para dúvidas sobre o projeto IA4BIZ, consulte:
- `ia4biz/README.md` - Visão geral
- `ia4biz/brand/IA4BIZ-BRAND.md` - Manual da marca
- `ia4biz/prompts/README.md` - Guia de prompts

---

**IA4BIZ** © 2025 - IA for business
*Eficiência hoje. Escala amanhã.*

🧠 4 Pilares: Automação · Escala · Vendas · Segurança
