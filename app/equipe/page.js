'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import TeamPanel from '../../components/TeamPanel'

export default function EquipePage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [checking, setChecking] = useState(false)

  const login = async () => {
    setChecking(true)
    setErr('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      const data = await res.json()
      if (data.ok) setAuthed(true)
      else setErr('Senha incorreta.')
    } catch {
      setErr('Erro ao verificar.')
    }
    setChecking(false)
  }

  if (!authed) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 360, width: '100%' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div className="badge badge-gray" style={{ marginBottom: '1rem', fontSize: 11 }}>Acesso restrito</div>
          <img src="https://static.wixstatic.com/media/d5c391_d5af66b67cf546a59d5b1c348c99e261~mv2.png/v1/fill/w_268,h_82,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Asset%202_2x.png" alt="Melo" style={{ height: 32, width: 'auto', margin: '0 auto 1rem', display: 'block' }} />
          <h2 className="syne" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Painel da equipe</h2>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>Melo Creative · Área interna</p>
        </div>
        <div className="card">
          <label className="label" style={{ marginBottom: 6 }}>Senha</label>
          <input className="input" type="password" value={pw} onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()} placeholder="••••••••" style={{ marginBottom: '1rem' }} />
          {err && <div className="alert alert-err" style={{ marginBottom: '1rem' }}>{err}</div>}
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
            onClick={login} disabled={checking || !pw}>
            {checking ? <><span className="spin" />Verificando...</> : 'Entrar'}
          </button>
        </div>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: 12 }}>
          <a href="/" style={{ color: 'var(--text3)', textDecoration: 'none' }}>← Voltar</a>
        </p>
      </div>
    </main>
  )

  return <TeamPanel />
}
