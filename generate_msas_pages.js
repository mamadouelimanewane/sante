const fs = require('fs');
const path = require('path');

const APPS = [
  { id: "dmp", name: "DMP-Sénégal", icon: "🗂️", color: "#0284c7", subtitle: "Dossier Médical Partagé National",
    desc: "Chaque citoyen dispose d'un dossier médical unique, sécurisé et accessible dans tout le Sénégal.",
    features: [
      { icon: "🔐", title: "Identité Biométrique", desc: "Lié à la carte d'identité CEDEAO" },
      { icon: "🏥", title: "Interopérabilité", desc: "Accessible dans tous les hôpitaux du Sénégal" },
      { icon: "☁️", title: "Cloud Souverain", desc: "Hébergé au Data Center de Diamniadio" },
      { icon: "📱", title: "Accès Mobile", desc: "Application disponible sur Android et iOS" },
    ],
    stats: [{ val: "18M", label: "Citoyens couverts" }, { val: "14", label: "Régions connectées" }, { val: "2 300+", label: "Établissements" }]
  },
  { id: "maternite", name: "Sama-Maternité", icon: "🤰", color: "#f472b6", subtitle: "Suivi Périnatal Connecté",
    desc: "Prévenir la mortalité maternelle et infantile grâce au numérique et aux langues locales.",
    features: [
      { icon: "📱", title: "SMS / Appel Vocal", desc: "Rappels en Wolof, Pulaar, Sérère" },
      { icon: "👶", title: "Suivi Grossesse", desc: "Agenda prénatal personnalisé" },
      { icon: "📍", title: "Géolocalisation", desc: "Trouver la maternité la plus proche" },
      { icon: "🏥", title: "Réseau CHU", desc: "Connexion directe aux spécialistes" },
    ],
    stats: [{ val: "85%", label: "Réduction mortalité cible" }, { val: "3", label: "Langues locales" }, { val: "1 200", label: "Postes connectés" }]
  },
  { id: "epidemio", name: "Sen-Epidemio", icon: "🚨", color: "#dc2626", subtitle: "Radar Épidémiologique National",
    desc: "Détecter les foyers infectieux avant qu'ils ne deviennent des épidémies grâce à l'IA.",
    features: [
      { icon: "🧠", title: "IA Prédictive", desc: "Détection précoce des clusters" },
      { icon: "🗺️", title: "Cartographie Temps Réel", desc: "Heatmap nationale par maladie" },
      { icon: "🔔", title: "Alerte Automatique", desc: "Notification MSAS/OMS instantanée" },
      { icon: "📊", title: "Tableaux de Bord", desc: "Indicateurs par région et saison" },
    ],
    stats: [{ val: "72h", label: "Délai détection réduit" }, { val: "95%", label: "Précision IA" }, { val: "45+", label: "Maladies surveillées" }]
  },
  { id: "samu", name: "SAMU-Connect", icon: "🚑", color: "#06b6d4", subtitle: "Dispatching National des Urgences",
    desc: "Moderniser le 1515 avec la géolocalisation et l'affectation intelligente des ambulances.",
    features: [
      { icon: "📍", title: "Géolocalisation", desc: "Position appelant & ambulances" },
      { icon: "🚗", title: "Trafic Temps Réel", desc: "Assignation selon trafic dakarois" },
      { icon: "❤️", title: "Constantes Vitales", desc: "Transmission depuis l'ambulance" },
      { icon: "🏥", title: "Pré-alerte CHU", desc: "Équipe prête à l'arrivée" },
    ],
    stats: [{ val: "-60%", label: "Temps de réponse" }, { val: "200+", label: "Ambulances tracées" }, { val: "24/7", label: "Disponibilité" }]
  },
  { id: "ecmu", name: "e-CMU", icon: "💳", color: "#16a34a", subtitle: "Couverture Maladie Universelle",
    desc: "Digitaliser la CMU pour automatiser la facturation et éliminer les ruptures de droits.",
    features: [
      { icon: "📱", title: "QR Code Assuré", desc: "Vérification droits instantanée" },
      { icon: "💰", title: "Facturation Auto", desc: "Liaison directe avec les IPM" },
      { icon: "🔄", title: "Tiers Payant", desc: "Zéro avance de frais" },
      { icon: "📊", title: "Tableau de Bord", desc: "Suivi des remboursements" },
    ],
    stats: [{ val: "4.8M", label: "Familles couvertes" }, { val: "3 jours", label: "Délai remboursement" }, { val: "99%", label: "Taux de satisfaction" }]
  },
  { id: "vaccin", name: "Sen-Vaccin", icon: "💉", color: "#059669", subtitle: "Carnet de Vaccination Numérique",
    desc: "Remplacer le carnet papier par un passeport vaccinal biométrique national.",
    features: [
      { icon: "📱", title: "Carte Biométrique", desc: "Liée à l'état civil" },
      { icon: "🔔", title: "Rappels SMS", desc: "Alertes pour les prochains vaccins" },
      { icon: "📊", title: "Couverture Nationale", desc: "Taux par région en temps réel" },
      { icon: "✈️", title: "Voyages Internationaux", desc: "Carnet reconnu à l'international" },
    ],
    stats: [{ val: "95%", label: "Couverture cible" }, { val: "3M", label: "Enfants suivis" }, { val: "12", label: "Vaccins obligatoires" }]
  },
  { id: "forma", name: "Forma-Santé", icon: "🎓", color: "#7c3aed", subtitle: "Formation Continue Certifiée",
    desc: "Former tous les agents de santé sénégalais avec des certifications blockchain infalsifiables.",
    features: [
      { icon: "📱", title: "Offline First", desc: "Disponible sans réseau" },
      { icon: "🌍", title: "Langues Locales", desc: "Wolof, Pulaar, Mandingue" },
      { icon: "🏆", title: "Certif. Blockchain", desc: "Diplômes infalsifiables" },
      { icon: "🎥", title: "Vidéo HD", desc: "Cours filmés au CHU" },
    ],
    stats: [{ val: "15 000", label: "Agents formés/an" }, { val: "200+", label: "Modules disponibles" }, { val: "3", label: "Langues locales" }]
  },
  { id: "pharma", name: "Sen-PharmaNat", icon: "📦", color: "#ea580c", subtitle: "Chaîne d'Approvisionnement Nationale",
    desc: "Éliminer les ruptures de médicaments grâce à la prédiction IA et la traçabilité totale.",
    features: [
      { icon: "🧠", title: "Prédiction IA", desc: "Ruptures anticipées 3 mois avant" },
      { icon: "📦", title: "Traçabilité PNA", desc: "De Dakar au poste rural" },
      { icon: "⚠️", title: "Alertes Stock", desc: "Notification automatique" },
      { icon: "🔗", title: "Blockchain", desc: "Anti-contrefaçon médicaments" },
    ],
    stats: [{ val: "-80%", label: "Ruptures de stock" }, { val: "800", label: "Points de distribution" }, { val: "3 mois", label: "Anticipation IA" }]
  },
  { id: "stats", name: "Sen-SantéStats", icon: "📊", color: "#0369a1", subtitle: "Observatoire Épidémiologique National",
    desc: "Le tableau de bord de référence du Ministre de la Santé pour les décisions de santé publique.",
    features: [
      { icon: "📊", title: "KPIs Nationaux", desc: "Mortalité, morbidité, CMU" },
      { icon: "🗺️", title: "Carte Interactive", desc: "Indicateurs par région/département" },
      { icon: "📄", title: "Rapports OMS", desc: "Export automatique vers l'OMS" },
      { icon: "🔄", title: "Données Temps Réel", desc: "Agrégation automatique des CHU" },
    ],
    stats: [{ val: "50+", label: "Indicateurs nationaux" }, { val: "Temps Réel", label: "Mise à jour" }, { val: "14", label: "Régions couvertes" }]
  },
  { id: "tele", name: "Télé-Expertise", icon: "🌐", color: "#0f766e", subtitle: "Réseau Sécurisé des Spécialistes",
    desc: "Connecter les médecins ruraux aux spécialistes de Dakar (et du monde entier) en temps réel.",
    features: [
      { icon: "🔐", title: "Chiffrement E2E", desc: "Sécurité médicale garantie" },
      { icon: "📸", title: "Imagerie Partagée", desc: "Radio, IRM annotables" },
      { icon: "⏱️", title: "Réponse 24h", desc: "SLA garanti par spécialité" },
      { icon: "📋", title: "Traçabilité", desc: "Archivage médico-légal" },
    ],
    stats: [{ val: "500+", label: "Spécialistes réseau" }, { val: "< 24h", label: "Délai réponse" }, { val: "15+", label: "Spécialités couvertes" }]
  },
];

const BG = "#030f1a";
const ROOT = 'c:/gravity/national/msas-suite/app';

const pageTemplate = (app) => `"use client"
import Link from "next/link"

export default function ${app.name.replace(/[^a-zA-Z]/g, '')}Page() {
  return (
    <>
      <style>{\`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; background: #030f1a; color: #fff; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.4);opacity:0} }
        .au1{animation:fadeUp .6s .1s both} .au2{animation:fadeUp .6s .2s both}
        .au3{animation:fadeUp .6s .3s both} .au4{animation:fadeUp .6s .4s both}
        .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 1.5rem; text-align: center; transition: all 0.3s; }
        .stat-card:hover { border-color: ${app.color}44; background: rgba(255,255,255,0.05); transform: translateY(-3px); }
        .feat-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 1.25rem; transition: all 0.3s; }
        .feat-card:hover { border-color: ${app.color}44; background: rgba(255,255,255,0.04); }
        .back-btn { display: inline-flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; font-weight: 600; transition: color 0.2s; }
        .back-btn:hover { color: #fff; }
      \`}</style>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(3,15,26,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 1.5rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="back-btn">← Retour au Portail MSAS</Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "${app.color}" }} />
          <span style={{ fontSize: 12, color: "${app.color}", fontWeight: 700, letterSpacing: "0.1em" }}>EN LIGNE</span>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem" }}>

        {/* HERO */}
        <div className="au1" style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: "3rem" }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: "${app.color}20", border: "2px solid ${app.color}40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0, boxShadow: "0 0 30px ${app.color}30" }}>
            ${app.icon}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: "${app.color}", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", background: "${app.color}15", padding: "3px 10px", borderRadius: 6, border: "1px solid ${app.color}30" }}>
                Application MSAS
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 10 }}>
              <span style={{ background: "linear-gradient(135deg, #fff, ${app.color})", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                ${app.name}
              </span>
            </h1>
            <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 600 }}>
              ${app.desc}
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="au2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: "3rem" }}>
          ${app.stats.map(s => `<div className="stat-card">
            <p style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, color: "${app.color}", marginBottom: 4 }}>${s.val}</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>${s.label}</p>
          </div>`).join('\n          ')}
        </div>

        {/* FEATURES */}
        <div className="au3" style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 800, marginBottom: "1.5rem" }}>Fonctionnalités Clés</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 12 }}>
            ${app.features.map(f => `<div className="feat-card">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "${app.color}18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>${f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>${f.title}</h3>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>${f.desc}</p>
            </div>`).join('\n            ')}
          </div>
        </div>

        {/* CTA */}
        <div className="au4" style={{ background: "${app.color}10", border: "1px solid ${app.color}25", borderRadius: 16, padding: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <div>
            <h3 style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 800, marginBottom: 8 }}>Prêt à déployer cette solution ?</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Contactez Processingenierie pour un déploiement sur mesure au sein du MSAS.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="mailto:contact@processingenierie.sn" style={{ background: "${app.color}", color: "#fff", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              ✉️ Nous contacter
            </a>
            <Link href="/" style={{ background: "rgba(255,255,255,0.05)", color: "#fff", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)" }}>
              ← Retour Portail
            </Link>
          </div>
        </div>

      </main>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1.5rem", marginTop: "3rem", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Développé par <span style={{ color: "${app.color}", fontWeight: 700 }}>Processingenierie</span> · MSAS Sénégal 🇸🇳</p>
      </footer>
    </>
  )
}
`;

for (const app of APPS) {
  const dir = path.join(ROOT, app.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageTemplate(app), 'utf8');
  console.log(`✅ Created route: /${app.id}`);
}

console.log('\n🎉 Toutes les 10 pages MSAS créées avec succès !');
