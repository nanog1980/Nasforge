import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Page } from "@/lib/content";

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

const SECTION_LABELS: Record<string, string> = {
  "partie-materielle": "Partie matérielle",
  "partie-logicielle": "Partie logicielle",
};

export function ArticleLayout({
  page,
  related,
}: {
  page: Page;
  related?: { title: string; href: string }[];
}) {
  const sectionLabel = page.meta.section ? SECTION_LABELS[page.meta.section] : null;
  const sectionHref = page.meta.section ? `/${page.meta.section}` : null;

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
          {sectionLabel && sectionHref && (
            <>
              <span> / </span>
              <Link href={sectionHref}>{sectionLabel}</Link>
            </>
          )}
          <span> / </span>
          <span className="nf-breadcrumb-current">{page.meta.title}</span>
        </nav>

        <article className="nf-article">
          <header className="nf-article-header">
            {sectionLabel && (
              <span className="nf-article-eyebrow">{sectionLabel}</span>
            )}
            <h1 className="nf-article-title">{page.meta.title}</h1>
            {page.meta.description && (
              <p className="nf-article-lead">{page.meta.description}</p>
            )}
          </header>

          <div className="nf-article-body">
            <MDXRemote
              source={page.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>
        </article>

        {related && related.length > 0 && (
          <aside className="nf-related">
            <div className="nf-related-label">
              {sectionLabel ? `Aussi dans ${sectionLabel}` : "Autres articles"}
            </div>
            <ul className="nf-related-list">
              {related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href}>{r.title} →</Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
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
