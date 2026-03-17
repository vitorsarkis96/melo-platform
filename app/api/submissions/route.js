import { getSubmissions } from '../../../lib/kv'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const submissions = await getSubmissions()
    return NextResponse.json(
      { submissions },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    )
  } catch (e) {
    return NextResponse.json({ submissions: [], error: e.message })
  }
}
