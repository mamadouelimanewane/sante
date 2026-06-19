"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

const APPS = [
  { id: "dmp", name: "DMP-Sénégal", href: "/dmp", icon: "🗂️", desc: "Dossier Médical Partagé National", hexColor: "#0284c7" },
  { id: "maternite", name: "Sama-Maternité", href: "/maternite", icon: "🤰", desc: "Suivi Périnatal Connecté", hexColor: "#f472b6" },
  { id: "epidemio", name: "Sen-Epidemio", href: "/epidemio", icon: "🚨", desc: "Radar Épidémiologique (IA)", hexColor: "#dc2626" },
  { id: "samu", name: "SAMU-Connect", href: "/samu", icon: "🚑", desc: "Dispatching du 1515", hexColor: "#06b6d4" },
  { id: "ecmu", name: "e-CMU", href: "/ecmu", icon: "💳", desc: "Couverture Maladie Universelle", hexColor: "#16a34a" },
  { id: "vaccin", name: "Sen-Vaccin", href: "/vaccin", icon: "💉", desc: "Carnet Vaccination Biométrique", hexColor: "#059669" },
  { id: "forma", name: "Forma-Santé", href: "/forma", icon: "🎓", desc: "Formation Continue en Langues Locales", hexColor: "#7c3aed" },
  { id: "pharma", name: "Sen-PharmaNat", href: "/pharma", icon: "📦", desc: "Prédiction Ruptures Médicaments (IA)", hexColor: "#ea580c" },
  { id: "stats", name: "Sen-SantéStats", href: "/stats", icon: "📊", desc: "Observatoire Épidémiologique National", hexColor: "#0369a1" },
  { id: "tele", name: "Télé-Expertise", href: "/tele", icon: "🌐", desc: "Réseau Sécurisé des Spécialistes", hexColor: "#0f766e" },
]

const BG = "#030f1a"
const ACCENT2 = "#10b981"

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", width: Math.random() > 0.8 ? "2px" : "1px",
          height: Math.random() > 0.8 ? "2px" : "1px", borderRadius: "50%",
          background: Math.random() > 0.5 ? "#10b981" : Math.random() > 0.5 ? "#fbbf24" : "rgba(255,255,255,0.4)",
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animation: `twinkle ${2 + Math.random() * 4}s ${Math.random() * 3}s infinite`,
          opacity: Math.random() * 0.7 + 0.2,
        }} />
      ))}
    </div>
  )
}

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; }
        @keyframes twinkle { 0%,100%{opacity:.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-dot { 0%,100%{opacity:.6} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes scan-line { 0%{top:0} 100%{top:100%} }
        @keyframes flag-glow { 0%,100%{box-shadow:0 0 0 transparent} 50%{box-shadow:0 0 20px rgba(5,150,105,.4)} }
        .au1{animation:fadeUp .7s .1s both} .au2{animation:fadeUp .7s .25s both}
        .au3{animation:fadeUp .7s .4s both} .au4{animation:fadeUp .7s .55s both}
        .au5{animation:fadeUp .7s .7s both}
        .card-hover{transition:all .3s cubic-bezier(.4,0,.2,1)}
        .card-hover:hover{transform:translateY(-5px)}
        .scan-fx{animation:scan-line 3s linear infinite}
        .flag-glow{animation:flag-glow 3s ease-in-out infinite}
      `}</style>
      <div style={{ minHeight: "100vh", background: BG, color: "#fff", position: "relative" }}>
        {mounted && <Particles />}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(5,150,105,0.12), transparent)" }} />

        {/* HEADER */}
        <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(3,15,26,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(5,150,105,0.2)" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div className="flag-glow" style={{ width: 44, height: 28, borderRadius: 6, overflow: "hidden", display: "flex", flexShrink: 0, border: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ flex: 1, background: "#00853f" }} />
                <div style={{ flex: 1, background: "#fdef42", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 10, color: "#00853f" }}>★</span></div>
                <div style={{ flex: 1, background: "#e31b23" }} />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>MSAS <span style={{ color: ACCENT2 }}>Suite</span></p>
                <p style={{ fontSize: 9, color: "rgba(16,185,129,0.6)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Ministère de la Santé · République du Sénégal</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT2, display: "inline-block", animation: "pulse-dot 2s infinite" }} />
              <span style={{ fontSize: 11, color: ACCENT2, fontWeight: 700, letterSpacing: "0.1em" }}>SYSTÈME NATIONAL EN LIGNE</span>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section style={{ maxWidth: 1300, margin: "0 auto", padding: "5rem 1.5rem 4rem", textAlign: "center", position: "relative" }}>
          <div className="au1" style={{ display: "inline-flex", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.3)", borderRadius: 100, padding: "6px 18px" }}>
              <span>🇸🇳</span>
              <span style={{ fontSize: 11, color: ACCENT2, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>République du Sénégal · MSAS · Dakar</span>
            </div>
          </div>
          <div className="au2" style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              <span style={{ display: "block", fontSize: "0.4em", fontWeight: 500, color: "rgba(255,255,255,0.45)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.7rem" }}>Le Système Souverain</span>
              <span style={{ background: "linear-gradient(135deg, #fff 0%, #d1fae5 40%, #10b981 80%, #fbbf24 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Santé Numérique</span>
              <span style={{ display: "block", fontSize: "0.65em", fontWeight: 700, color: ACCENT2, marginTop: "0.4rem" }}>du MSAS · Sénégal</span>
            </h1>
          </div>
          <p className="au3" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: 600, color: "rgba(255,255,255,0.7)", maxWidth: 700, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Prévenir. <span style={{ color: ACCENT2 }}>Guérir.</span> Protéger 18 millions de Sénégalais.
          </p>
          <div className="au4">
            <a href="#applications" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #059669, #10b981)", color: "#fff", padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 0 30px rgba(5,150,105,0.3)" }}>
              Voir les 10 applications nationales ↓
            </a>
          </div>
        </section>

        {/* DIVIDER */}
        <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(5,150,105,0.4), rgba(251,191,36,0.3), transparent)" }} />
        </div>

        {/* APPS GRID */}
        <section id="applications" style={{ maxWidth: 1300, margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ fontSize: 12, color: ACCENT2, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>— Portail d'accès national —</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff" }}>10 Applications Nationales de Santé</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 14 }}>
            {APPS.map((app) => (
              <Link key={app.id} href={app.href}
                className="card-hover"
                onMouseEnter={() => setHovered(app.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  textDecoration: "none", display: "block",
                  background: hovered === app.id ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${hovered === app.id ? app.hexColor + "66" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 16, padding: "1.5rem", position: "relative", overflow: "hidden",
                  boxShadow: hovered === app.id ? `0 12px 40px ${app.hexColor}25` : "none",
                }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${app.hexColor}, transparent)`, opacity: hovered === app.id ? 1 : 0.25, transition: "opacity 0.3s" }} />
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0, fontSize: 22, background: `${app.hexColor}18`, border: `1px solid ${app.hexColor}30`, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s", transform: hovered === app.id ? "scale(1.1) rotate(-5deg)" : "scale(1)" }}>{app.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{app.name}</h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{app.desc}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: app.hexColor }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>msas/{app.id}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: hovered === app.id ? app.hexColor : "rgba(255,255,255,0.2)", transition: "color 0.3s" }}>Ouvrir →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "2rem 1.5rem", marginTop: "3rem" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>🇸🇳</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#ddeaf7" }}>MSAS · Dakar, Sénégal</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Ministère de la Santé et de l'Action Sociale</p>
              </div>
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Développé par <span style={{ color: ACCENT2, fontWeight: 700 }}>Processingenierie</span></p>
          </div>
        </footer>
      </div>
    </>
  )
}
