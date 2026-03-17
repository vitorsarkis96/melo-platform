import { kv } from '@vercel/kv'

export async function getSubmissions() {
  const index = await kv.get('melo:index')
  return index || []
}

export async function getSubmission(id) {
  return kv.get(`melo:sub:${id}`)
}

export async function saveSubmission(id, data) {
  await kv.set(`melo:sub:${id}`, data)
  const index = (await kv.get('melo:index')) || []
  const entry = { id, company: data.nome || 'Sem nome', ts: data._ts, status: 'pending' }
  await kv.set('melo:index', [...index, entry])
  return entry
}

export async function getAnalysis(id) {
  return kv.get(`melo:analysis:${id}`)
}

export async function saveAnalysis(id, analysis) {
  await kv.set(`melo:analysis:${id}`, analysis)
  const index = (await kv.get('melo:index')) || []
  const updated = index.map(i => i.id === id ? { ...i, status: 'analyzed' } : i)
  await kv.set('melo:index', updated)
}
