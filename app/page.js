'use client'

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
