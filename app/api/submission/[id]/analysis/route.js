import { getAnalysis } from '../../../../../lib/kv'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const analysis = await getAnalysis(params.id)
    return NextResponse.json({ analysis })
  } catch (e) {
    return NextResponse.json({ analysis: null, error: e.message })
  }
}
