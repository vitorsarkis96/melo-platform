import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { password } = await req.json()
    const correct = process.env.TEAM_PASSWORD || 'melo2026'
    return NextResponse.json({ ok: password === correct })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
