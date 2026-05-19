import type { Metadata } from "next";
import { headers } from "next/headers";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const SITE_URL = "https://nasforge.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nasforge — Forge ton propre NAS",
    template: "%s · Nasforge",
  },
  description:
    "Tutoriels concrets pour construire un NAS de zéro : sélection des composants, assemblage, install TrueNAS Scale, partages SMB/NFS, sauvegarde ZFS, monitoring. Self-hosted, open source.",
  applicationName: "Nasforge",
  authors: [{ name: "nanog1980", url: "https://github.com/nanog1980" }],
  creator: "nanog1980",
  keywords: [
    "NAS",
    "TrueNAS Scale",
    "TrueNAS",
    "self-hosted",
    "auto-hébergé",
    "ZFS",
    "stockage",
    "serveur de fichiers",
    "SMB",
    "NFS",
    "sauvegarde",
    "monitoring",
    "tutoriel NAS",
    "construction NAS",
    "homelab",
    "Nasforge",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Nasforge",
    title: "Nasforge — Forge ton propre NAS",
    description:
      "Guide complet pour construire son propre NAS — du choix des composants à TrueNAS Scale. Tutos hardware, ZFS, partages, sauvegarde, monitoring.",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasforge — Forge ton propre NAS",
    description:
      "Tutos pour construire son NAS de zéro : hardware, TrueNAS Scale, ZFS, partages, sauvegarde.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await headers();
  return (
    <html lang="fr">
      <body className={`${grotesk.variable} ${inter.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
