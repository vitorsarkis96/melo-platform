'use client'

import { useState } from 'react'
import Link from 'next/link'
import { STEPS } from '../../lib/steps'

function Field({ field, value, onChange }) {
  if (field.type === 'text') return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 5, color: 'var(--text)' }}>
        {field.label}{field.req && <span style={{ color: 'var(--amber)', marginLeft: 3 }}>*</span>}
      </label>
      {field.hint && <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 7, lineHeight: 1.4 }}>{field.hint}</p>}
      <input className="input" type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="Digite aqui..." />
    </div>
  )
  if (field.type === 'ta') return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 5, color: 'var(--text)' }}>
        {field.label}{field.req && <span style={{ color: 'var(--amber)', marginLeft: 3 }}>*</span>}
      </label>
      {field.hint && <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 7, lineHeight: 1.4 }}>{field.hint}</p>}
      <textarea className="input" rows={3} value={value || ''} onChange={e => onChange(e.target.value)} placeholder="Digite aqui..." />
    </div>
  )
  if (field.type === 'chips') {
    const vals = value || []
    return (
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 5 }}>{field.label}</label>
        {field.hint && <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 8, lineHeight: 1.4 }}>{field.hint}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '-3px' }}>
          {field.opts.map(opt => {
            const sel = vals.includes(opt)
            return (
              <button key={opt} className={`chip${sel ? ' selected' : ''}`}
                onClick={() => {
                  if (sel) onChange(vals.filter(v => v !== opt))
                  else if (vals.length < field.max) onChange([...vals, opt])
                }}>
                {opt}
              </button>
            )
          })}
        </div>
        <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6 }}>{vals.length}/{field.max} selecionados</p>
      </div>
    )
  }
  return null
}

export default function Questionario() {
  const [step, setStep] = useState(0)
  const [vals, setVals] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  const cur = STEPS[step]
  const set = (id, v) => setVals(p => ({ ...p, [id]: v }))

  const canNext = () =>
    cur.fields.filter(f => f.req).every(f => {
      const v = vals[f.id]
      return v && (Array.isArray(v) ? v.length > 0 : String(v).trim().length > 2)
    })

  const submit = async () => {
    setSubmitting(true)
    setErr('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vals),
      })
      if (!res.ok) throw new Error('Erro ao enviar.')
      setDone(true)
    } catch (e) {
      setErr(e.message)
    }
    setSubmitting(false)
  }

  if (done) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div className="fade" style={{ textAlign: 'center', maxWidth: 440 }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--green-bg)', border: '1px solid var(--green-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: 24, color: 'var(--green-text)' }}>✓</div>
        <h2 className="syne" style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Questionário enviado</h2>
        <p style={{ color: 'var(--text2)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          A equipe Melo recebeu suas respostas.<br />
          O diagnóstico estratégico será preparado em breve.
        </p>
        <div className="card-surface" style={{ textAlign: 'left' }}>
          <span className="label">Próximos passos</span>
          <ol style={{ paddingLeft: 18, marginTop: 10, lineHeight: 2.1, fontSize: 13, color: 'var(--text2)' }}>
            <li>A equipe Melo analisa suas respostas</li>
            <li>Diagnóstico e template estratégico são gerados</li>
            <li>Pesquisa e imersão de mercado</li>
            <li>Criação da identidade visual</li>
          </ol>
        </div>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', padding: '1.5rem 1rem' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="syne" style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Melo</span>
          </Link>
          <span className="badge badge-amber" style={{ fontSize: 11 }}>Questionário de Marca</span>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {STEPS.map((s, i) => (
              <div key={i} className={`progress-step${i < step ? ' done' : i === step ? ' current' : ''}`} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text3)' }}>
            <span>Etapa {step + 1} de {STEPS.length} — <span style={{ color: 'var(--text2)' }}>{cur.title}</span></span>
            <span>{cur.desc}</span>
          </div>
        </div>

        {/* Fields */}
        <div className="card fade" key={step}>
          {cur.fields.map(f => (
            <Field key={f.id} field={f} value={vals[f.id]} onChange={v => set(f.id, v)} />
          ))}
        </div>

        {err && <div className="alert alert-err" style={{ marginTop: '1rem' }}>{err}</div>}

        {/* Nav buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem', gap: 8 }}>
          {step > 0
            ? <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)}>← Anterior</button>
            : <div />
          }
          {step < STEPS.length - 1
            ? <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={!canNext()} style={{ opacity: canNext() ? 1 : 0.4 }}>Próxima etapa →</button>
            : <button className="btn btn-primary" onClick={submit} disabled={submitting || !canNext()}>
              {submitting ? <><span className="spin" />Enviando...</> : 'Enviar questionário'}
            </button>
          }
        </div>
      </div>
    </main>
  )
}
