'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cartContext';

const BLUE   = "#1E72B8";
const TEXT_D = "#0D2235";
const TEXT_M = "#5A7A94";
const BGLIGHT = "#F5F9FD";

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " CFA";
}

export default function PanierPage() {
  const { items, count, total, remove, update, clear } = useCart();

  if (count === 0) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10"
             style={{ backgroundColor: BGLIGHT }}>
          <div className="bg-white rounded-3xl p-12 text-center max-w-md w-full"
               style={{ border: "1px solid #E0ECF8", boxShadow: "0 8px 40px rgba(30,114,184,0.07)" }}>

            <h1 className="font-normal text-3xl mb-3" style={{ color: TEXT_D }}>
              Mon panier
            </h1>

            <p className="text-base mb-2" style={{ color: TEXT_M }}>
              Votre panier est vide
            </p>

            <p className="text-sm mb-10" style={{ color: TEXT_M, opacity: 0.7 }}>
              Explorez notre boutique pour découvrir nos solutions IoT agricoles.
            </p>

            <Link href="/boutique"
                  className="inline-flex items-center gap-2 font-medium text-sm px-8 py-3.5 rounded-full transition-all hover:opacity-85"
                  style={{ backgroundColor: BLUE, color: "#FFFFFF" }}>
              Explorer la boutique →
            </Link>

            <div className="mt-8 pt-8" style={{ borderTop: "1px solid #E0ECF8" }}>
              <Link href="/" className="text-xs font-normal" style={{ color: TEXT_M }}>
                ← Retour à l&apos;accueil
              </Link>
            </div>

          </div>
        </div>
    );
  }

  // 👉 MESSAGE WHATSAPP (propre + lisible)
  const whatsappMessage = `
Recapitulatif de mon panier :
---------------------------------------------

${items.map(i => `- ${i.name} x${i.quantity}`).join('\n')}

Total : ${fmt(total)}
  `.trim();

  const whatsappUrl = `https://wa.me/221770982290?text=${encodeURIComponent(whatsappMessage)}`;

  return (
      <div className="min-h-screen px-5 sm:px-8 lg:px-12 py-10" style={{ backgroundColor: BGLIGHT }}>
        <div className="max-w-5xl mx-auto">

          {/* En-tête */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-normal text-2xl sm:text-3xl mb-1" style={{ color: TEXT_D }}>
                Mon panier
              </h1>
              <p className="text-sm" style={{ color: TEXT_M }}>
                {count} article{count > 1 ? "s" : ""}
              </p>
            </div>

            <button
                onClick={clear}
                className="text-xs font-normal px-4 py-2 rounded-full transition-all hover:opacity-70"
                style={{ border: "1px solid #D0DCE8", color: TEXT_M }}>
              Vider le panier
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-start">

            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence>
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white rounded-2xl p-4 flex items-center gap-4"
                        style={{ border: "1px solid #E0ECF8" }}
                    >

                      {/* Image */}
                      <div className="relative shrink-0 rounded-xl overflow-hidden"
                           style={{ width: 80, height: 80, backgroundColor: "#F7F9FC" }}>
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                      </div>

                      {/* Infos */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-normal leading-snug mb-1" style={{ color: TEXT_D }}>
                          {item.name}
                        </p>
                        <p className="text-sm font-normal" style={{ color: BLUE }}>
                          {fmt(item.price)}
                        </p>
                      </div>

                      {/* Quantité */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => update(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center"
                                style={{ border: "1px solid #C8DCF0", color: TEXT_M }}>
                          −
                        </button>

                        <span className="w-6 text-center text-sm" style={{ color: TEXT_D }}>
                      {item.quantity}
                    </span>

                        <button onClick={() => update(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center"
                                style={{ border: "1px solid #C8DCF0", color: TEXT_M }}>
                          +
                        </button>
                      </div>

                      {/* Sous-total */}
                      <div className="shrink-0 text-right hidden sm:block" style={{ minWidth: 90 }}>
                        <p className="text-sm" style={{ color: TEXT_D }}>
                          {fmt(item.price * item.quantity)}
                        </p>
                      </div>

                      {/* Supprimer */}
                      <button
                          onClick={() => remove(item.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{ color: "#AAB8C6" }}>
                        ✕
                      </button>

                    </motion.div>
                ))}
              </AnimatePresence>

              <div className="mt-4">
                <Link href="/boutique"
                      className="inline-flex items-center gap-2 text-sm font-normal transition-opacity hover:opacity-60"
                      style={{ color: BLUE }}>
                  ← Continuer mes achats
                </Link>
              </div>
            </div>

            {/* Récapitulatif */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 sticky top-28"
                style={{ border: "1px solid #E0ECF8" }}
            >
              <h2 className="font-normal text-base mb-5 pb-4"
                  style={{ color: TEXT_D, borderBottom: "1px solid #E0ECF8" }}>
                Récapitulatif
              </h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-xs flex-1 mr-2" style={{ color: TEXT_M }}>
                    {item.name} × {item.quantity}
                  </span>
                      <span className="text-xs" style={{ color: TEXT_D }}>
                    {fmt(item.price * item.quantity)}
                  </span>
                    </div>
                ))}
              </div>

              <div className="flex justify-between items-center py-4"
                   style={{ borderTop: "1px solid #E0ECF8", borderBottom: "1px solid #E0ECF8" }}>
                <span className="text-sm" style={{ color: TEXT_D }}>Total</span>
                <span className="text-base" style={{ color: BLUE }}>{fmt(total)}</span>
              </div>

              {/* WhatsApp Button (style inchangé) */}
              <div className="space-y-2.5 mt-5">
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full font-medium text-sm py-3 rounded-full transition-all hover:opacity-85"
                    style={{ backgroundColor: "#DCFCE7", color: "#16A34A" }}>
                  Commander via WhatsApp
                </a>
              </div>

            </motion.div>

          </div>
        </div>
      </div>
  );
}