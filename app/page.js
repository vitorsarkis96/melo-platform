import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="badge badge-amber" style={{ marginBottom: '1.5rem', fontSize: 12 }}>Método Melo · 2026</div>
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

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: 12, color: 'var(--text3)' }}>
          melocreative.com.br
        </p>
      </div>
    </main>
  )
}
