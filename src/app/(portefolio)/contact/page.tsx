import ContactSection from "@/components/Contact/ContactSection";
import { generateMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Contact | Gilchrist - Développeur Web & Mathématicien",
  description:
    "Une question, une collaboration ou une mission freelance ? Contactez Gilchrist via le formulaire ou les réseaux sociaux.",
  slug: "contact",
  keywords: ["contact", "email", "freelance", "collaboration", "mission", "formulaire"],
});


export default function ContactPage() {
  return <ContactSection />;
}
