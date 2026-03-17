import { saveAnalysis } from '../../../lib/kv'
import { AI_SYSTEM, QLABELS } from '../../../lib/steps'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { id, responses } = await req.json()

    const body = Object.entries(responses)
      .filter(([k]) => !k.startsWith('_'))
      .map(([k, v]) => `${QLABELS[k] || k}: ${Array.isArray(v) ? v.join(', ') : v}`)
      .join('\n')

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: AI_SYSTEM,
        messages: [{ role: 'user', content: 'RESPOSTAS DO CLIENTE:\n' + body }],
      }),
    })

    const data = await res.json()
    const txt = data.content?.find(b => b.type === 'text')?.text || ''
    const clean = txt.replace(/```json|```/g, '').trim()
    const analysis = JSON.parse(clean)

    await saveAnalysis(id, analysis)

    return NextResponse.json({ ok: true, analysis })
  } catch (e) {
    console.error('analyze error', e)
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
