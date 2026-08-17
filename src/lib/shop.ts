// ============================================================
// FICHIER : src/lib/shop.ts
// RÔLE    : Service CÔTÉ CLIENT pour la boutique. Appelle nos
//           routes internes /api/produits (jamais le backend
//           Sotilma directement) — aucune clé secrète ici.
// ============================================================

import type { ProduitBoutique } from "@/types";

// Un peu plus long que le timeout backend côté serveur (60s) pour lui laisser
// le temps de répondre (même avec une erreur propre) avant qu'on abandonne ici.
const CLIENT_TIMEOUT_MS = 65_000;

export async function fetchProduits(params: {
  categorie?: string;
  q?: string;
} = {}): Promise<ProduitBoutique[]> {
  const search = new URLSearchParams();
  if (params.categorie && params.categorie !== "tous") search.set("categorie", params.categorie);
  if (params.q) search.set("q", params.q);
  const qs = search.toString();

  const res = await fetch(`/api/produits${qs ? `?${qs}` : ""}`, {
    signal: AbortSignal.timeout(CLIENT_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error("Impossible de charger les produits.");
  return res.json();
}

export async function fetchProduit(id: string): Promise<ProduitBoutique | null> {
  const res = await fetch(`/api/produits/${encodeURIComponent(id)}`, {
    signal: AbortSignal.timeout(CLIENT_TIMEOUT_MS),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Impossible de charger le produit.");
  return res.json();
}