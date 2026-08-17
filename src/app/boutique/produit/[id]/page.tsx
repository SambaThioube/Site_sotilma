"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { fetchProduit } from "@/lib/shop";
import { isAllowedImageSrc } from "@/lib/images";
import type { ProduitBoutique as Product } from "@/types";

const BLUE   = "#1E72B8";
const DARK   = "#111111";
const TEXT_M = "#6B7280";
const RED    = "#C0392B";

function getIcon(feature: string) {
  const f = feature.toLowerCase();
  if (f.includes("téléphone") || f.includes("pilotable") || f.includes("distance") || f.includes("appli"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="6" x2="15" y2="6"/><circle cx="12" cy="17" r="1" fill="#fff"/></svg>;
  if (f.includes("solaire") || f.includes("solar") || f.includes("panneau"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><rect x="2" y="6" width="20" height="12" rx="1"/><line x1="7" y1="6" x2="7" y2="18"/><line x1="12" y1="6" x2="12" y2="18"/><line x1="17" y1="6" x2="17" y2="18"/><line x1="2" y1="12" x2="22" y2="12"/></svg>;
  if (f.includes("nocturne") || f.includes("vision") || f.includes("infrarouge"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
  if (f.includes("motorisée") || f.includes("360") || f.includes("caméra"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>;
  if (f.includes("sim") || f.includes("4g") || f.includes("lora") || f.includes("iot") || f.includes("réseau"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><rect x="7" y="2" width="10" height="20" rx="1"/><path d="M7 6h10M7 18h10M11 21h2"/></svg>;
  if (f.includes("hectare") || f.includes("couverture") || f.includes("portée"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>;
  if (f.includes("sécurité") || f.includes("ip6") || f.includes("étanche"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M12 2L3 7v5c0 5.25 3.75 10.17 9 11.33C17.25 22.17 21 17.25 21 12V7L12 2z"/></svg>;
  if (f.includes("haut-parleur") || f.includes("micro") || f.includes("son") || f.includes("audio"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>;
  if (f.includes("garantie") || f.includes("mois") || f.includes("an"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>;
  if (f.includes("installation") || f.includes("facile"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>;
  if (f.includes("anti-corrosion") || f.includes("inox") || f.includes("matière"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="none" strokeWidth={2} className="w-5 h-5"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 6v6l4 2"/></svg>;
  if (f.includes("pression") || f.includes("bar"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>;
}

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
}

export default function ProductPage() {
  const params  = useParams();
  const router  = useRouter();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const images = (product?.images?.length ? product.images : []).filter(isAllowedImageSrc);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setError(null);
    setImgIdx(0);
    fetchProduit(id)
      .then((data) => {
        if (cancelled) return;
        if (!data) setNotFound(true);
        else setProduct(data);
      })
      .catch(() => { if (!cancelled) setError("Impossible de charger ce produit pour le moment. Réessaie dans quelques instants."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-sm" style={{ color: TEXT_M }}>Chargement du produit…</p>
        </main>
    );
  }

  if (error) {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-lg font-semibold" style={{ color: DARK }}>{error}</p>
          <Link href="/boutique" className="text-sm underline" style={{ color: BLUE }}>← Retour à la boutique</Link>
        </main>
    );
  }

  if (notFound || !product) {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-lg font-semibold" style={{ color: DARK }}>Produit introuvable</p>
          <Link href="/boutique" className="text-sm underline" style={{ color: BLUE }}>← Retour à la boutique</Link>
        </main>
    );
  }

  function handleAddToCart() {
    add({ id: product!.id, name: product!.name, price: product!.price, image: product!.image, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
      <main className="min-h-screen" style={{ backgroundColor: "#F0F4F8" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 py-12">

          {/* Retour */}
          <button onClick={() => router.back()}
                  className="flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-60"
                  style={{ color: TEXT_M }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la boutique
          </button>

          {/* Layout 2 colonnes */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Image / carrousel */}
            <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                className="rounded-2xl flex flex-col items-center justify-center p-10 gap-4"
                style={{ backgroundColor: "#E8EFF6", minHeight: 380 }}>
              {images.length > 0 && (
                  <div className="relative w-full" style={{ aspectRatio: "1/1", maxWidth: 320 }}>
                    <Image src={images[imgIdx]} alt={product.name} fill className="object-contain" sizes="380px" priority />
                  </div>
              )}
              {images.length > 1 && (
                  <div className="flex gap-3">
                    {images.map((src, i) => (
                        <button key={i} onClick={() => setImgIdx(i)}
                                className="relative rounded-xl overflow-hidden transition-all duration-200"
                                style={{
                                  width: 56, height: 56,
                                  border: i === imgIdx ? `2px solid ${BLUE}` : "2px solid transparent",
                                  backgroundColor: "#fff",
                                }}>
                          <Image src={src} alt={`Vue ${i + 1}`} fill className="object-contain p-1" sizes="60px" />
                        </button>
                    ))}
                  </div>
              )}
            </motion.div>

            {/* Infos */}
            <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col">

              {/* Marque */}
              <p className="font-semibold tracking-[0.22em] uppercase mb-1.5" style={{ fontSize: "0.68rem", color: BLUE }}>
                Sotilma
              </p>

              {/* Nom */}
              <h1 className="font-medium leading-snug mb-2" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: DARK }}>
                {product.name}
              </h1>

              {/* Prix */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <p className="font-semibold" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", color: RED }}>
                  {fmt(product.price)} <span style={{ fontSize: "0.7em", fontWeight: 600 }}>FCFA</span>
                </p>
              </div>

              {/* Séparateur */}
              <div style={{ height: 1, backgroundColor: "#DDE6F0", marginBottom: 14 }} />

              {/* Description */}
              {product.longDescription && (
                  <p className="leading-relaxed mb-5" style={{ fontSize: "0.82rem", color: TEXT_M }}>
                    {product.longDescription}
                  </p>
              )}

              {/* Grille caractéristiques avec icônes */}
              {product.features.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {product.features.map((f) => (
                        <div key={f}
                             className="flex items-center gap-2 px-2.5 py-2.5 rounded-xl"
                             style={{ backgroundColor: "#EDF4FB", border: "1px solid #D0E4F5" }}>
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                               style={{ backgroundColor: BLUE }}>
                            {getIcon(f)}
                          </div>
                          <span className="leading-tight" style={{ fontSize: "0.68rem", fontWeight: 500, color: DARK }}>{f}</span>
                        </div>
                    ))}
                  </div>
              )}
              {/* Boutons */}
              <div className="flex flex-row gap-3 mb-6">
                <Link href="/panier"
                      className="flex-1 py-2 px-4 rounded-full font-semibold text-xs text-center transition-all hover:opacity-90 border-2"
                      style={{ backgroundColor: "#FFF", color: BLUE, borderColor: BLUE }}
                      onClick={handleAddToCart}>
                  Commander →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
  );
}
