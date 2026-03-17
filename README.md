# Melo Platform — Plataforma de Identidade Visual

Sistema de questionário de marca + diagnóstico estratégico com IA.  
Stack: Next.js 14 · Vercel KV · Anthropic API

---

## Estrutura

```
/questionario   → cliente preenche (sem volta após envio)
/equipe         → painel interno com senha
/api/submit     → salva respostas no KV
/api/submissions → lista todos os projetos
/api/submission/[id] → respostas de um projeto
/api/analyze    → gera diagnóstico via Claude
/api/auth       → verifica senha da equipe
```

---

## Deploy passo a passo

### 1. Fork ou push para o GitHub

```bash
# Na sua máquina, crie a pasta e copie os arquivos
# Depois:
git init
git add .
git commit -m "feat: melo platform inicial"
git branch -M main

# Crie um repo no GitHub (ex: melo-platform) e:
git remote add origin https://github.com/SEU_USUARIO/melo-platform.git
git push -u origin main
```

### 2. Criar projeto na Vercel

1. Acesse [vercel.com](https://vercel.com) → **Add New Project**
2. Importe o repo `melo-platform` do GitHub
3. Framework: **Next.js** (detectado automaticamente)
4. Clique em **Deploy** (vai falhar por falta de env vars — normal)

### 3. Criar o banco Vercel KV

1. No dashboard da Vercel → seu projeto → aba **Storage**
2. Clique em **Create Database** → escolha **KV**
3. Nomeie como `melo-kv` → Create
4. Na tela seguinte, clique em **Connect to Project**
5. As variáveis `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` e `KV_REST_API_READ_ONLY_TOKEN` são adicionadas automaticamente

### 4. Adicionar variáveis de ambiente

Na Vercel → seu projeto → **Settings → Environment Variables**, adicione:

| Nome | Valor |
|------|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` (sua chave da Anthropic) |
| `TEAM_PASSWORD` | senha de acesso ao painel da equipe (ex: `melo2026`) |

> As variáveis do KV já foram adicionadas automaticamente no passo 3.

### 5. Redeploy

Vá em **Deployments** → clique nos 3 pontos do último deploy → **Redeploy**.  
Agora tudo funcionará.

---

## Uso

### Cliente
Acesse `/questionario` — preenche 7 etapas, envia.  
Após envio, **não consegue voltar** nem ver o que respondeu.

### Equipe
Acesse `/equipe` — insere a senha definida em `TEAM_PASSWORD`.  
- Lista de todos os projetos com status (pendente / analisado)
- Clica no projeto → vê respostas brutas
- Clica em **Gerar diagnóstico** → IA preenche o template estratégico completo:
  - Missão, Visão, Propósito (verbo)
  - Posicionamento
  - Valores, Entregas racionais e emocionais
  - Arquétipos (dominante + secundário + justificativa)
  - Pilares de marca
  - Alinhamento de personalidade nos 5 eixos
  - Tensões estratégicas identificadas
  - Notas para o designer
- Diagnóstico fica salvo — reabrir o projeto não cobra nova análise

---

## Desenvolvimento local

```bash
cp .env.local.example .env.local
# preencha ANTHROPIC_API_KEY e TEAM_PASSWORD
# para KV local, use Vercel CLI:

npm i -g vercel
vercel link   # conecta ao projeto da Vercel
vercel env pull .env.local   # puxa as variáveis do KV

npm install
npm run dev
# acesse http://localhost:3000
```

---

## Variáveis de ambiente resumidas

```env
ANTHROPIC_API_KEY=sk-ant-...
TEAM_PASSWORD=melo2026
KV_URL=                      # preenchido automaticamente pela Vercel
KV_REST_API_URL=             # preenchido automaticamente
KV_REST_API_TOKEN=           # preenchido automaticamente
KV_REST_API_READ_ONLY_TOKEN= # preenchido automaticamente
```
