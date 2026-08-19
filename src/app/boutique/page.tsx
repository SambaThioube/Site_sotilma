"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { fetchProduits } from "@/lib/shop";
import { isAllowedImageSrc } from "@/lib/images";
import type { ProduitBoutique as Product } from "@/types";

const BLUE   = "#1E72B8";
const TEXT_D = "#111111";
const TEXT_M = "#6B7280";

const ITEMS_PER_PAGE = 30;

const categories = [
  { id: "tous",         label: "Tous les produits" },
  { id: "vanne",        label: "Vannes"            },
  { id: "camera",       label: "Caméras"           },
  { id: "irrigation",   label: "Irrigation"        },
  { id: "distribution", label: "Distribution"      },
  { id: "pack",         label: "Packs"             },
];

const promos = [
  { label: "CAMÉRAS SOTILMA",      sub: "À PARTIR DE 105 000 CFA", btn: "Voir les caméras", cat: "camera", bg: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png" },
  { label: "POMPE MOBILE SOTILMA",    sub: "TOUT-EN-UN",               btn: "Voir les packs",   cat: "pack",   bg: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png" },
  { label: "VANNES SOTILMA", sub: "À PARTIR DE 180 000 CFA", btn: "Voir les vannes",  cat: "vanne",  bg: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " CFA";
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const cardAnim = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4 } },
};

function BoutiqueContent() {
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const catalogRef    = useRef<HTMLDivElement>(null);

  const [cat, setCat]                  = useState(() => searchParams.get("categorie") ?? "tous");
  const [page, setPage]                = useState(1);
  const [hoverId, setHover] = useState<string | null>(null);
  const { add }             = useCart();
  const [added, setAdded]   = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    const c = searchParams.get("categorie");
    if (c && c !== cat) { setCat(c); setPage(1); }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProduits()
      .then((data) => { if (!cancelled) { setProducts(data); setError(null); } })
      .catch(() => { if (!cancelled) setError("Impossible de charger les produits pour le moment."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const filtered   = cat === "tous" ? products : products.filter((p) => p.category === cat);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function pick(id: string) {
    setCat(id); setPage(1);
    router.push(`/boutique${id !== "tous" ? `?categorie=${id}` : ""}`, { scroll: false });
    setTimeout(() => catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  function handleAddToCart(p: Product, e: React.MouseEvent) {
    e.preventDefault();
    add({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 });
    setAdded(p.id);
    setTimeout(() => setAdded(null), 1400);
  }

  return (
      <main className="overflow-hidden">

        {/* ═══════════════════ HERO ═══════════════════ */}
        <section className="relative overflow-hidden bg-white" style={{ borderBottom: "1px solid #E8EFF6" }}>
          <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 py-6 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="font-light text-xs mb-0 leading-none" style={{ color: TEXT_M }}>Les</p>
              <h1 className="font-normal leading-none mb-2" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", color: TEXT_D }}>
                meilleures <span style={{ color: BLUE }}>Solutions.</span>
              </h1>
              <p className="text-xs mb-5 mx-auto" style={{ color: TEXT_M, maxWidth: 360 }}>
                Solutions intelligentes pour votre agriculture
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════ BANDEAUX PROMO ═══════════════════ */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-5" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            {promos.map((pr) => (
                <motion.div key={pr.label} variants={cardAnim}>
                  <motion.button onClick={() => pick(pr.cat)} whileHover={{ y: -6, scale: 1.025 }} whileTap={{ scale: 0.97 }}
                                 className="relative overflow-hidden text-left cursor-pointer w-full" style={{ borderRadius: 20, minHeight: 170 }}>
                    <div className="absolute inset-0">
                      <Image src={pr.bg} alt={pr.label} fill className="object-cover" sizes="33vw" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,30,70,0.72) 0%, rgba(10,30,70,0.45) 100%)" }} />
                    </div>
                    <div className="relative z-10 p-6">
                      <p className="font-normal leading-tight mb-1" style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)", color: "#FFFFFF" }}>{pr.label}</p>
                      <p className="text-xs font-medium mb-5" style={{ color: "#FFFFFF" }}>{pr.sub}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-8 py-3.5"
                            style={{ backgroundColor: BLUE, color: "#FFFFFF", borderRadius: 40 }}>{pr.btn}</span>
                    </div>
                  </motion.button>
                </motion.div>
            ))}
          </motion.div>
        </section>


        {/* ═══════════════════ CATALOGUE ═══════════════════ */}
        <section ref={catalogRef}>

          {/* Onglets filtres */}
          <div className="bg-white py-6 px-5 sm:px-8 lg:px-12" style={{ borderTop: "1px solid #E8EFF6" }}>
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
              {categories.map((c) => (
                  <motion.button
                      key={c.id}
                      onClick={() => pick(c.id)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      className="shrink-0 px-6 py-2.5 text-xs font-normal transition-colors duration-200"
                      style={
                        cat === c.id
                            ? { backgroundColor: BLUE, color: "#FFFFFF", borderRadius: 40 }
                            : { border: "1px solid #C8DCF0", color: TEXT_M, borderRadius: 40 }
                      }
                  >
                    {c.label}
                  </motion.button>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: "#EEF3F8" }} className="px-5 sm:px-8 lg:px-12 pt-10 pb-14">
            <div className="max-w-7xl mx-auto">
              {loading && (
                  <p className="text-center py-16 text-sm" style={{ color: TEXT_M }}>Chargement des produits…</p>
              )}
              {!loading && error && (
                  <p className="text-center py-16 text-sm" style={{ color: "#C0392B" }}>{error}</p>
              )}
              {!loading && !error && paginated.length === 0 && (
                  <p className="text-center py-16 text-sm" style={{ color: TEXT_M }}>Aucun produit dans cette catégorie.</p>
              )}
              {!loading && !error && paginated.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div key={cat + "-" + page}
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8 items-stretch"
                            variants={stagger} initial="hidden" animate="show">
                  {paginated.map((p) => {
                    const isHov   = hoverId === p.id;
                    const isAdded = added === p.id;
                    return (
                        <motion.div key={p.id} variants={cardAnim} className="h-full">
                          <Link href={`/boutique/produit/${p.id}`}
                                className="group flex flex-col bg-white h-full"
                                style={{
                                  borderRadius: 14,
                                  border: "1px solid #DDE6F0",
                                  boxShadow: isHov ? "0 8px 28px rgba(30,114,184,0.13)" : "0 2px 8px rgba(0,0,0,0.06)",
                                  transition: "box-shadow 0.25s, transform 0.25s",
                                  transform: isHov ? "translateY(-3px)" : "translateY(0)",
                                  overflow: "hidden",
                                  display: "flex",
                                  textDecoration: "none",
                                }}
                                onMouseEnter={() => setHover(p.id)}
                                onMouseLeave={() => setHover(null)}
                          >
                            <div className="relative shrink-0" style={{ height: 150, backgroundColor: "#F5F8FC" }}>
                              {p.image && isAllowedImageSrc(p.image) && (
                                  <Image src={p.image} alt={p.name} fill
                                         className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                                         sizes="(max-width: 640px) 50vw, 25vw" />
                              )}
                            </div>
                            <div style={{ height: 2, backgroundColor: BLUE }} />
                            <div className="flex flex-col flex-1 px-3 pt-2.5 pb-3">
                              <p className="font-semibold leading-snug line-clamp-2 text-center mb-1" style={{ fontSize: "0.68rem", color: "#111" }}>
                                {p.name}
                              </p>
                              <div className="mx-auto mb-1.5" style={{ width: 24, height: 2, borderRadius: 2, backgroundColor: BLUE }} />
                              <p className="text-center font-medium mb-2 flex-1 flex items-end justify-center" style={{ fontSize: "0.88rem", color: "#111", lineHeight: 1 }}>
                                {fmt(p.price)}
                              </p>
                              <motion.button
                                  onClick={(e) => { e.stopPropagation(); handleAddToCart(p, e); }}
                                  className="w-full py-2 rounded-lg font-semibold text-white text-xs"
                                  animate={{ backgroundColor: isAdded ? "#22c55e" : BLUE }}
                                  whileTap={{ scale: 0.97 }}
                                  transition={{ duration: 0.15 }}
                              >
                                {isAdded ? "Ajouté au panier ✓" : "Ajouter au panier"}
                              </motion.button>
                            </div>
                          </Link>
                        </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                  <motion.div className="flex items-center justify-center gap-2 mt-10"
                              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <motion.button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                                   whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                   className="w-9 h-9 rounded-full border text-xs font-medium disabled:opacity-30"
                                   style={{ borderColor: "#C8D9E8", color: TEXT_M }}>‹</motion.button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <motion.button key={n} onClick={() => setPage(n)}
                                       whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                       className="w-9 h-9 rounded-full text-xs font-medium transition-all"
                                       style={n === page ? { backgroundColor: BLUE, color: "#fff" } : { border: "1px solid #C8D9E8", color: TEXT_M }}>
                          {n}
                        </motion.button>
                    ))}
                    <motion.button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                                   whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                   className="w-9 h-9 rounded-full border text-xs font-medium disabled:opacity-30"
                                   style={{ borderColor: "#C8D9E8", color: TEXT_M }}>›</motion.button>
                  </motion.div>
              )}

              <motion.div className="text-center mt-8" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Link href="/a-propos#contact" className="inline-flex items-center gap-2 text-sm font-normal transition-opacity hover:opacity-60" style={{ color: BLUE }}>
                  Demander un devis personnalisé →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
  );
}
export default function BoutiquePage() {
  return (
      <Suspense fallback={<div className="min-h-screen" />}>
        <BoutiqueContent />
      </Suspense>
  );
}
