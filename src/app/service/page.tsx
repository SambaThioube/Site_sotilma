import type { Metadata } from "next";
import Service from "@/app/service/Service";

export const metadata: Metadata = {
  title: "Service",
  description:
      "Découvrez l'histoire de Sotilma, start-up sénégalaise dédiée à la gestion intelligente de l'eau.",
};

export default function Page() {
  return <Service />;
}