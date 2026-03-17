'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { STEPS } from '../../lib/steps'

const LOGO = 'https://static.wixstatic.com/media/d5c391_d5af66b67cf546a59d5b1c348c99e261~mv2.png/v1/fill/w_268,h_82,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Asset%202_2x.png'

const SOCIALS = [
  { href: 'https://wa.me/5511954387151', label: 'WhatsApp' },
  { href: 'https://www.melocreative.com.br', label: 'Site' },
  { href: 'https://www.linkedin.com/company/amelocreative', label: 'LinkedIn' },
  { href: 'https://instagram.com/amelocreative', label: 'Instagram' },
]

function Field({ field, value, onChange }) {
  if (field.type === 'text') return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 5 }}>
        {field.label}{field.req && <span style={{ color: 'var(--amber)', marginLeft: 3 }}>*</span>}
      </label>
      {field.hint && <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 7, lineHeight: 1.4 }}>{field.hint}</p>}
      <input className="input" type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="Digite aqui..." />
    </div>
  )
  if (field.type === 'ta') return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 5 }}>
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

function QuestionarioInner() {
  const searchParams = useSearchParams()
  const tokenParam = searchParams.get('t')

  const [tokenStatus, setTokenStatus] = useState('checking')
  const [company, setCompany] = useState('')
  const [step, setStep] = useState(0)
  const [vals, setVals] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    // Sem token = acesso negado sempre
    if (!tokenParam) {
      setTokenStatus('invalid')
      return
    }
    fetch(`/api/token?t=${tokenParam}`)
      .then(r => r.json())
      .then(data => {
        if (data.valid) {
          setTokenStatus('valid')
          setCompany(data.company)
          setVals(v => ({ ...v, nome: data.company }))
        } else if (data.used) {
          setTokenStatus('used')
          setCompany(data.company)
        } else {
          setTokenStatus('invalid')
        }
      })
      .catch(() => setTokenStatus('invalid'))
  }, [tokenParam])

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
        body: JSON.stringify({ ...vals, _token: tokenParam }),
      })
      if (!res.ok) throw new Error('Erro ao enviar.')
      setDone(true)
    } catch (e) {
      setErr(e.message)
    }
    setSubmitting(false)
  }

  // Verificando
  if (tokenStatus === 'checking') return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)' }}>
        <span className="spin" /> Verificando acesso...
      </div>
    </main>
  )

  // Token inválido ou sem token
  if (tokenStatus === 'invalid') return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <img src={LOGO} alt="Melo" style={{ height: 32, margin: '0 auto 1.5rem', display: 'block' }} />
        <div className="card">
          <p style={{ fontSize: 28, marginBottom: 12 }}>🔒</p>
          <h2 className="syne" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Acesso restrito</h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
            Este questionário só pode ser acessado com um link exclusivo.<br />
            Solicite o link à equipe Melo.
          </p>
          <a href="https://wa.me/5511954387151" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: '1.25rem', fontSize: 13, color: 'var(--amber)', fontWeight: 500, textDecoration: 'none' }}>
            Falar com a Melo →
          </a>
        </div>
      </div>
    </main>
  )

  // Token já usado
  if (tokenStatus === 'used') return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <img src={LOGO} alt="Melo" style={{ height: 32, margin: '0 auto 1.5rem', display: 'block' }} />
        <div className="card">
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--green-bg)', border: '1px solid var(--green-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: 20, color: 'var(--green-text)' }}>✓</div>
          <h2 className="syne" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Questionário já enviado</h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text)' }}>{company}</strong> já respondeu o questionário.<br />
            A equipe Melo está preparando o diagnóstico.
          </p>
        </div>
      </div>
    </main>
  )

  // Enviado com sucesso
  if (done) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div className="fade" style={{ textAlign: 'center', maxWidth: 440 }}>
        <img src={LOGO} alt="Melo" style={{ height: 32, margin: '0 auto 1.5rem', display: 'block' }} />
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--green-bg)', border: '1px solid var(--green-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: 22, color: 'var(--green-text)' }}>✓</div>
        <h2 className="syne" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Questionário enviado</h2>
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

  // Questionário ativo
  return (
    <main style={{ minHeight: '100vh', padding: '1.5rem 1rem' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <img src={LOGO} alt="Melo" style={{ height: 28, width: 'auto' }} />
          {company && <span className="badge badge-amber" style={{ fontSize: 11 }}>{company}</span>}
        </div>

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

        <div className="card fade" key={step}>
          {cur.fields.map(f => (
            <Field key={f.id} field={f} value={vals[f.id]} onChange={v => set(f.id, v)} />
          ))}
        </div>

        {err && <div className="alert alert-err" style={{ marginTop: '1rem' }}>{err}</div>}

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

        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: '2.5rem' }}>
          {SOCIALS.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: 'var(--text3)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--amber)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}

export default function Questionario() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="spin" />
      </main>
    }>
      <QuestionarioInner />
    </Suspense>
  )
}
