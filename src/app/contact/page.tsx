"use client";

import { motion } from "framer-motion";

const BLUE = "#1E72B8";

export default function ContactPage() {
  return (
      <main className="w-full min-w-0 overflow-x-hidden">
        <section className="w-full min-w-0" style={{ backgroundColor: "#F5F9FD" }}>
          <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
            {/* En-tête de section principal */}
            <motion.div className="mx-auto mb-16 flex w-full max-w-3xl min-w-0 flex-col items-center px-2 text-center"
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55 }}>
              <p className="mb-3 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em]" style={{ color: BLUE }}>
                SOTILMA
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                Une plateforme intelligente pour automatiser, surveiller et optimiser vos systèmes d’irrigation et équipements agricoles en temps réel.
              </p>
              <div className="mx-auto mt-6" style={{ width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4 }} />
            </motion.div>
            {/* Service 1 : Sotilma Cloud */}
            <motion.div className="mx-auto mb-20 flex w-full max-w-3xl min-w-0 flex-col items-center px-2 text-center"
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55 }}>

              <h3 className="text-3xl font-bold text-slate-900">
                Sotilma Cloud
              </h3>
              <p className="mt-4 text-base leading-8 text-gray-600">
                Sotilma Cloud est un service de vidéosurveillance intelligente de nouvelle génération sans achat de matériel. Suivez votre exploitation en temps réel, simplement et de manière sécurisée directement depuis votre téléphone portable.
              </p>
              <div className="mt-8 grid gap-4 w-full md:grid-cols-2">
                {/* Offre Matériel & Service */}
                <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 text-left">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    Avantages Matériel
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li>✓ Caméra, accessoires et poteau gratuits</li>
                    <li>✓ Frais d'installation gratuits</li>
                    <li>✓ Internet gratuit et illimité</li>
                    <li>✓ Sans investissement lourd</li>
                  </ul>
                </div>
                {/* Caractéristiques Techniques */}
                <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 text-left">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    Technologie
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li>✓ Accès facile depuis votre téléphone</li>
                    <li>✓ Suivi en temps réel et pratique</li>
                    <li>✓ Données et images sécurisées</li>
                    <li>✓ Surveillance fiable 24h/24 et 7j/7</li>
                  </ul>
                </div>
              </div>
              <div className="mx-auto mt-6" style={{ width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4 }} />
            </motion.div>

            {/* Service 2 : Abonel - Pompe */}
            <motion.div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col items-center px-2 text-center"
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55 }}>

              <h3 className="text-3xl font-bold text-slate-900">
                Abonel - Pompe
              </h3>

              <p className="mt-4 text-base leading-8 text-gray-600">
                Louez une pompe de surface Sotilma-Mobile, une solution de pompage solaire hybride destinée aux exploitations agricoles. Elle permet d'alimenter efficacement les systèmes d'irrigation à partir de bassins ou de lacs tout en réduisant la dépendance aux sources d'énergie traditionnelles. Disponible sur la Zone des Niayes.
              </p>

              <div className="mt-8 grid gap-4 w-full md:grid-cols-2">
                {/* Équipements inclus */}
                <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 text-left">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    Équipements inclus
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li>✓ Pompe surface solaire</li>
                    <li>✓ Kit complet solaire (panneaux)</li>
                    <li>✓ Contrôleur pompe</li>
                    <li>✓ Caméra agricole</li>
                    <li>✓ Solution mobile sur roues</li>
                  </ul>
                </div>

                {/* Performances Techniques */}
                <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 text-left">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    Performances
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li>✓ Puissance solaire : 2000 W</li>
                    <li>✓ Débit maximum : 45 m³/h</li>
                    <li>✓ Hybride AC/DC</li>
                    <li>✓ Pour surfaces de 2 à 3 HA</li>
                    <li>✓ Idéal bassin ou lac</li>
                  </ul>
                </div>
              </div>
              <div className="mx-auto mt-6" style={{ width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4 }} />
            </motion.div>

          </div>
        </section>
      </main>
  );
}
