// ============================================================
// FICHIER : src/lib/produits.ts
// RÔLE    : Communique avec le backend Sotilma (catalogue produits).
//
// ⚠️ SERVEUR UNIQUEMENT — ce fichier utilise SOTILMA_API_KEY,
// une clé secrète. Il ne doit être importé que par des route
// handlers (src/app/api/**/route.ts), jamais par un composant
// "use client". Les pages client passent par nos routes internes
// /api/produits (voir src/lib/shop.ts).
//
// Doc backend : https://back-end-site-web.onrender.com/apidocs/
// ============================================================

import type { Produit, ProduitBoutique } from "@/types";

const SOTILMA_API_URL = process.env.SOTILMA_API_URL || "https://back-end-site-web.onrender.com";
const SOTILMA_API_KEY = process.env.SOTILMA_API_KEY;

// Le backend (Render.com, offre gratuite) peut se mettre en veille et mettre
// jusqu'à 50s à se réveiller sur la première requête. On attend un peu plus
// longtemps que ça avant d'abandonner, pour ne pas bloquer la page indéfiniment
// si le service est réellement hors service.
const BACKEND_TIMEOUT_MS = 60_000;

function authHeaders(): HeadersInit {
  return SOTILMA_API_KEY ? { "X-API-Key": SOTILMA_API_KEY } : {};
}

export async function fetchProduitsFromBackend(params: {
  q?: string;
  categorie?: string;
} = {}): Promise<Produit[]> {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.categorie) search.set("categorie", params.categorie);
  const qs = search.toString();

  const res = await fetch(`${SOTILMA_API_URL}/produit/${qs ? `?${qs}` : ""}`, {
    headers: authHeaders(),
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Erreur backend produits (${res.status})`);
  return res.json();
}

export async function fetchProduitFromBackend(idOuSlug: string): Promise<Produit | null> {
  const res = await fetch(`${SOTILMA_API_URL}/produit/${encodeURIComponent(idOuSlug)}`, {
    headers: authHeaders(),
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Erreur backend produit (${res.status})`);
  return res.json();
}

// Adapte la forme brute du backend vers la forme utilisée par l'UI boutique
export function mapProduit(p: Produit): ProduitBoutique {
  const photos = (p.photos ?? [])
    .map((photo) => photo.url)
    .filter((url): url is string => !!url);

  return {
    id: p.slug,
    name: p.title,
    description: p.card_explanation || p.row_description,
    longDescription: p.description_complete,
    category: p.categorie,
    image: photos[0] ?? "",
    images: photos,
    price: p.prix_base,
    priceLabel: p.prix_str,
    features: p.features ?? [],
  };
}