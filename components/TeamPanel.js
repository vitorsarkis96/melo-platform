'use client'

import { useState, useEffect, useRef } from 'react'
import { QLABELS } from '../lib/steps'

const LOGO = 'https://static.wixstatic.com/media/d5c391_d5af66b67cf546a59d5b1c348c99e261~mv2.png/v1/fill/w_268,h_82,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Asset%202_2x.png'
const POLL_INTERVAL = 15000 // 15 segundos

function downloadPDF(a, company) {
  const p = a.personalidade || {}
  const axisBar = (value) => {
    const pct = Math.round(((value - 1) / 9) * 100)
    return `<div style="height:4px;background:#eee;border-radius:2px;margin-top:4px"><div style="height:100%;width:${pct}%;background:#B07820;border-radius:2px"></div></div>`
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
    .pilar-word{font-weight:600;color:#B07820;font-size:13px}
    .tension{font-size:12px;color:#666;line-height:1.7;margin-bottom:4px;padding-left:12px;border-left:2px solid #e07070}
    .axis-row{margin-bottom:10px}
    .axis-labels{display:flex;justify-content:space-between;font-size:10px;color:#888;margin-bottom:3px}
    .notes{font-size:13px;line-height:1.7;color:#333;background:#f8f7f4;border-radius:8px;padding:14px}
    .divider{border:none;border-top:1px solid #eee;margin:20px 0}
    ul{padding-left:16px;line-height:1.9;font-size:12px;color:#333}
    .header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
    .header img{height:28px;width:auto}
    @media print{body{padding:24px}@page{margin:16mm}}
  </style></head><body>
  <div class="header">
    <img src="${LOGO}" alt="Melo" />
    <span style="font-size:11px;color:#aaa">Diagnóstico estratégico · Método Melo</span>
  </div>
  <h1>${company}</h1>
  <p class="meta">${new Date().toLocaleDateString('pt-BR')}</p>
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
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--amber)' }}>{p.palavra}</span>
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
        <p style={{ fontSize: 13, lineHeight: 1.7 }}>{a.notas_estrategicas}</p>
      </div>
    </div>
  )
}

function NewProjectModal({ onClose, onRefresh }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)
  const [err, setErr] = useState('')

  const create = async () => {
    if (!name.trim()) return
    setLoading(true); setErr('')
    try {
      const res = await fetch('/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: name.trim() }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Erro ao gerar token')
      const link = `${window.location.origin}/questionario?t=${data.token}`
      setResult({ token: data.token, link, company: name.trim() })
      onRefresh()
    } catch (e) {
      setErr(e.message)
    }
    setLoading(false)
  }

  const copy = () => {
    navigator.clipboard.writeText(result.link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
      <div className="card fade" style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 className="syne" style={{ fontSize: 16, fontWeight: 700 }}>Novo projeto</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ fontSize: 16 }}>✕</button>
        </div>
        {!result ? (
          <>
            <label className="label" style={{ marginBottom: 6, display: 'block' }}>Nome da empresa cliente</label>
            <input className="input" type="text" value={name} onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && create()}
              placeholder="Ex: Ethiquê Perícias" style={{ marginBottom: '1rem' }} autoFocus />
            {err && <div className="alert alert-err" style={{ marginBottom: '1rem' }}>{err}</div>}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
              <button className="btn btn-primary" onClick={create} disabled={loading || !name.trim()}>
                {loading ? <><span className="spin" /> Gerando...</> : 'Gerar link de acesso'}
              </button>
            </div>
          </>
        ) : (
          <div className="fade">
            <div className="card-surface" style={{ marginBottom: '1rem' }}>
              <span className="label" style={{ display: 'block', marginBottom: 6 }}>Projeto criado</span>
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{result.company}</p>
              <p style={{ fontSize: 12, color: 'var(--text3)' }}>
                Código: <span style={{ fontFamily: 'monospace', color: 'var(--amber)', letterSpacing: 2 }}>{result.token}</span>
              </p>
            </div>
            <label className="label" style={{ display: 'block', marginBottom: 6 }}>Link para enviar ao cliente</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
              <input className="input" readOnly value={result.link}
                style={{ flex: 1, fontSize: 11, color: 'var(--text2)' }}
                onClick={e => e.target.select()} />
              <button className="btn btn-primary" onClick={copy} style={{ flexShrink: 0, minWidth: 90 }}>
                {copied ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href={`https://wa.me/?text=${encodeURIComponent(`Olá! Segue o link para preencher o questionário de marca da Melo Creative:\n\n${result.link}`)}`}
                target="_blank" rel="noopener noreferrer" className="btn"
                style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}>
                Enviar via WhatsApp
              </a>
              <button className="btn btn-ghost" onClick={onClose}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function DeleteConfirmModal({ item, onCancel, onConfirm, deleting }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
      <div className="card fade" style={{ width: '100%', maxWidth: 400 }}>
        <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Excluir projeto</h3>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Tem certeza que quer excluir <strong style={{ color: 'var(--text)' }}>{item.company}</strong>?<br />
          Respostas e diagnóstico serão apagados permanentemente.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onCancel} disabled={deleting}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? <><span className="spin" /> Excluindo...</> : 'Excluir permanentemente'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TeamPanel() {
  const [index, setIndex] = useState([])
  const [sel, setSel] = useState(null)
  const [responses, setResponses] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [tab, setTab] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const pollRef = useRef(null)
  const selRef = useRef(sel)
  selRef.current = sel

  const fetchIndex = async (silent = false) => {
    if (!silent) setRefreshing(true)
    try {
      const res = await fetch('/api/submissions')
      const data = await res.json()
      const newIndex = data.submissions || []
      setIndex(newIndex)
      setLastUpdate(new Date())

      // Se tem projeto selecionado e ele mudou de status, recarrega
      const currentSel = selRef.current
      if (currentSel) {
        const updated = newIndex.find(i => i.id === currentSel.id)
        if (updated && updated.status !== currentSel.status) {
          setSel(updated)
          // Se passou para respondido, carrega as respostas automaticamente
          if (updated.status === 'pending' && currentSel.status === 'aguardando') {
            const subId = updated.submissionId || updated.id
            const r = await fetch(`/api/submission/${subId}`)
            const rd = await r.json()
            setResponses(rd.submission)
          }
        }
      }
    } catch (e) {
      console.error('Erro ao buscar projetos:', e)
    }
    if (!silent) setRefreshing(false)
    setLoading(false)
  }

  useEffect(() => {
    fetchIndex()
    // Auto-refresh a cada 15 segundos
    pollRef.current = setInterval(() => fetchIndex(true), POLL_INTERVAL)
    return () => clearInterval(pollRef.current)
  }, [])

  const manualRefresh = () => fetchIndex(false)

  const select = async item => {
    const subId = item.submissionId || item.id
    setSel(item); setResponses(null); setAnalysis(null); setErr(''); setTab(0)
    const res = await fetch(`/api/submission/${subId}`)
    const data = await res.json()
    setResponses(data.submission)
    const aRes = await fetch(`/api/submission/${subId}/analysis`)
    const aData = await aRes.json()
    if (aData.analysis) setAnalysis(aData.analysis)
  }

  const analyze = async () => {
    if (!responses) return
    const subId = sel.submissionId || sel.id
    setAnalyzing(true); setErr('')
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: subId, responses }),
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

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/submission/${deleteTarget.id}/delete`, { method: 'DELETE' })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Erro ao excluir')
      setIndex(prev => prev.filter(i => i.id !== deleteTarget.id))
      if (sel?.id === deleteTarget.id) { setSel(null); setResponses(null); setAnalysis(null) }
      setDeleteTarget(null)
    } catch (e) {
      setErr('Erro ao excluir: ' + e.message)
      setDeleteTarget(null)
    }
    setDeleting(false)
  }

  const statusLabel = (s) => {
    if (s === 'analyzed') return { label: 'analisado', cls: 'badge-green' }
    if (s === 'pending') return { label: 'respondido', cls: 'badge-amber' }
    return { label: 'aguardando', cls: 'badge-gray' }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {showModal && <NewProjectModal onClose={() => setShowModal(false)} onRefresh={manualRefresh} />}
      {deleteTarget && (
        <DeleteConfirmModal item={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} deleting={deleting} />
      )}

      <nav className="nav">
        <a href="/"><img src={LOGO} alt="Melo" style={{ height: 28, width: 'auto' }} /></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {lastUpdate && (
            <span style={{ fontSize: 11, color: 'var(--text3)' }}>
              Atualizado {lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button className="btn btn-sm btn-ghost" onClick={manualRefresh} disabled={refreshing} title="Atualizar agora">
            {refreshing ? <span className="spin" /> : '↻'} Atualizar
          </button>
          <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>+ Novo projeto</button>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <div style={{ width: 240, borderRight: '1px solid var(--border)', padding: '1rem', flexShrink: 0, overflowY: 'auto', background: 'var(--bg2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="label" style={{ margin: 0 }}>Projetos</span>
            <span style={{ fontSize: 11, color: 'var(--text3)' }}>
              {index.length > 0 ? `${index.length} total` : ''}
            </span>
          </div>

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text2)', fontSize: 12, padding: '4px 0' }}>
              <span className="spin" /> carregando...
            </div>
          )}

          {!loading && index.length === 0 && (
            <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
              Nenhum projeto ainda.<br />Crie um com "+ Novo projeto".
            </p>
          )}

          {index.slice().reverse().map(item => {
            const st = statusLabel(item.status)
            const clickable = item.status === 'pending' || item.status === 'analyzed'
            return (
              <div key={item.id} className={`sidebar-item${sel?.id === item.id ? ' active' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <p
                    onClick={() => clickable ? select(item) : null}
                    style={{
                      fontSize: 13,
                      fontWeight: sel?.id === item.id ? 600 : 400,
                      flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      cursor: clickable ? 'pointer' : 'default',
                      marginBottom: 3,
                      opacity: clickable ? 1 : 0.5,
                    }}
                  >
                    {item.company}
                  </p>
                  <button
                    onClick={e => { e.stopPropagation(); setDeleteTarget(item) }}
                    title="Excluir"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 16, padding: '0 2px', lineHeight: 1, flexShrink: 0 }}
                  >×</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>{new Date(item.ts).toLocaleDateString('pt-BR')}</span>
                  <span className={`badge ${st.cls}`} style={{ fontSize: 10 }}>{st.label}</span>
                </div>
              </div>
            )
          })}

          {/* Auto-refresh indicator */}
          <div style={{ marginTop: '1.5rem', padding: '8px 10px', borderRadius: 6, background: 'var(--bg3)', fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>
            ↻ Atualiza automaticamente a cada 15s
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', background: 'var(--bg)' }}>
          {!sel && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text2)' }}>
              <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: 'var(--text)' }}>Selecione um projeto</p>
              <p style={{ fontSize: 13, marginBottom: '1.5rem' }}>
                Projetos "aguardando" ainda não foram respondidos pelo cliente.
              </p>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Criar novo projeto</button>
            </div>
          )}

          {sel && (
            <div className="fade">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <h2 className="syne" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{responses?.nome || sel.company}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: 'var(--text2)' }}>Criado em {new Date(sel.ts).toLocaleDateString('pt-BR')}</span>
                    <span className={`badge ${statusLabel(sel.status).cls}`}>{statusLabel(sel.status).label}</span>
                    {sel.token && <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace' }}>#{sel.token}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget(sel)}>Excluir</button>
                  {analysis && (
                    <button className="btn btn-sm" onClick={() => downloadPDF(analysis, responses?.nome || sel.company)}>↓ PDF</button>
                  )}
                  {(sel.status === 'pending' || sel.status === 'analyzed') && (
                    <button className="btn btn-primary" onClick={analyze} disabled={analyzing || !responses}>
                      {analyzing ? <><span className="spin" /> Analisando...</> : (analysis ? 'Reanalisar' : 'Gerar diagnóstico')}
                    </button>
                  )}
                </div>
              </div>

              {sel.status === 'aguardando' && (
                <div className="alert alert-warn" style={{ marginBottom: '1rem' }}>
                  O cliente ainda não respondeu. O painel atualiza automaticamente quando ele enviar.
                </div>
              )}

              {err && <div className="alert alert-err" style={{ marginBottom: '1rem' }}>{err}</div>}

              {(sel.status === 'pending' || sel.status === 'analyzed') && (
                <>
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
                      <p style={{ marginBottom: 8, fontSize: 14 }}>Diagnóstico não gerado ainda.</p>
                      <p style={{ fontSize: 12 }}>Clique em "Gerar diagnóstico" acima.</p>
                    </div>
                  )}
                  {tab === 1 && analysis && <Diagnosis a={analysis} />}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
