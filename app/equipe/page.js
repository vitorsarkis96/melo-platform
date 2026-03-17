'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'

const LOGO = 'https://static.wixstatic.com/media/d5c391_d5af66b67cf546a59d5b1c348c99e261~mv2.png/v1/fill/w_268,h_82,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Asset%202_2x.png'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <img src={LOGO} alt="Melo" style={{ height: 36, width: 'auto', marginBottom: '1.5rem', display: 'block' }} />
          <h1 className="syne" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, marginBottom: '0.75rem' }}>
            Plataforma de<br />Identidade Visual
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.6 }}>
            Questionário estratégico integrado ao diagnóstico de marca.<br />
            Direção precede criação.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Link href="/questionario" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer', height: '100%', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--amber-border)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = ''}>
              <div style={{ fontSize: 22, marginBottom: '0.75rem' }}>✎</div>
              <h3 className="syne" style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Sou cliente</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Preencho o questionário de marca para que a equipe Melo inicie o diagnóstico estratégico.
              </p>
              <span style={{ fontSize: 13, color: 'var(--amber)', fontWeight: 500 }}>Iniciar questionário →</span>
            </div>
          </Link>

          <Link href="/equipe" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer', height: '100%', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = ''}>
              <div style={{ fontSize: 22, marginBottom: '0.75rem' }}>◈</div>
              <h3 className="syne" style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Equipe Melo</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Acesso os projetos recebidos, gero diagnósticos com IA e consulto os templates estratégicos.
              </p>
              <span style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 500 }}>Acesso restrito →</span>
            </div>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: '2rem', flexWrap: 'wrap' }}>
          {[
            { href: 'https://wa.me/5511954387151', label: 'WhatsApp', icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.121 1.533 5.847L.057 23.804a.75.75 0 0 0 .92.92l5.956-1.476A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.534-5.201-1.46l-.372-.22-3.862.957.974-3.753-.242-.386A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            )},
            { href: 'https://www.melocreative.com.br', label: 'Site', icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            )},
            { href: 'https://www.linkedin.com/company/amelocreative', label: 'LinkedIn', icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            )},
            { href: 'https://instagram.com/amelocreative', label: 'Instagram', icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            )},
          ].map(({ href, label, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 12, fontWeight: 500, textDecoration: 'none', transition: 'all 0.15s', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--amber-border)'; e.currentTarget.style.color = 'var(--amber)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}>
              {icon}{label}
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
