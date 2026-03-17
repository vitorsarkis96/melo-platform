import { NextResponse } from 'next/server'

const BASE = process.env.KV_REST_API_URL
const TOKEN = process.env.KV_REST_API_TOKEN

async function kvCmd(...args) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })
  const data = await res.json()
  return data.result ?? null
}

async function kvGet(key) {
  const r = await kvCmd('GET', key)
  if (!r) return null
  try { return JSON.parse(r) } catch { return r }
}

async function kvSet(key, value) {
  await kvCmd('SET', key, JSON.stringify(value))
}

// POST /api/token — cria um novo token de acesso para o cliente
export async function POST(req) {
  try {
    const { company } = await req.json()
    if (!company?.trim()) return NextResponse.json({ ok: false, error: 'Nome da empresa obrigatório' }, { status: 400 })

    const token = Math.random().toString(36).slice(2, 8).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase()
    const id = 'proj_' + Date.now()
    const payload = { id, company: company.trim(), token, ts: Date.now(), status: 'aguardando', submissionId: null }

    await kvSet(`melo:token:${token}`, payload)

    const index = (await kvGet('melo:index')) || []
    await kvSet('melo:index', [...index, { id, company: company.trim(), ts: Date.now(), status: 'aguardando', token }])

    return NextResponse.json({ ok: true, token, id })
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}

// GET /api/token?t=TOKEN — valida o token antes de mostrar o questionário
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const t = searchParams.get('t')
    if (!t) return NextResponse.json({ valid: false, error: 'Token ausente' })

    const data = await kvGet(`melo:token:${t}`)
    if (!data) return NextResponse.json({ valid: false, error: 'Token inválido' })
    if (data.status === 'respondido') return NextResponse.json({ valid: false, used: true, company: data.company })

    return NextResponse.json({ valid: true, company: data.company, id: data.id })
  } catch (e) {
    return NextResponse.json({ valid: false, error: e.message })
  }
}
