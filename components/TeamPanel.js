'use client'

import { useState, useEffect } from 'react'
import { QLABELS } from '../lib/steps'

function AxisRow({ left, right, value }) {
  const pct = Math.round(((value - 1) / 9) * 100)
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>
        <span>{left}</span><span>{right}</span>
      </div>
      <div className="axis-track">
        <div className="axis-fill" style={{ width: pct + '%' }} />
      </div>
    </div>
  )
}

function Diagnosis({ a }) {
  const p = a.personalidade || {}
  return (
    <div className="fade" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Missão / Visão / Propósito / Posicionamento */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {[['Missão', a.missao], ['Visão', a.visao], ['Propósito', 'Verbo central: ' + a.proposito_verbo], ['Posicionamento', a.posicionamento]].map(([t, v]) => (
          <div key={t} className="card-surface">
            <span className="label">{t}</span>
            <p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 4 }}>{v || '—'}</p>
          </div>
        ))}
      </div>

      {/* Valores / Entregas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
        <div className="card-surface">
          <span className="label">Valores</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
            {(a.valores || []).map(v => <span key={v} className="badge badge-amber">{v}</span>)}
          </div>
        </div>
        <div className="card-surface">
          <span className="label">Entregas racionais</span>
          <ul style={{ paddingLeft: 16, marginTop: 8, fontSize: 12, lineHeight: 1.8 }}>
            {(a.entregas_racionais || []).map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
        <div className="card-surface">
          <span className="label">Entregas emocionais</span>
          <ul style={{ paddingLeft: 16, marginTop: 8, fontSize: 12, lineHeight: 1.8 }}>
            {(a.entregas_emocionais || []).map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      </div>

      {/* Arquétipos / Pilares */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div className="card-surface">
          <span className="label">Arquétipos</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '8px 0' }}>
            <span className="badge badge-amber">{a.arquetipos?.dominante} (dominante)</span>
            <span className="badge badge-gray">{a.arquetipos?.secundario} (secundário)</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{a.arquetipos?.justificativa}</p>
        </div>
        <div className="card-surface">
          <span className="label">Pilares de marca</span>
          <div style={{ marginTop: 8 }}>
            {(a.pilares || []).map((p, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <span style={{ fontWeight: 500, fontSize: 13, color: 'var(--amber)' }}>{p.palavra}</span>
                <span style={{ fontSize: 12, color: 'var(--text2)' }}> — {p.conceito}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalidade */}
      <div className="card-surface">
        <span className="label" style={{ marginBottom: 12, display: 'block' }}>Alinhamento de personalidade</span>
        <AxisRow left="Feminino" right="Masculino" value={p.feminino_masculino || 5} />
        <AxisRow left="Conservador" right="Ousado" value={p.conservador_ousado || 5} />
        <AxisRow left="Formal" right="Informal" value={p.formal_informal || 5} />
        <AxisRow left="Tecnológico" right="Artesanal" value={p.tecnologico_artesanal || 5} />
        <AxisRow left="Emocional" right="Racional" value={p.emocional_racional || 5} />
      </div>

      {/* Tensões */}
      {a.contradicoes?.length > 0 && (
        <div className="card" style={{ borderColor: 'var(--red-border)' }}>
          <span className="label" style={{ color: 'var(--red-text)', marginBottom: 8, display: 'block' }}>Tensões estratégicas identificadas</span>
          <ul style={{ paddingLeft: 16 }}>
            {a.contradicoes.map((c, i) => (
              <li key={i} style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 4 }}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Notas */}
      <div className="card-surface">
        <span className="label" style={{ marginBottom: 8, display: 'block' }}>Notas para o designer</span>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text)' }}>{a.notas_estrategicas}</p>
      </div>
    </div>
  )
}

export default function TeamPanel() {
  const [index, setIndex] = useState(null)
  const [sel, setSel] = useState(null)
  const [responses, setResponses] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [tab, setTab] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setLoading(true)
    const res = await fetch('/api/submissions')
    const data = await res.json()
    setIndex(data.submissions || [])
    setLoading(false)
  }

  useEffect(() => { refresh() }, [])

  const select = async item => {
    setSel(item); setResponses(null); setAnalysis(null); setErr(''); setTab(0)
    const res = await fetch(`/api/submission/${item.id}`)
    const data = await res.json()
    setResponses(data.submission)
    const aRes = await fetch(`/api/submission/${item.id}/analysis`)
    const aData = await aRes.json()
    if (aData.analysis) setAnalysis(aData.analysis)
  }

  const analyze = async () => {
    if (!responses) return
    setAnalyzing(true); setErr('')
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sel.id, responses }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Erro na análise')
      setAnalysis(data.analysis)
      setIndex(prev => prev.map(i => i.id === sel.id ? { ...i, status: 'analyzed' } : i))
      setSel(s => ({ ...s, status: 'analyzed' }))
      setTab(1)
    } catch (e) {
      setErr('Erro: ' + e.message)
    }
    setAnalyzing(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <nav className="nav">
        <a href="/" className="nav-logo">Melo</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--text2)' }}>Painel da equipe</span>
          <button className="btn btn-sm btn-ghost" onClick={refresh}>↻ Atualizar</button>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 220, borderRight: '1px solid var(--border)', padding: '1rem', flexShrink: 0, overflowY: 'auto' }}>
          <span className="label" style={{ marginBottom: '0.75rem', display: 'block' }}>Projetos recebidos</span>

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text2)', fontSize: 12 }}>
              <span className="spin" /> carregando...
            </div>
          )}

          {!loading && (!index || index.length === 0) && (
            <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
              Nenhum questionário recebido ainda.
            </p>
          )}

          {!loading && (index || []).slice().reverse().map(item => (
            <div key={item.id} className={`sidebar-item${sel?.id === item.id ? ' active' : ''}`} onClick={() => select(item)}>
              <p style={{ fontSize: 13, fontWeight: sel?.id === item.id ? 500 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 }}>
                {item.company}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>{new Date(item.ts).toLocaleDateString('pt-BR')}</span>
                <span className={`badge ${item.status === 'analyzed' ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: 10 }}>
                  {item.status === 'analyzed' ? 'analisado' : 'pendente'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          {!sel && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text2)' }}>
              <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 6, color: 'var(--text)' }}>Selecione um projeto</p>
              <p style={{ fontSize: 13 }}>Escolha um questionário para visualizar as respostas e gerar o diagnóstico.</p>
            </div>
          )}

          {sel && (
            <div className="fade">
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <h2 className="syne" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{responses?.nome || sel.company}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'var(--text2)' }}>Recebido em {new Date(sel.ts).toLocaleDateString('pt-BR')}</span>
                    <span className={`badge ${sel.status === 'analyzed' ? 'badge-green' : 'badge-amber'}`}>
                      {sel.status === 'analyzed' ? 'diagnóstico gerado' : 'aguardando análise'}
                    </span>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={analyze} disabled={analyzing || !responses}>
                  {analyzing ? <><span className="spin" /> Analisando...</> : (analysis ? 'Reanalisar' : 'Gerar diagnóstico')}
                </button>
              </div>

              {err && <div className="alert alert-err" style={{ marginBottom: '1rem' }}>{err}</div>}

              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '1.25rem' }}>
                {['Respostas brutas', 'Template estratégico'].map((t, i) => (
                  <button key={i} className={`tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>{t}</button>
                ))}
              </div>

              {/* Respostas */}
              {tab === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {responses
                    ? Object.entries(responses).filter(([k]) => !k.startsWith('_')).map(([k, v]) => (
                      <div key={k} className="card-surface" style={{ padding: '0.75rem 1rem' }}>
                        <span className="label" style={{ marginBottom: 3, display: 'block' }}>{QLABELS[k] || k}</span>
                        <p style={{ fontSize: 13, lineHeight: 1.6 }}>{Array.isArray(v) ? v.join(' · ') : v || '—'}</p>
                      </div>
                    ))
                    : <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text2)', fontSize: 12 }}><span className="spin" /> carregando...</div>
                  }
                </div>
              )}

              {/* Diagnóstico */}
              {tab === 1 && !analysis && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text2)' }}>
                  <p style={{ marginBottom: 8, fontSize: 14 }}>Diagnóstico ainda não gerado.</p>
                  <p style={{ fontSize: 12 }}>Clique em "Gerar diagnóstico" para analisar com IA.</p>
                </div>
              )}
              {tab === 1 && analysis && <Diagnosis a={analysis} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
