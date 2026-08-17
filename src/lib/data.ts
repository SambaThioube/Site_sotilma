// ============================================================
// FICHIER : src/lib/data.ts
// ============================================================

import type { DomaineExpertise, Partenaire } from "@/types";

// ── Domaines d'expertise ───────────────────────────────────

export const domainesExpertise: DomaineExpertise[] = [
  {
    id: "irrigation",
    subtitle: "Farm",
    title: "Gestion de l'eau automatique",
    description:
      "La technologie SOTILMA est non seulement accessible et facile à utiliser, mais elle fonctionne également sans besoin d'internet, en utilisant l'énergie solaire.",
    image:
      "https://static.wixstatic.com/media/75ad33_1eb29bbf53824df6bd82594937dcc22f~mv2.jpg/v1/crop/x_2294,y_0,w_2507,h_3546/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/rafraichissement-haut-alors-que-arroseurs-arcs-eau-verdure-geometrique-champs%20(1).jpg",
    secondaryImage:
      "https://static.wixstatic.com/media/75ad33_1eb29bbf53824df6bd82594937dcc22f~mv2.jpg/v1/crop/x_2294,y_0,w_2507,h_3546/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/rafraichissement-haut-alors-que-arroseurs-arcs-eau-verdure-geometrique-champs%20(1).jpg",
    tags: ["IoT solaire", "Sans internet", "Pilotage mobile", "LoRa"],
  },
  {
    id: "industrie",
    subtitle: "Industrie",
    title: "Industrie",
    description:
      "Vannes en alliages spéciaux pouvant s'adapter à des températures très élevées et basses notamment dans l'industrie.",
    image:
      "https://static.wixstatic.com/media/11062b_219c166fc6d04b7aa60f59100e1a6ea5~mv2.jpg/v1/crop/x_790,y_0,w_1333,h_1632/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pipelines%20d'usine.jpg",
    secondaryImage:
      "https://static.wixstatic.com/media/11062b_219c166fc6d04b7aa60f59100e1a6ea5~mv2.jpg/v1/crop/x_790,y_0,w_1333,h_1632/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pipelines%20d'usine.jpg",
    tags: ["Haute pression", "Températures extrêmes", "ATEX", "Inox 316L"],
  },
  {
    id: "gestion-ferme",
    subtitle: "Smart Farm",
    title: "Gestion de ferme agricole",
    description:
      "Pilotez l'ensemble de votre exploitation agricole depuis votre smartphone : irrigation, pompage, surveillance des cultures et gestion des ressources en eau.",
    image:
      "https://www.the-land.bzh/wp-content/uploads/2024/11/Les-metiers-de-la-gestion-agricole-entre-tradition-et-innovation.jpg.webp",
    secondaryImage:
      "https://www.the-land.bzh/wp-content/uploads/2024/11/Les-metiers-de-la-gestion-agricole-entre-tradition-et-innovation.jpg.webp",
    tags: ["Smart farming", "Pilotage mobile", "Gestion eau", "IoT"],
  },
  {
    id: "canalisation",
    subtitle: "Water",
    title: "Canalisation",
    description:
      "Vanne principalement utilisée comme le robinet motorisé, la vanne papillon, l'électrovanne pour la distribution et la gestion de l'eau potable.",
    image:
      "https://static.wixstatic.com/media/11062b_d680497ae73e423b81f2050772980f4e~mv2.jpg/v1/crop/x_781,y_0,w_2500,h_3064/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Fixer%20un%20tuyau.jpg",
    secondaryImage:
      "https://static.wixstatic.com/media/11062b_d680497ae73e423b81f2050772980f4e~mv2.jpg/v1/crop/x_781,y_0,w_2500,h_3064/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Fixer%20un%20tuyau.jpg",
    tags: ["Eau potable", "Vanne papillon", "Électrovanne", "Motorisé"],
  },
  {
    id: "pipeline",
    subtitle: "Oil",
    title: "Pipeline Pétrole & Gaz",
    description:
      "Solution complète de gestion des fluides dédiée aux applications les plus exigeantes : gestion automatisée, système pipeline, pétrochimie.",
    image:
      "https://static.wixstatic.com/media/fb82545edb1641db909d551d5f65382b.jpg/v1/crop/x_2106,y_0,w_3063,h_3744/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Usine%20chimique.jpg",
    secondaryImage:
      "https://static.wixstatic.com/media/fb82545edb1641db909d551d5f65382b.jpg/v1/crop/x_2106,y_0,w_3063,h_3744/fill/w_576,h_796,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Usine%20chimique.jpg",
    tags: ["Pipeline", "Pétrochimie", "Haute sécurité", "Automatisation"],
  },
];

// ── Partenaires ────────────────────────────────────────────

export const partenaires: Partenaire[] = [
  { id: "1", name: "SAED", logo: "/images/partners/saed.png" },
  { id: "2", name: "OFOR", logo: "/images/partners/ofor.png" },
  { id: "3", name: "SDE", logo: "/images/partners/sde.png" },
  { id: "4", name: "ISRA", logo: "/images/partners/isra.png" },
];
