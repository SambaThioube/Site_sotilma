// ============================================================
// FICHIER : src/app/api/produits/route.ts
// RÔLE    : Proxy serveur vers GET /produit/ du backend Sotilma.
//           Ajoute la clé API côté serveur — le navigateur ne
//           voit jamais SOTILMA_API_KEY.
//
// URL : GET /api/produits?categorie=camera&q=...
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { fetchProduitsFromBackend, mapProduit } from "@/lib/produits";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? undefined;
  const categorie = searchParams.get("categorie") ?? undefined;

  try {
    const produits = await fetchProduitsFromBackend({ q, categorie });
    return NextResponse.json(produits.map(mapProduit));
  } catch (err) {
    console.error("Erreur /api/produits:", err);
    return NextResponse.json({ error: "Impossible de charger les produits." }, { status: 502 });
  }
}