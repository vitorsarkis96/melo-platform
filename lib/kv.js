const BASE = process.env.KV_REST_API_URL
const TOKEN_ENV = process.env.KV_REST_API_TOKEN

async function cmd(...args) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN_ENV}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
  const data = await res.json()
  return data.result ?? null
}

async function get(key) {
  const result = await cmd('GET', key)
  if (!result) return null
  try { return JSON.parse(result) } catch { return result }
}

async function set(key, value) {
  await cmd('SET', key, JSON.stringify(value))
}

async function del(key) {
  await cmd('DEL', key)
}

export async function getSubmissions() {
  return (await get('melo:index')) || []
}

export async function getSubmission(id) {
  return get(`melo:sub:${id}`)
}

export async function saveSubmission(id, data, token) {
  // 1. Salva a submissão
  await set(`melo:sub:${id}`, data)

  // 2. Se veio com token, marca token como usado
  if (token) {
    const tokenData = await get(`melo:token:${token}`)
    if (tokenData) {
      await set(`melo:token:${token}`, {
        ...tokenData,
        status: 'respondido',
        submissionId: id,
      })
    }
  }

  // 3. Atualiza o índice — busca estado atual e aplica mudança
  const index = (await get('melo:index')) || []

  if (token) {
    // Projeto criado via token — atualiza entry existente
    const hasEntry = index.some(i => i.token === token)
    let newIndex
    if (hasEntry) {
      newIndex = index.map(i =>
        i.token === token
          ? { ...i, submissionId: id, status: 'pending', company: data.nome || i.company }
          : i
      )
    } else {
      // Token existe mas não está no índice ainda — adiciona
      newIndex = [...index, {
        id,
        company: data.nome || 'Sem nome',
        ts: data._ts,
        status: 'pending',
        token,
        submissionId: id,
      }]
    }
    await set('melo:index', newIndex)
  } else {
    // Submissão direta sem token
    const entry = {
      id,
      company: data.nome || 'Sem nome',
      ts: data._ts,
      status: 'pending',
    }
    await set('melo:index', [...index, entry])
  }
}

export async function getAnalysis(id) {
  return get(`melo:analysis:${id}`)
}

export async function saveAnalysis(id, analysis) {
  await set(`melo:analysis:${id}`, analysis)
  const index = (await get('melo:index')) || []
  const updated = index.map(i =>
    (i.id === id || i.submissionId === id)
      ? { ...i, status: 'analyzed' }
      : i
  )
  await set('melo:index', updated)
}

export async function deleteProject(projectId) {
  const index = (await get('melo:index')) || []
  const entry = index.find(i => i.id === projectId)
  if (!entry) throw new Error('Projeto não encontrado')

  const subId = entry.submissionId || entry.id

  // Remove dados
  await del(`melo:sub:${subId}`)
  await del(`melo:analysis:${subId}`)
  if (entry.token) await del(`melo:token:${entry.token}`)

  // Remove do índice
  const newIndex = index.filter(i => i.id !== projectId)
  await set('melo:index', newIndex)
}
