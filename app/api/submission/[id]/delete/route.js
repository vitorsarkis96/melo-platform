import { NextResponse } from 'next/server'

const BASE = process.env.KV_REST_API_URL
const TOKEN_ENV = process.env.KV_REST_API_TOKEN

async function cmd(...args) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN_ENV}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })
  const data = await res.json()
  return data.result ?? null
}

async function get(key) {
  const r = await cmd('GET', key)
  if (!r) return null
  try { return JSON.parse(r) } catch { return r }
}

async function set(key, value) {
  await cmd('SET', key, JSON.stringify(value))
}

async function del(key) {
  await cmd('DEL', key)
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params

    // Busca entry no índice para pegar submissionId e token
    const index = (await get('melo:index')) || []
    const entry = index.find(i => i.id === id)

    if (!entry) return NextResponse.json({ ok: false, error: 'Projeto não encontrado' }, { status: 404 })

    const subId = entry.submissionId || entry.id

    // Remove submissão e análise do KV
    await del(`melo:sub:${subId}`)
    await del(`melo:analysis:${subId}`)

    // Remove token se existir
    if (entry.token) {
      await del(`melo:token:${entry.token}`)
    }

    // Remove do índice
    const updated = index.filter(i => i.id !== id)
    await set('melo:index', updated)

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
