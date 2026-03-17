export const STEPS = [
  {
    title: 'Essência',
    desc: 'O que sua marca é e entrega',
    fields: [
      { id: 'nome', label: 'Nome da empresa', type: 'text', req: true },
      {
        id: 'core_delivery',
        label: 'O que sua empresa faz de mais importante?',
        hint: 'O que você realmente entrega ao cliente — não o serviço, mas o resultado.',
        type: 'ta', req: true,
      },
      {
        id: 'trabalho',
        label: 'Como descreve o trabalho principal da empresa?',
        hint: 'Use suas próprias palavras.',
        type: 'ta', req: true,
      },
    ],
  },
  {
    title: 'Posicionamento',
    desc: 'Onde você está e onde quer chegar',
    fields: [
      {
        id: 'empresa_hoje',
        label: 'Como você vê sua empresa hoje?',
        hint: 'Seja honesto: tamanho, maturidade, reconhecimento.',
        type: 'ta', req: true,
      },
      {
        id: 'empresa_futuro',
        label: 'Onde sua empresa estará em 3–5 anos?',
        hint: 'Específico: mercado, escala, posição competitiva.',
        type: 'ta', req: true,
      },
    ],
  },
  {
    title: 'Serviços',
    desc: 'O que você oferece e como resolve',
    fields: [
      {
        id: 'servicos',
        label: 'Quais serviços ou produtos você oferece?',
        hint: 'Liste todos e indique qual é o foco principal.',
        type: 'ta', req: true,
      },
      {
        id: 'proposito_servicos',
        label: 'Como os serviços cumprem o propósito da empresa?',
        hint: 'Qual transformação você gera no cliente?',
        type: 'ta', req: true,
      },
    ],
  },
  {
    title: 'Identidade',
    desc: 'Como sua marca deve ser percebida',
    fields: [
      {
        id: 'visual_msg',
        label: 'O que a identidade visual deve transmitir?',
        hint: 'Percepções que devem ser imediatas ao ver a marca.',
        type: 'ta', req: true,
      },
      {
        id: 'sentimentos',
        label: 'Sentimentos que a marca deve transmitir:',
        hint: 'Escolha até 3.',
        type: 'chips', max: 3,
        opts: ['Confiança','Inovação','Modernidade','Seriedade','Aconchego','Simplicidade','Sofisticação','Alegria','Sustentabilidade','Transparência','Credibilidade','Dinamismo','Empatia','Tradição','Exclusividade'],
      },
    ],
  },
  {
    title: 'Referências',
    desc: 'O que te inspira visualmente',
    fields: [
      {
        id: 'referencias',
        label: 'Quais empresas te inspiram?',
        hint: 'Dentro ou fora do seu setor. Cole links se quiser.',
        type: 'ta', req: true,
      },
      {
        id: 'refs_motivo',
        label: 'O que você admira nessas empresas?',
        hint: 'Visual, comunicação, posicionamento ou tudo?',
        type: 'ta', req: false,
      },
    ],
  },
  {
    title: 'Comunicação',
    desc: 'Como sua marca fala com o mundo',
    fields: [
      {
        id: 'comunicacao',
        label: 'Como sua empresa deve se comunicar?',
        hint: 'Ex: acessível e direta, sem perder credibilidade.',
        type: 'ta', req: true,
      },
      {
        id: 'tom',
        label: 'Tom de comunicação da marca:',
        hint: 'Marque os que se aplicam.',
        type: 'chips', max: 5,
        opts: ['Informal','Séria','Amigável','Profissional','Inspiradora','Divertida','Autoritária','Casual','Empática','Elegante'],
      },
    ],
  },
  {
    title: 'Legado',
    desc: 'O impacto que você quer deixar',
    fields: [
      {
        id: 'experiencia',
        label: 'Como deve ser a experiência de quem entra em contato?',
        hint: 'Site, redes sociais, primeiro atendimento.',
        type: 'ta', req: true,
      },
      {
        id: 'impacto',
        label: 'Qual impacto você quer ter no mercado?',
        hint: 'O que quer ser reconhecido por fazer diferente?',
        type: 'ta', req: true,
      },
      {
        id: 'legado',
        label: 'Como quer que sua empresa seja lembrada?',
        hint: 'Em uma frase — qual é o seu legado?',
        type: 'ta', req: true,
      },
    ],
  },
]

export const QLABELS = {
  nome: 'Empresa',
  core_delivery: 'Entrega principal',
  trabalho: 'Trabalho principal',
  empresa_hoje: 'Empresa hoje',
  empresa_futuro: 'Empresa em 3–5 anos',
  servicos: 'Serviços/produtos',
  proposito_servicos: 'Propósito dos serviços',
  visual_msg: 'Mensagem visual',
  sentimentos: 'Sentimentos',
  referencias: 'Referências',
  refs_motivo: 'Por que inspiram',
  comunicacao: 'Como se comunicar',
  tom: 'Tom',
  experiencia: 'Experiência do cliente',
  impacto: 'Impacto',
  legado: 'Legado',
}

export const AI_SYSTEM = `Você é o analista estratégico da Melo Creative, agência de branding em São Paulo. Método Melo: direção precede criação.

Analise as respostas em 5 camadas:
1. ESPECIFICIDADE vs GENERICIDADE — "qualidade e bom atendimento" não sustenta posicionamento.
2. COERÊNCIA — percepção atual alinhada com ambição declarada?
3. CLAREZA DE SERVIÇOS — serviços mal definidos geram ruído visual.
4. TENSÕES ESTRATÉGICAS — quer premium mas usa linguagem popular; quer disruptivo mas cita referências conservadoras.
5. MATURIDADE — diferencial definido? Público claro? Proposta de valor objetiva?

Arquétipos disponíveis: Herói, Prestativo, Mago, Inocente, Explorador, Amante, Bobo da Corte, Fora da Lei, Governante, Criador, Cuidador, Cara Comum.

Retorne APENAS JSON válido sem markdown ou texto adicional:
{
  "quem_somos": "",
  "missao": "",
  "visao": "",
  "valores": [],
  "entregas_racionais": [],
  "entregas_emocionais": [],
  "diferenciacao": "",
  "arquetipos": { "dominante": "", "secundario": "", "justificativa": "" },
  "pilares": [
    { "palavra": "", "conceito": "" },
    { "palavra": "", "conceito": "" },
    { "palavra": "", "conceito": "" }
  ],
  "contradicoes": [],
  "posicionamento": "",
  "proposito_verbo": "",
  "notas_estrategicas": "",
  "personalidade": {
    "feminino_masculino": 5,
    "conservador_ousado": 5,
    "formal_informal": 5,
    "tecnologico_artesanal": 5,
    "emocional_racional": 5
  }
}`
