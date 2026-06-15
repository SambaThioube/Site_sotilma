"use client";

import { motion } from "framer-motion";

const BLUE   = "#1E72B8";

export default function ContactPage() {

  return (
    <main className="w-full min-w-0 overflow-x-hidden">
      <section className="w-full min-w-0" style={{ backgroundColor: "#F5F9FD" }}>
        <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          {/* En-tête de section */}
          <motion.div className="mx-auto mb-12 flex w-full max-w-3xl min-w-0 flex-col items-center px-2 text-center"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55 }}>
            <p className="mb-3 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em]" style={{ color: BLUE }}>
              SOTILMA
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
              Une plateforme intelligente pour automatiser, surveiller et optimiser vos systèmes d’irrigation et équipements agricoles en temps réel.
            </p>
            <div className="mx-auto mt-6" style={{ width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4 }} />
          </motion.div>
        </div>
      </section>

      <section className="w-full min-w-0" style={{ backgroundColor: "#F5F9FD" }}>
        <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <motion.div className="mx-auto mb-12 flex w-full max-w-3xl min-w-0 flex-col items-center px-2 text-center"
                      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55 }}>

            <h3 className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
              Sotilma Cloud
            </h3>
            <p>
              ok
            </p>
            <div className="mx-auto mt-6" style={{ width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4 }} />
          </motion.div>
        </div>

        <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <motion.div className="mx-auto mb-12 flex w-full max-w-3xl min-w-0 flex-col items-center px-2 text-center"
                      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55 }}>

            <h3 className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
              Sotilma Cloud
            </h3>
            <p>
              ok
            </p>
            <div className="mx-auto mt-6" style={{ width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4 }} />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
