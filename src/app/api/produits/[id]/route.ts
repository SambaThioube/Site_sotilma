// ============================================================
// FICHIER : src/app/api/produits/[id]/route.ts
// RÔLE    : Proxy serveur vers GET /produit/{id} du backend Sotilma.
//           Accepte un id numérique ou un slug.
//
// URL : GET /api/produits/camera-agricole-v1
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { fetchProduitFromBackend, mapProduit } from "@/lib/produits";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const produit = await fetchProduitFromBackend(id);
    if (!produit) {
      return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
    }
    return NextResponse.json(mapProduit(produit));
  } catch (err) {
    console.error("Erreur /api/produits/[id]:", err);
    return NextResponse.json({ error: "Impossible de charger le produit." }, { status: 502 });
  }
}