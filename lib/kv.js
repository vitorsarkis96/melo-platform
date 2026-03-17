const URL = process.env.KV_REST_API_URL
const TOKEN = process.env.KV_REST_API_TOKEN

async function kvFetch(command, args) {
  const res = await fetch(`${URL}/${command}/${args.map(a => encodeURIComponent(JSON.stringify(a))).join('/')}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  const data = await res.json()
  return data.result
}

async function get(key) {
  const result = await kvFetch('get', [key])
  return result ? JSON.parse(result) : null
}

async function set(key, value) {
  await kvFetch('set', [key, JSON.stringify(value)])
}

export async function getSubmissions() {
  const index = await get('melo:index')
  return index || []
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
