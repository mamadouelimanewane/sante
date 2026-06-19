const fs = require('fs');
const path = require('path');

const APPS = {
  "dmp-senegal": {
    name: "DMP-Sénégal",
    title: "Dossier Médical Partagé National",
    desc: "Interopérabilité et suivi des patients à l'échelle nationale.",
    hex1: "#0284c7", // Sky blue
    hex2: "#0369a1",
  },
  "sama-maternite": {
    name: "Sama-Maternité",
    title: "Suivi Périnatal Connecté",
    desc: "Prévention de la mortalité maternelle et infantile par SMS/Vocal.",
    hex1: "#f472b6", // Pink
    hex2: "#be185d",
  },
  "sen-epidemio": {
    name: "Sen-Epidemio",
    title: "Radar Épidémiologique National",
    desc: "IA de veille sanitaire et détection précoce des foyers d'infection.",
    hex1: "#dc2626", // Red
    hex2: "#991b1b",
  },
  "samu-connect": {
    name: "SAMU-Connect",
    title: "Dispatching National des Urgences",
    desc: "Géolocalisation du 1515 et affectation dynamique des ambulances.",
    hex1: "#06b6d4", // Cyan
    hex2: "#0e7490",
  },
  "e-cmu": {
    name: "e-CMU",
    title: "Couverture Maladie Universelle",
    desc: "Facturation digitale automatisée avec l'Agence Nationale de la CMU.",
    hex1: "#16a34a", // Green
    hex2: "#15803d",
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
  
  // package.json
  replaceInFile(path.join(dir, 'package.json'), /"name": "(citoyen|cnra-analytics|hopital-suite)"/g, `"name": "${appId}"`);
  
  // layout.tsx
  const layoutPath = path.join(dir, 'app/(site)/layout.tsx');
  replaceInFile(layoutPath, /(Citoyen|CNRA Analytics|CHNCAK Predict-IA)/g, data.name);
  replaceInFile(layoutPath, /#1A3A6B/g, data.hex1);
  replaceInFile(layoutPath, /#C9A84C/g, data.hex2);

  // page.tsx (accueil)
  const pagePath = path.join(dir, 'app/page.tsx');
  replaceInFile(pagePath, /(Citoyen|CNRA Analytics|CHNCAK Predict-IA)/g, data.name);
  replaceInFile(pagePath, /(Le portail.*audiovisuelle|Centre de Commandement Stratégique)/g, data.title);
  replaceInFile(pagePath, /(Signalez.*audiovisuelle|Agrégez et analysez toutes les données de régulation via IA)/g, data.desc);
  
  // Replace colors for non-IA templates
  replaceInFile(pagePath, /bg-\[\#1A3A6B\]/g, `bg-[${data.hex1}]`);
  replaceInFile(pagePath, /text-\[\#1A3A6B\]/g, `text-[${data.hex1}]`);
  replaceInFile(pagePath, /bg-\[\#C9A84C\]/g, `bg-[${data.hex2}]`);
  replaceInFile(pagePath, /text-\[\#C9A84C\]/g, `text-[${data.hex2}]`);
  
  // Replace references to CNRA
  replaceInFile(pagePath, /CNRA/g, 'MSAS');

  // Navbar
  const navPath = path.join(dir, 'components/Navbar.tsx');
  replaceInFile(navPath, /(Citoyen|CNRA Analytics|CHNCAK Predict-IA)/g, data.name);
  replaceInFile(navPath, /#1A3A6B/g, data.hex1);
}

// ----------------------------------------------------
// Patcher MSAS-Suite (Le Portail Ministériel)
// ----------------------------------------------------
const suitePagePath = path.join(ROOT, 'msas-suite', 'app', 'page.tsx');
if (fs.existsSync(suitePagePath)) {
  let suiteContent = fs.readFileSync(suitePagePath, 'utf8');
  
  // Textes Nationaux
  suiteContent = suiteContent.replace(/CNRA Suite|Hopital Suite/g, "MSAS Suite");
  suiteContent = suiteContent.replace(/Conseil National de Régulation de l'Audiovisuel/g, "Ministère de la Santé et de l'Action Sociale");
  suiteContent = suiteContent.replace(/Réguler l'audiovisuel. Protéger les citoyens. Éduquer aux médias./g, "Prévenir. Guérir. Protéger l'ensemble des citoyens sénégalais.");
  suiteContent = suiteContent.replace(/Réguler, Protéger, Éduquer/g, "Santé pour Tous");
  suiteContent = suiteContent.replace(/Le CNRA veille au respect du pluralisme.*/g, "Le MSAS s'assure que chaque citoyen, de Dakar aux régions les plus reculées, dispose d'un accès souverain et technologique aux meilleurs soins médicaux.");
  suiteContent = suiteContent.replace(/Le Nouveau/g, "Le Système Souverain");
  suiteContent = suiteContent.replace(/Système d'Information/g, "Santé Numérique");
  suiteContent = suiteContent.replace(/du CNRA/g, "du MSAS");
  suiteContent = suiteContent.replace(/CNRA/g, "MSAS");
  
  // Couleurs de l'État : Vert-Jaune-Rouge discret
  suiteContent = suiteContent.replace(/#0f2d6b/g, "#064e3b"); // Emerald 900
  suiteContent = suiteContent.replace(/rgba\(15,45,107,0\.92\)/g, "rgba(6,78,59,0.92)");
  suiteContent = suiteContent.replace(/linear-gradient\(135deg, #2a5298, #1a3a6b\)/g, "linear-gradient(135deg, #059669, #064e3b)");
  suiteContent = suiteContent.replace(/linear-gradient\(135deg, #1A3A6B, #2a5298\)/g, "linear-gradient(135deg, #059669, #10b981)");
  
  const newAppsContent = `const APPS = [
  { id: "dmp", name: "DMP-Sénégal", url: "http://localhost:4001", icon: "🗂️", desc: "Dossier Médical Partagé National", color: "from-sky-600 to-sky-400", bg: "bg-sky-50" },
  { id: "maternite", name: "Sama-Maternité", url: "http://localhost:4002", icon: "🤰", desc: "Suivi Périnatal Connecté", color: "from-pink-600 to-pink-400", bg: "bg-pink-50" },
  { id: "epidemio", name: "Sen-Epidemio", url: "http://localhost:4003", icon: "🚨", desc: "Radar Épidémiologique (IA)", color: "from-red-600 to-red-400", bg: "bg-red-50" },
  { id: "samu", name: "SAMU-Connect", url: "http://localhost:4004", icon: "🚑", desc: "Dispatching du 1515", color: "from-cyan-600 to-cyan-400", bg: "bg-cyan-50" },
  { id: "ecmu", name: "e-CMU", url: "http://localhost:4005", icon: "💳", desc: "Couverture Maladie Universelle", color: "from-green-600 to-green-400", bg: "bg-green-50" },
]`;
  
  suiteContent = suiteContent.replace(/const APPS = \[[\s\S]*?\];?/, newAppsContent + ';');
  
  fs.writeFileSync(suitePagePath, suiteContent, 'utf8');
}

// package.json du portail
replaceInFile(path.join(ROOT, 'msas-suite', 'package.json'), /"name": "(cnra-suite|hopital-suite)"/g, '"name": "msas-suite"');

console.log('Patch National MSAS completed successfully!');
