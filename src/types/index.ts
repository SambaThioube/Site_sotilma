// ============================================================
// FICHIER : src/types/index.ts
// ============================================================

export interface DomaineExpertise {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  secondaryImage: string;
  tags: string[];
}

export interface Partenaire {
  id: string;
  name: string;
  logo: string;
}

export interface DonneesContact {
  nom: string;
  email: string;
  telephone?: string;
  message: string;
}

// ============================================================
// Backend Sotilma — catalogue produits (API réelle)
// Doc : https://back-end-site-web.onrender.com/apidocs/
// ============================================================

export type CategorieProduit = "camera" | "vanne" | "irrigation" | "distribution" | "pack";

// Forme brute renvoyée par GET /produit/ et /produit/{id}
export interface Produit {
  id: number;
  slug: string;
  title: string;
  row_description: string;
  description_complete: string;
  card_explanation: string;
  categorie: CategorieProduit;
  prix_base: number;
  prix_str: string;
  features: string[];
  options: Record<string, number>;
  photos: { url: string | null; caption: string }[];
  retailer_id: string;
}

// Forme adaptée pour l'affichage boutique (utilisée par les pages client)
export interface ProduitBoutique {
  id: string; // = slug backend
  name: string;
  description: string;
  longDescription: string;
  category: CategorieProduit;
  image: string; // "" si aucune photo fournie par le backend
  images: string[];
  price: number;
  priceLabel: string;
  features: string[];
}
