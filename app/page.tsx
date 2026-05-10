import Link from "next/link";

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

export default function HomePage() {
  return (
    <div className="nf-construction">
      <header className="nf-header">
        <div className="nf-header-inner">
          <Link href="/" className="nf-logo">
            <span className="nf-logo-mark">
              <ForgeLogo />
            </span>
            Nas<span>forge</span>
          </Link>
          <nav className="nf-nav">
            <a
              href="https://github.com/nanog1980"
              className="nf-nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub →
            </a>
          </nav>
        </div>
      </header>

      <main className="nf-construction-main">
        <span className="nf-hero-eyebrow">
          <span className="nf-pulse" />
          Status: building · ETA bientôt
        </span>

        <h1 className="nf-construction-title">
          Le site est en <em>forge</em>.
        </h1>

        <p className="nf-construction-lead">
          Nasforge sera un guide complet pour construire son propre NAS — du
          choix des composants à la config TrueNAS Scale. Le contenu est en
          cours d&apos;écriture.
        </p>

        <div className="nf-construction-terminal">
          <div className="nf-terminal-header">
            <span className="nf-term-dot r" />
            <span className="nf-term-dot y" />
            <span className="nf-term-dot g" />
            <span className="nf-term-title">build@nasforge:~$</span>
          </div>
          <div className="nf-terminal-body">
            <div>
              <span className="nf-term-prompt">$</span>{" "}
              <span className="nf-term-cmd">make site</span>
            </div>
            <div className="nf-term-out">
              <span className="nf-term-ok">[✓]</span> Identité visuelle &amp;
              maquette
            </div>
            <div className="nf-term-out">
              <span className="nf-term-ok">[✓]</span> Stack Next.js + MDX
            </div>
            <div className="nf-term-out">
              <span className="nf-term-ok">[✓]</span> Domaine nasforge.fr +
              tunnel Cloudflare
            </div>
            <div className="nf-term-out">
              <span className="nf-term-hl">[…]</span> Rédaction des tutoriels{" "}
              <span className="nf-term-comment">
                (carte mère, OS, ZFS, partages, sauvegarde…)
              </span>
            </div>
            <div className="nf-term-out">
              <span className="nf-term-pending">[ ]</span> Photos du build
            </div>
            <div className="nf-term-out">
              <span className="nf-term-pending">[ ]</span> Schémas hardware
            </div>
            <div className="nf-term-out">
              <span className="nf-term-pending">[ ]</span> Mise en ligne du
              contenu
            </div>
            <div className="nf-term-out">&nbsp;</div>
            <div className="nf-term-out">
              <span className="nf-term-comment">
                # progression : 3 / 7 — reviens dans quelques jours
              </span>
            </div>
            <div>
              <span className="nf-term-prompt">$</span>{" "}
              <span className="nf-cursor">▌</span>
            </div>
          </div>
        </div>

        <p className="nf-construction-footer-text">
          En attendant, tu peux suivre l&apos;avancée sur{" "}
          <a
            href="https://github.com/nanog1980"
            target="_blank"
            rel="noopener noreferrer"
            className="nf-link"
          >
            GitHub
          </a>{" "}
          ou m&apos;écrire pour suggérer un sujet.
        </p>
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
