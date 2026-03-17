import { getSubmissions } from '../../../lib/kv'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const submissions = await getSubmissions()
    return NextResponse.json({ submissions })
  } catch (e) {
    return NextResponse.json({ submissions: [], error: e.message })
  }
}
