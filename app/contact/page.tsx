import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

const ForgeLogo = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0a0d12"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2 L4 7 L4 17 L12 22 L20 17 L20 7 Z" />
    <path d="M12 7 L12 17" />
    <path d="M8 9 L16 9" />
    <path d="M8 13 L16 13" />
  </svg>
);

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Me contacter au sujet du projet Nasforge : question hardware, retour sur un tutoriel, suggestion de sujet.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Nasforge",
    description:
      "Me contacter au sujet du projet Nasforge : question hardware, retour sur un tutoriel, suggestion.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact · Nasforge",
    description:
      "Me contacter au sujet du projet Nasforge : question hardware, retour sur un tutoriel, suggestion.",
  },
};

export default function ContactPage() {
  return (
    <div className="nf-article-page">
      <header className="nf-header">
        <div className="nf-header-inner">
          <Link href="/" className="nf-logo">
            <span className="nf-logo-mark">
              <ForgeLogo />
            </span>
            Nas<span>forge</span>
          </Link>
          <nav className="nf-nav">
            <Link href="/partie-materielle" className="nf-nav-link">
              Matériel
            </Link>
            <Link href="/partie-logicielle" className="nf-nav-link">
              Logiciel
            </Link>
            <Link href="/contact" className="nf-nav-link">
              Contact
            </Link>
            <a
              href="https://github.com/nanog1980/Nasforge"
              className="nf-nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub →
            </a>
          </nav>
        </div>
      </header>

      <main className="nf-article-main">
        <nav className="nf-breadcrumb">
          <Link href="/">Accueil</Link>
          <span> / </span>
          <span className="nf-breadcrumb-current">Contact</span>
        </nav>

        <article className="nf-article">
          <header className="nf-article-header">
            <span className="nf-article-eyebrow">Contact</span>
            <h1 className="nf-article-title">Une question, une suggestion ?</h1>
            <p className="nf-article-lead">
              Envoie-moi un message — questions sur le hardware, retours sur un
              tuto, suggestions de sujet, signalement d&apos;erreur… tout est
              bienvenu. Je réponds à tout.
            </p>
          </header>

          <div className="nf-article-body">
            <ContactForm />
          </div>
        </article>
      </main>

      <footer className="nf-footer">
        <div className="nf-footer-bottom" style={{ marginTop: 0 }}>
          <span>© 2026 Nasforge · Self-hosted</span>
          <span>Code source ouvert · MIT</span>
        </div>
      </footer>
    </div>
  );
}
