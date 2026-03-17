import { deleteProject } from '../../../../../lib/kv'
import { NextResponse } from 'next/server'

export async function DELETE(req, { params }) {
  try {
    await deleteProject(params.id)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
