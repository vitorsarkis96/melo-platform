'use client'

import { useState, useEffect } from 'react'
import { QLABELS } from '../lib/steps'

function downloadPDF(a, company) {
  const p = a.personalidade || {}
  const axisBar = (value) => {
    const pct = Math.round(((value - 1) / 9) * 100)
    return `<div style="height:4px;background:#eee;border-radius:2px;margin-top:4px"><div style="height:100%;width:${pct}%;background:#C8974A;border-radius:2px"></div></div>`
  }
  const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
  <title>Diagnóstico — ${company}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#1a1a1a;padding:32px;background:#fff}
    h1{font-size:22px;font-weight:700;margin-bottom:4px}
    .meta{font-size:12px;color:#888;margin-bottom:24px}
    .label{font-size:10px;font-weight:600;color:#888;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px}
    .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
    .grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px}
    .box{background:#f8f7f4;border-radius:8px;padding:12px}
    .value{font-size:13px;line-height:1.6;color:#1a1a1a}
    .badge{display:inline-block;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:500;background:#faeeda;color:#633806;margin:2px}
    .badge-gray{background:#f0ede8;color:#555}
    .pilar{margin-bottom:8px}
    .pilar-word{font-weight:600;color:#C8974A;font-size:13px}
    .tension{font-size:12px;color:#666;line-height:1.7;margin-bottom:4px;padding-left:12px;border-left:2px solid #e07070}
    .axis-row{margin-bottom:10px}
    .axis-labels{display:flex;justify-content:space-between;font-size:10px;color:#888;margin-bottom:3px}
    .notes{font-size:13px;line-height:1.7;color:#333;background:#f8f7f4;border-radius:8px;padding:14px}
    .divider{border:none;border-top:1px solid #eee;margin:20px 0}
    ul{padding-left:16px;line-height:1.9;font-size:12px;color:#333}
    @media print{body{padding:24px}@page{margin:16mm}}
  </style></head><body>
  <h1>${company}</h1>
  <p class="meta">Diagnóstico estratégico · Método Melo · ${new Date().toLocaleDateString('pt-BR')}</p>
  <hr class="divider">
  <div class="grid2">
    <div class="box"><div class="label">Missão</div><div class="value">${a.missao || '—'}</div></div>
    <div class="box"><div class="label">Visão</div><div class="value">${a.visao || '—'}</div></div>
    <div class="box"><div class="label">Propósito</div><div class="value">Verbo central: ${a.proposito_verbo || '—'}</div></div>
    <div class="box"><div class="label">Posicionamento</div><div class="value">${a.posicionamento || '—'}</div></div>
  </div>
  <div class="grid3">
    <div class="box">
      <div class="label">Valores</div>
      <div style="margin-top:6px">${(a.valores || []).map(v => `<span class="badge">${v}</span>`).join('')}</div>
    </div>
    <div class="box">
      <div class="label">Entregas racionais</div>
      <ul>${(a.entregas_racionais || []).map(e => `<li>${e}</li>`).join('')}</ul>
    </div>
    <div class="box">
      <div class="label">Entregas emocionais</div>
      <ul>${(a.entregas_emocionais || []).map(e => `<li>${e}</li>`).join('')}</ul>
    </div>
  </div>
  <div class="grid2">
    <div class="box">
      <div class="label">Arquétipos</div>
      <div style="margin:6px 0">
        <span class="badge">${a.arquetipos?.dominante || '—'} (dominante)</span>
        <span class="badge badge-gray">${a.arquetipos?.secundario || '—'} (secundário)</span>
      </div>
      <div class="value" style="font-size:12px;color:#555;margin-top:6px">${a.arquetipos?.justificativa || ''}</div>
    </div>
    <div class="box">
      <div class="label">Pilares de marca</div>
      <div style="margin-top:8px">
        ${(a.pilares || []).map(p => `<div class="pilar"><span class="pilar-word">${p.palavra}</span> <span style="color:#888;font-size:12px">— ${p.conceito}</span></div>`).join('')}
      </div>
    </div>
  </div>
  <div class="box" style="margin-bottom:12px">
    <div class="label" style="margin-bottom:12px">Alinhamento de personalidade</div>
    ${[
      ['Feminino', 'Masculino', p.feminino_masculino],
      ['Conservador', 'Ousado', p.conservador_ousado],
      ['Formal', 'Informal', p.formal_informal],
      ['Tecnológico', 'Artesanal', p.tecnologico_artesanal],
      ['Emocional', 'Racional', p.emocional_racional],
    ].map(([l, r, v]) => `
    <div class="axis-row">
      <div class="axis-labels"><span>${l}</span><span>${r}</span></div>
      ${axisBar(v || 5)}
    </div>`).join('')}
  </div>
  ${a.contradicoes?.length > 0 ? `
  <div class="box" style="margin-bottom:12px;border-left:3px solid #e07070">
    <div class="label" style="color:#a32d2d;margin-bottom:8px">Tensões estratégicas</div>
    ${(a.contradicoes || []).map(c => `<div class="tension">${c}</div>`).join('')}
  </div>` : ''}
  <div class="label" style="margin-bottom:6px">Notas para o designer</div>
  <div class="notes">${a.notas_estrategicas || '—'}</div>
  </body></html>`

  const win = window.open('', '_blank')
  win.document.write(html)
  win.document.close()
  win.onload = () => win.print()
}

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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {[['Missão', a.missao], ['Visão', a.visao], ['Propósito', 'Verbo central: ' + a.proposito_verbo], ['Posicionamento', a.posicionamento]].map(([t, v]) => (
          <div key={t} className="card-surface">
            <span className="label">{t}</span>
            <p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 4 }}>{v || '—'}</p>
          </div>
        ))}
      </div>

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

      <div className="card-surface">
        <span className="label" style={{ marginBottom: 12, display: 'block' }}>Alinhamento de personalidade</span>
        <AxisRow left="Feminino" right="Masculino" value={p.feminino_masculino || 5} />
        <AxisRow left="Conservador" right="Ousado" value={p.conservador_ousado || 5} />
        <AxisRow left="Formal" right="Informal" value={p.formal_informal || 5} />
        <AxisRow left="Tecnológico" right="Artesanal" value={p.tecnologico_artesanal || 5} />
        <AxisRow left="Emocional" right="Racional" value={p.emocional_racional || 5} />
      </div>

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
      <nav className="nav">
        <a href="/" className="nav-logo">Melo</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--text2)' }}>Painel da equipe</span>
          <button className="btn btn-sm btn-ghost" onClick={refresh}>↻ Atualizar</button>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
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

        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          {!sel && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text2)' }}>
              <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 6, color: 'var(--text)' }}>Selecione um projeto</p>
              <p style={{ fontSize: 13 }}>Escolha um questionário para visualizar as respostas e gerar o diagnóstico.</p>
            </div>
          )}

          {sel && (
            <div className="fade">
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
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {analysis && (
                    <button className="btn" onClick={() => downloadPDF(analysis, responses?.nome || sel.company)}>
                      ↓ Baixar PDF
                    </button>
                  )}
                  <button className="btn btn-primary" onClick={analyze} disabled={analyzing || !responses}>
                    {analyzing ? <><span className="spin" /> Analisando...</> : (analysis ? 'Reanalisar' : 'Gerar diagnóstico')}
                  </button>
                </div>
              </div>

              {err && <div className="alert alert-err" style={{ marginBottom: '1rem' }}>{err}</div>}

              <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '1.25rem' }}>
                {['Respostas brutas', 'Template estratégico'].map((t, i) => (
                  <button key={i} className={`tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>{t}</button>
                ))}
              </div>

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
