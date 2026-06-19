const fs = require('fs');
const path = require('path');

const APPS = {
  "sen-vaccin": {
    name: "Sen-Vaccin",
    title: "Carnet de Vaccination Numérique",
    desc: "Couverture vaccinale biométrique en temps réel par région.",
    hex1: "#059669", hex2: "#047857",
  },
  "forma-sante": {
    name: "Forma-Santé",
    title: "Formation Continue Certifiée",
    desc: "E-learning médical en Wolof et Pulaar, disponible hors-ligne.",
    hex1: "#7c3aed", hex2: "#6d28d9",
  },
  "sen-pharmanat": {
    name: "Sen-PharmaNat",
    title: "Chaîne d'Approvisionnement",
    desc: "Prédiction des ruptures médicaments 3 mois à l'avance.",
    hex1: "#ea580c", hex2: "#c2410c",
  },
  "sen-santestats": {
    name: "Sen-SantéStats",
    title: "Observatoire Épidémiologique",
    desc: "Tableau de bord MSAS pour l'OMS — données santé nationales temps réel.",
    hex1: "#0284c7", hex2: "#0369a1",
  },
  "tele-expertise": {
    name: "Télé-Expertise",
    title: "Réseau des Spécialistes",
    desc: "WhatsApp sécurisé reliant généralistes ruraux et spécialistes.",
    hex1: "#0f766e", hex2: "#115e59",
  }
};

const ROOT = 'c:/gravity/national';

function replaceInFile(filePath, searchRegex, replacement) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(searchRegex, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

for (const [appId, data] of Object.entries(APPS)) {
  const dir = path.join(ROOT, appId);
  replaceInFile(path.join(dir, 'package.json'), /"name": "(citoyen|cnra-analytics)"/g, `"name": "${appId}"`);
  const pagePath = path.join(dir, 'app/page.tsx');
  replaceInFile(pagePath, /(Citoyen|CNRA Analytics)/g, data.name);
  replaceInFile(pagePath, /(Le portail.*audiovisuelle|Centre de Commandement Stratégique)/g, data.title);
  replaceInFile(pagePath, /(Signalez.*audiovisuelle|Agrégez et analysez toutes les données de régulation via IA)/g, data.desc);
  replaceInFile(pagePath, /bg-\[\#1A3A6B\]/g, `bg-[${data.hex1}]`);
  replaceInFile(pagePath, /text-\[\#1A3A6B\]/g, `text-[${data.hex1}]`);
  replaceInFile(pagePath, /CNRA/g, 'MSAS');
  const navPath = path.join(dir, 'components/Navbar.tsx');
  replaceInFile(navPath, /(Citoyen|CNRA Analytics)/g, data.name);
  replaceInFile(navPath, /#1A3A6B/g, data.hex1);
}

// Update msas-suite portal to include 10 apps
const suitePagePath = path.join(ROOT, 'msas-suite', 'app', 'page.tsx');
if (fs.existsSync(suitePagePath)) {
  let content = fs.readFileSync(suitePagePath, 'utf8');
  const newApps = `const APPS = [
  { id: "dmp", name: "DMP-Sénégal", url: "http://localhost:4001", icon: "🗂️", desc: "Dossier Médical Partagé National", color: "from-sky-600 to-sky-400", bg: "bg-sky-50" },
  { id: "maternite", name: "Sama-Maternité", url: "http://localhost:4002", icon: "🤰", desc: "Suivi Périnatal Connecté", color: "from-pink-600 to-pink-400", bg: "bg-pink-50" },
  { id: "epidemio", name: "Sen-Epidemio", url: "http://localhost:4003", icon: "🚨", desc: "Radar Épidémiologique (IA)", color: "from-red-600 to-red-400", bg: "bg-red-50" },
  { id: "samu", name: "SAMU-Connect", url: "http://localhost:4004", icon: "🚑", desc: "Dispatching du 1515", color: "from-cyan-600 to-cyan-400", bg: "bg-cyan-50" },
  { id: "ecmu", name: "e-CMU", url: "http://localhost:4005", icon: "💳", desc: "Couverture Maladie Universelle", color: "from-green-600 to-green-400", bg: "bg-green-50" },
  { id: "vaccin", name: "Sen-Vaccin", url: "http://localhost:4006", icon: "💉", desc: "Carnet Vaccination Biométrique", color: "from-emerald-600 to-emerald-400", bg: "bg-emerald-50" },
  { id: "forma", name: "Forma-Santé", url: "http://localhost:4007", icon: "🎓", desc: "Formation Continue en Langues Locales", color: "from-violet-600 to-violet-400", bg: "bg-violet-50" },
  { id: "pharma", name: "Sen-PharmaNat", url: "http://localhost:4008", icon: "📦", desc: "Prédiction Ruptures Médicaments (IA)", color: "from-orange-600 to-orange-400", bg: "bg-orange-50" },
  { id: "stats", name: "Sen-SantéStats", url: "http://localhost:4009", icon: "📊", desc: "Observatoire Épidémiologique National", color: "from-sky-600 to-sky-400", bg: "bg-sky-50" },
  { id: "tele", name: "Télé-Expertise", url: "http://localhost:4010", icon: "🌐", desc: "Réseau Sécurisé des Spécialistes", color: "from-teal-600 to-teal-400", bg: "bg-teal-50" },
]`;
  content = content.replace(/const APPS = \[[\s\S]*?\];?/, newApps + ';');
  content = content.replace(/gridTemplateColumns: "repeat\(auto-fit, minmax\(340px, 1fr\)\)"/g, 'gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))"');
  fs.writeFileSync(suitePagePath, content, 'utf8');
}

console.log('✅ Patch MSAS Phase 3 completed! 10 apps total.');
