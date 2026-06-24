
"use client";
import {motion} from "framer-motion";
import {Reveal} from "@/components/ui/Reveal";
import {domainesExpertise} from "@/lib/data";
import Image from "next/image";

const BLUE = "#1E72B8";
const TEXT_D = "#0D2235";
const TEXT_M = "#4A6278";
const LIGHT  = "#F5F9FD";
const features = [
    {
        icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.71.71m13.66 13.66.71.71M3 12H2m20 0h-1M4.22 19.78l.71-.71M18.36 5.64l.71-.71"/><circle cx="12" cy="12" r="4"/></svg>),
        title: "Énergie solaire",
        desc: "Alimentation 100 % solaire, aucune facture d'électricité.",
    },
    {
        icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/></svg>),
        title: "Contrôle à distance",
        desc: "Pilotage via smartphone, partout, même sans internet.",
    },
    {
        icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>),
        title: "Fiabilité industrielle",
        desc: "Certifié IP67, résistant aux conditions extrêmes.",
    },
    {
        icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>),
        title: "Données en temps réel",
        desc: "Monitoring et alertes instantanées sur vos installations.",
    },
];
export default function Service() {
    return (
        <main className="w-full min-w-0 overflow-x-hidden">
            {/* ── HERO ── */}
            <section className="relative" style={{ backgroundColor: LIGHT }}>
                <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
                    <div className="grid lg:grid-cols-2 gap-6 items-center">

                        <Reveal from="left">
                            <h1 className="font-normal leading-tight mb-4" style={{
                                fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
                                color: TEXT_D,
                                letterSpacing: "-0.02em"
                            }}>

                                Des solutions expertes pour{" "}
                                <span style={{ color: BLUE }}>chaque défi hydraulique</span>
                            </h1>
                            <p className="text-base leading-relaxed mb-6" style={{ color: TEXT_M, lineHeight: 1.8, maxWidth: 420 }}>
                                Irrigation agricole, industrie, gestion de ferme agricole — Sotilma déploie des technologies connectées et solaires adaptées à chaque secteur.
                            </p>

                        </Reveal>

                        <Reveal from="right" delay={0.15}>
                            <div className="grid grid-cols-3 gap-4">
                                {domainesExpertise.slice(0, 3).map((d) => (
                                    <div key={d.id} className="relative overflow-hidden" style={{ aspectRatio: "3/4", borderRadius: 8 }}>
                                        <Image src={d.image} alt={d.title} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="30vw" />
                                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,34,53,0.5) 0%, transparent 60%)" }} />
                                        <span className="absolute bottom-4 left-4 right-4 text-xs font-medium text-white uppercase tracking-wider leading-tight">{d.title}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section style={{ backgroundColor: LIGHT, borderTop: "1px solid #E8EFF6", borderBottom: "1px solid #E8EFF6" }}>
                <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">

                        <Reveal from="left">
                            <h2 className="font-normal leading-tight mb-3" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.02em", color: TEXT_D }}>
                                Pourquoi choisir les solutions <span style={{ color: BLUE }}>Sotilma</span> ?
                            </h2>
                            <p className="text-base mb-0" style={{ color: TEXT_M, lineHeight: 1.8 }}>
                                Une technologie accessible, durable et pilotable depuis votre téléphone.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-2 gap-3">
                            {features.map((f, i) => (
                                <Reveal key={f.title} delay={i * 0.1}>
                                    <div className="p-4 bg-white h-full" style={{ border: "1px solid #E8EFF6", borderRadius: 6 }}>
                                        <div className="mb-3" style={{ color: BLUE }}>{f.icon}</div>
                                        <p className="font-medium text-sm mb-1" style={{ color: TEXT_D }}>{f.title}</p>
                                        <p className="text-sm" style={{ color: TEXT_M, lineHeight: 1.6 }}>{f.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            <section className="w-full min-w-0" style={{ backgroundColor: "#F5F9FD" }}>
                <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
                    {/* En-tête de section principal */}
                    <motion.div className="mx-auto mb-16 flex w-full max-w-3xl min-w-0 flex-col items-center px-2 text-center"
                                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55 }}>
                        <p className="mb-3 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em]" style={{ color: BLUE }}>
                            SOTILMA SERVICE
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

                        <h3 className="text-5xl font-bold text-slate-900">
                            Sotilma Cloud
                        </h3>
                        <p className="mt-4 text-base leading-8 text-gray-600">
                            Sotilma Cloud est un service de vidéosurveillance intelligente de nouvelle génération. Suivez votre exploitation en temps réel, simplement et de manière sécurisée directement depuis votre téléphone portable.
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
                        </div></motion.div>

                    {/* Service 2 : Abonel - Pompe */}
                    <motion.div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col items-center px-2 text-center"
                                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55 }}>

                        <h3 className="text-5xl font-bold text-slate-900">
                            Abonel Pompe
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
                        </div> </motion.div>

                </div>
            </section>
        </main>
    );
}