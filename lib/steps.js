// Método Melo — Guia de Desenvolvimento de Identidade Visual 2026
// Atualizado com base no guia completo de 31 slides (Etapas 01–05)

export const STEPS = [
  {
    title: 'Essência da marca',
    desc: 'O que sua empresa é e entrega de verdade',
    fields: [
      {
        id: 'nome',
        label: 'Nome da empresa',
        type: 'text',
        req: true,
      },
      {
        id: 'core_delivery',
        label: 'O que sua empresa faz de mais importante?',
        hint: 'Não o serviço — o resultado real que você entrega ao cliente. O que muda na vida ou no negócio de quem te contrata?',
        type: 'ta',
        req: true,
      },
      {
        id: 'trabalho',
        label: 'Como você descreve o trabalho principal da empresa?',
        hint: 'Use suas próprias palavras. Evite termos genéricos como "soluções completas" — seja específico.',
        type: 'ta',
        req: true,
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
        hint: 'Seja honesto: tamanho, maturidade, reconhecimento no mercado, momento atual.',
        type: 'ta',
        req: true,
      },
      {
        id: 'empresa_futuro',
        label: 'Onde sua empresa estará em 3 a 5 anos?',
        hint: 'Seja específico. Mercado, escala, posição competitiva, reconhecimento desejado.',
        type: 'ta',
        req: true,
      },
      {
        id: 'diferencial',
        label: 'O que diferencia sua empresa dos concorrentes?',
        hint: 'Por que um cliente escolhe você e não outra empresa? O que só você faz ou faz de forma diferente?',
        type: 'ta',
        req: true,
      },
    ],
  },
  {
    title: 'Serviços e propósito',
    desc: 'O que você oferece e como isso se conecta',
    fields: [
      {
        id: 'servicos',
        label: 'Quais serviços ou produtos você oferece?',
        hint: 'Liste todos. Indique qual é o foco principal e se algum é secundário ou complementar.',
        type: 'ta',
        req: true,
      },
      {
        id: 'publico',
        label: 'Quem normalmente contrata sua empresa?',
        hint: 'Descreva o perfil: tipo de empresa, porte, momento em que procura você, nível de maturidade sobre o serviço.',
        type: 'ta',
        req: true,
      },
      {
        id: 'proposito_servicos',
        label: 'Como os serviços cumprem o propósito da empresa?',
        hint: 'Qual transformação você gera no cliente? O que muda depois de trabalhar com você?',
        type: 'ta',
        req: true,
      },
    ],
  },
  {
    title: 'Identidade desejada',
    desc: 'Como sua marca deve ser percebida',
    fields: [
      {
        id: 'visual_msg',
        label: 'O que a identidade visual deve transmitir imediatamente?',
        hint: 'Percepções que devem ser instantâneas ao ver a marca — antes mesmo de ler qualquer texto.',
        type: 'ta',
        req: true,
      },
      {
        id: 'sentimentos',
        label: 'Sentimentos que a marca deve transmitir:',
        hint: 'Escolha até 3. Só marque o que realmente define sua marca — não o que soa bem.',
        type: 'chips',
        max: 3,
        opts: [
          'Confiança', 'Inovação', 'Modernidade', 'Seriedade', 'Aconchego',
          'Simplicidade', 'Sofisticação', 'Alegria', 'Sustentabilidade',
          'Transparência', 'Credibilidade', 'Dinamismo', 'Empatia',
          'Tradição', 'Exclusividade', 'Ousadia', 'Precisão', 'Autoridade',
        ],
      },
      {
        id: 'nao_transmitir',
        label: 'O que a identidade visual NÃO deve transmitir?',
        hint: 'Às vezes é mais fácil definir pelo oposto. O que você quer evitar que as pessoas pensem sobre sua marca?',
        type: 'ta',
        req: false,
      },
    ],
  },
  {
    title: 'Referências visuais',
    desc: 'O que te inspira e por quê',
    fields: [
      {
        id: 'referencias',
        label: 'Quais empresas te inspiram visualmente?',
        hint: 'Dentro ou fora do seu setor. Cole links se quiser. Não precisa ser do mesmo mercado.',
        type: 'ta',
        req: true,
      },
      {
        id: 'refs_motivo',
        label: 'O que você admira nessas empresas?',
        hint: 'Visual, tom de comunicação, posicionamento ou tudo? Seja específico — isso orienta o designer.',
        type: 'ta',
        req: false,
      },
      {
        id: 'refs_evitar',
        label: 'Tem alguma empresa ou estilo visual que você NÃO quer que sua marca se pareça?',
        hint: 'Opcional, mas muito útil. Pode ser um concorrente direto ou um estilo que não representa você.',
        type: 'ta',
        req: false,
      },
    ],
  },
  {
    title: 'Tom e comunicação',
    desc: 'Como sua marca fala com o mundo',
    fields: [
      {
        id: 'comunicacao',
        label: 'Como sua empresa deve se comunicar com o público?',
        hint: 'Descreva o tom ideal: linguagem, nível de formalidade, postura. Ex: técnica e direta, sem perder proximidade.',
        type: 'ta',
        req: true,
      },
      {
        id: 'tom',
        label: 'Tom de comunicação da marca:',
        hint: 'Marque os que realmente se aplicam ao perfil da sua empresa.',
        type: 'chips',
        max: 5,
        opts: [
          'Informal', 'Séria', 'Amigável', 'Profissional', 'Inspiradora',
          'Divertida', 'Autoritária', 'Casual', 'Empática', 'Elegante',
          'Direta', 'Técnica', 'Acessível', 'Premium',
        ],
      },
    ],
  },
  {
    title: 'Legado e impacto',
    desc: 'O que você quer construir a longo prazo',
    fields: [
      {
        id: 'experiencia',
        label: 'Como deve ser a experiência de quem entra em contato com sua empresa?',
        hint: 'Site, redes sociais, primeiro atendimento, pós-venda. Qual sensação deve ficar?',
        type: 'ta',
        req: true,
      },
      {
        id: 'impacto',
        label: 'Qual impacto você quer ter no mercado?',
        hint: 'O que quer ser reconhecido por fazer diferente? Qual problema do mercado você resolve melhor do que qualquer outro?',
        type: 'ta',
        req: true,
      },
      {
        id: 'legado',
        label: 'Como quer que sua empresa seja lembrada?',
        hint: 'Em uma frase. Não o que você faz — o que você representa.',
        type: 'ta',
        req: true,
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
  diferencial: 'Diferencial competitivo',
  servicos: 'Serviços/produtos',
  publico: 'Público-alvo',
  proposito_servicos: 'Propósito dos serviços',
  visual_msg: 'Mensagem visual imediata',
  sentimentos: 'Sentimentos da marca',
  nao_transmitir: 'O que não transmitir',
  referencias: 'Referências visuais',
  refs_motivo: 'Por que inspiram',
  refs_evitar: 'Estilos a evitar',
  comunicacao: 'Tom de comunicação',
  tom: 'Atributos do tom',
  experiencia: 'Experiência do cliente',
  impacto: 'Impacto no mercado',
  legado: 'Legado da marca',
}

export const AI_SYSTEM = `Você é o analista estratégico da Melo Creative, agência de branding B2B em São Paulo. Você aplica o Método Melo de desenvolvimento de identidade visual — um processo estruturado que parte do diagnóstico estratégico antes de qualquer decisão visual.

PRINCÍPIO CENTRAL: Direção precede criação. Identidade visual não é estética — é tradução visual de posicionamento.

=== MÉTODO MELO — CAMADAS DE ANÁLISE ===

Analise as respostas em 5 camadas obrigatórias:

1. ESPECIFICIDADE vs GENERICIDADE
"Qualidade e bom atendimento" não sustenta posicionamento — qualquer empresa diz isso.
Respostas estratégicas definem: território específico, diferencial concreto, público claro.
Sinal de alerta: adjetivos vagos sem contexto (inovação, excelência, comprometimento).
Sinal positivo: afirmações falsificáveis ("somos a única empresa X que faz Y para Z").

2. COERÊNCIA INTERNA
A percepção atual está alinhada com a ambição declarada?
O tom das respostas bate com o tom que a marca quer transmitir?
Ex: empresa que quer parecer premium mas responde de forma muito informal → tensão real.
Ex: empresa que quer parecer inovadora mas cita referências conservadoras → incoerência.

3. CLAREZA DE SERVIÇOS E PROPOSTA DE VALOR
Serviços mal definidos geram ruído visual — a identidade não consegue organizar o que o negócio não organizou.
Separe: entrega racional (o que faz objetivamente) vs entrega emocional (como quer ser percebida).
Ex racional: "Estruturar o financeiro de pequenas empresas."
Ex emocional: "Ser vista como parceira estratégica confiável."
A identidade visual precisa sustentar os dois níveis.

4. TENSÕES ESTRATÉGICAS
Contradições entre o que o cliente declara e o que a realidade do negócio sustenta:
- Quer parecer premium mas comunica acessibilidade extrema
- Fala em inovação mas tem discurso e processos tradicionais
- Deseja crescimento nacional mas atua localmente sem estrutura
- Quer sofisticação mas o público ainda não está pronto para isso
- Cita referências de grandes marcas mas é empresa pequena em início

5. MATURIDADE DE POSICIONAMENTO
Diferencial definido + público claro + proposta de valor objetiva = projeto de refinamento visual.
Termos amplos + falta de clareza + dificuldade de explicar serviços = necessidade de organização estratégica antes da estética.

=== ARQUÉTIPOS DISPONÍVEIS ===
Herói, Prestativo, Mago, Inocente, Explorador, Amante, Bobo da Corte, Fora da Lei, Governante, Criador, Cuidador, Cara Comum.

Para cada arquétipo: identifique se é dominante (define a personalidade central) ou secundário (nuance complementar). A justificativa deve conectar o arquétipo ao posicionamento real, não apenas à percepção desejada.

=== PILARES DE MARCA ===
3 pilares que estruturam a identidade. Cada pilar tem:
- Uma palavra-chave (substantivo ou verbo, não adjetivo)
- Um conceito que explica como esse pilar se manifesta na marca

=== ALINHAMENTO DE PERSONALIDADE (escala 1–9) ===
Posicione a marca nos eixos com base nas respostas, não no que o cliente quer parecer:
- 1 = Feminino ←→ 9 = Masculino
- 1 = Conservador ←→ 9 = Ousado
- 1 = Formal ←→ 9 = Informal
- 1 = Tecnológico ←→ 9 = Artesanal
- 1 = Emocional ←→ 9 = Racional

=== OUTPUT OBRIGATÓRIO ===
Retorne APENAS JSON válido, sem markdown, sem texto adicional, sem explicações fora do JSON:

{
  "quem_somos": "Uma frase que define a empresa com clareza e sem lugar-comum",
  "missao": "O porquê de existir — verbo de ação + transformação que gera",
  "visao": "Onde a marca quer chegar — ambição de posicionamento em 3–5 anos",
  "valores": ["máximo 4 valores concretos, não genéricos"],
  "entregas_racionais": ["o que entrega objetivamente — resultados mensuráveis"],
  "entregas_emocionais": ["como quer ser percebida — sensações e percepções"],
  "diferenciacao": "O que só essa marca faz ou faz de forma diferente — falsificável",
  "arquetipos": {
    "dominante": "Nome do arquétipo",
    "secundario": "Nome do arquétipo",
    "justificativa": "Por que esses arquétipos sustentam o posicionamento real da marca"
  },
  "pilares": [
    { "palavra": "palavra-chave 1", "conceito": "como esse pilar se manifesta na marca" },
    { "palavra": "palavra-chave 2", "conceito": "como esse pilar se manifesta na marca" },
    { "palavra": "palavra-chave 3", "conceito": "como esse pilar se manifesta na marca" }
  ],
  "contradicoes": ["tensões estratégicas identificadas — seja direto, não suavize"],
  "posicionamento": "Síntese do território estratégico em uma frase — para quem, o quê, por quê diferente",
  "proposito_verbo": "Um verbo que define o propósito central (ex: estruturar, revelar, proteger, conectar)",
  "notas_estrategicas": "Observações diretas para o designer: o que a pesquisa de mercado deve investigar, quais territórios visuais evitar, qual caminho de diferenciação explorar, alertas sobre o projeto",
  "personalidade": {
    "feminino_masculino": 5,
    "conservador_ousado": 5,
    "formal_informal": 5,
    "tecnologico_artesanal": 5,
    "emocional_racional": 5
  }
}`
