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

export async function GET() {
  try {
    // 1. Lê o índice atual
    const index = await get('melo:index')

    // 2. Tenta ler cada submissão do índice
    const details = []
    if (Array.isArray(index)) {
      for (const entry of index) {
        const subId = entry.submissionId || entry.id
        const sub = await get(`melo:sub:${subId}`)
        const analysis = await get(`melo:analysis:${subId}`)
        const token = entry.token ? await get(`melo:token:${entry.token}`) : null
        details.push({
          indexEntry: entry,
          hasSubmission: !!sub,
          submissionKeys: sub ? Object.keys(sub) : [],
          hasAnalysis: !!analysis,
          tokenStatus: token?.status || null,
        })
      }
    }

    return NextResponse.json({
      ok: true,
      indexCount: Array.isArray(index) ? index.length : 0,
      rawIndex: index,
      details,
      env: {
        hasKvUrl: !!process.env.KV_REST_API_URL,
        hasKvToken: !!process.env.KV_REST_API_TOKEN,
      }
    })
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
