import { getSubmission } from '../../../../lib/kv'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const submission = await getSubmission(params.id)
    return NextResponse.json({ submission })
  } catch (e) {
    return NextResponse.json({ submission: null, error: e.message })
  }
}
