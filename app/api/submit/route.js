import { saveSubmission } from '../../../lib/kv'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json()
    const { _token, ...fields } = body
    const id = 'sub_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)
    const payload = { ...fields, _id: id, _ts: Date.now() }
    await saveSubmission(id, payload, _token || null)
    return NextResponse.json({ ok: true, id })
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
