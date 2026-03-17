const BASE = process.env.KV_REST_API_URL
const TOKEN = process.env.KV_REST_API_TOKEN

async function cmd(...args) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
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

export async function getSubmissions() {
  return (await get('melo:index')) || []
}

export async function getSubmission(id) {
  return get(`melo:sub:${id}`)
}

export async function saveSubmission(id, data) {
  await set(`melo:sub:${id}`, data)
  const index = (await get('melo:index')) || []
  const entry = { id, company: data.nome || 'Sem nome', ts: data._ts, status: 'pending' }
  await set('melo:index', [...index, entry])
  return entry
}

export async function getAnalysis(id) {
  return get(`melo:analysis:${id}`)
}

export async function saveAnalysis(id, analysis) {
  await set(`melo:analysis:${id}`, analysis)
  const index = (await get('melo:index')) || []
  const updated = index.map(i => i.id === id ? { ...i, status: 'analyzed' } : i)
  await set('melo:index', updated)
}
