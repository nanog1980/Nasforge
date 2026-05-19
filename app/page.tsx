import Link from "next/link";
import { getSectionPages } from "@/lib/content";

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

const Logo = () => (
  <Link href="/" className="nf-logo">
    <span className="nf-logo-mark">
      <ForgeLogo />
    </span>
    Nas<span>forge</span>
  </Link>
);

const MATERIEL_TAG_LABEL: Record<string, string> = {
  processeur: "CPU",
  "carte-mere": "Carte mère",
  alimentation: "Alimentation",
  "memoire-vive": "RAM",
  boitier: "Boîtier",
  "disques-durs": "HDD",
  "disques-nvme": "NVMe",
};

const LOGICIEL_TAG_LABEL: Record<string, string> = {
  "pourquoi-truenas": "OS",
  "installation-truenas": "OS",
  "datasets-et-vdevs": "ZFS",
  applications: "Apps",
};

export default function HomePage() {
  const materiel = getSectionPages("partie-materielle");
  const logiciel = getSectionPages("partie-logicielle");

  return (
    <>
      <header className="nf-header">
        <div className="nf-header-inner">
          <Logo />
          <nav className="nf-nav">
            <Link href="/partie-materielle">Matériel</Link>
            <Link href="/partie-logicielle">Logiciel</Link>
            <Link href="/contact">Contact</Link>
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

      <section className="nf-hero">
        <div>
          <span className="nf-hero-eyebrow">
            Build journal · TrueNAS Scale
          </span>
          <h1>
            Forge ton propre <em>NAS</em>, pièce par pièce.
          </h1>
          <p className="lead">
            Tutoriels concrets pour construire un NAS de zéro : sélection des
            composants, assemblage, install TrueNAS Scale, partages, sauvegarde,
            monitoring. Sans bullshit, captures à l&apos;appui.
          </p>
          <div className="nf-hero-cta">
            <Link href="/partie-materielle" className="nf-btn-primary">
              Commencer par le matériel →
            </Link>
            <Link href="/partie-logicielle" className="nf-btn-ghost">
              Voir TrueNAS Scale
            </Link>
          </div>
        </div>
        <div className="nf-hero-visual">
          <div className="nf-terminal-header">
            <span className="nf-term-dot r" />
            <span className="nf-term-dot y" />
            <span className="nf-term-dot g" />
            <span className="nf-term-title">truenas@forge:~$</span>
          </div>
          <div className="nf-terminal-body">
            <div>
              <span className="nf-term-prompt">$</span>{" "}
              <span className="nf-term-cmd">zpool status tank</span>
            </div>
            <div className="nf-term-out">
              {"  "}pool: <span className="nf-term-hl">tank</span>
            </div>
            <div className="nf-term-out">
              {" "}state: <span className="nf-term-ok">ONLINE</span>
            </div>
            <div className="nf-term-out">
              {"  "}scan: scrub repaired 0B in 02:14:33
            </div>
            <div className="nf-term-out">&nbsp;</div>
            <div className="nf-term-out">config:</div>
            <div className="nf-term-out">
              {"  "}NAME{"           "}STATE{"   "}READ WRITE
            </div>
            <div className="nf-term-out">
              {"  "}tank{"           "}ONLINE{"     "}0{"     "}0
            </div>
            <div className="nf-term-out">
              {"    "}raidz2-0{"     "}ONLINE{"     "}0{"     "}0
            </div>
            <div className="nf-term-out">
              {"      "}<span className="nf-term-hl">sda</span>
              {"        "}ONLINE{"     "}0{"     "}0
            </div>
            <div className="nf-term-out">
              {"      "}<span className="nf-term-hl">sdb</span>
              {"        "}ONLINE{"     "}0{"     "}0
            </div>
            <div className="nf-term-out">
              {"      "}<span className="nf-term-hl">sdc</span>
              {"        "}ONLINE{"     "}0{"     "}0
            </div>
            <div className="nf-term-out">
              {"      "}<span className="nf-term-hl">sdd</span>
              {"        "}ONLINE{"     "}0{"     "}0
            </div>
            <div className="nf-term-out">&nbsp;</div>
            <div className="nf-term-comment">
              # 4 disques en RAIDZ2 — 2 disques de tolérance
            </div>
          </div>
        </div>
      </section>

      <section id="materiel" className="nf-section">
        <div className="nf-section-inner">
          <div className="nf-section-header">
            <div className="nf-section-eyebrow">// partie matérielle</div>
            <h2 className="nf-section-title">
              Choisir et assembler le hardware.
            </h2>
            <p className="nf-section-desc">
              Chaque pièce du NAS, décortiquée : pourquoi tel composant, quels
              compromis, quel modèle j&apos;ai retenu. Comparatifs et liens
              d&apos;achat à l&apos;appui.
            </p>
          </div>
          <div className="nf-tut-grid">
            <Link href="/conception-nas" className="nf-tut-card">
              <span className="nf-tut-tag hardware">Concept</span>
              <h3>Conception du NAS</h3>
              <p>
                Définir ses objectifs, contraintes et choix de plateforme avant
                d&apos;acheter quoi que ce soit.
              </p>
              <div className="nf-tut-meta">
                <span>Préparation</span>
                <span>Lire →</span>
              </div>
            </Link>
            {materiel.map((p) => (
              <Link
                key={p.meta.slug}
                href={`/partie-materielle/${p.meta.slug}`}
                className="nf-tut-card"
              >
                <span className="nf-tut-tag hardware">
                  {MATERIEL_TAG_LABEL[p.meta.slug] ?? "Hardware"}
                </span>
                <h3>{p.meta.title}</h3>
                <p>{p.meta.description}</p>
                <div className="nf-tut-meta">
                  <span>Matériel</span>
                  <span>Lire →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="logiciel" className="nf-section nf-section-elevated">
        <div className="nf-section-inner">
          <div className="nf-section-header">
            <div className="nf-section-eyebrow">// partie logicielle</div>
            <h2 className="nf-section-title">
              Installer et configurer TrueNAS Scale.
            </h2>
            <p className="nf-section-desc">
              Du choix de l&apos;OS aux datasets ZFS en passant par les
              applications Kubernetes. Étape par étape, avec captures.
            </p>
          </div>
          <div className="nf-tut-grid">
            {logiciel.map((p) => (
              <Link
                key={p.meta.slug}
                href={`/partie-logicielle/${p.meta.slug}`}
                className="nf-tut-card"
              >
                <span className="nf-tut-tag os">
                  {LOGICIEL_TAG_LABEL[p.meta.slug] ?? "Software"}
                </span>
                <h3>{p.meta.title}</h3>
                <p>{p.meta.description}</p>
                <div className="nf-tut-meta">
                  <span>Logiciel</span>
                  <span>Lire →</span>
                </div>
              </Link>
            ))}
            <Link href="/zfs-et-tunnel-vpn" className="nf-tut-card">
              <span className="nf-tut-tag security">Réseau</span>
              <h3>ZFS et tunnel VPN</h3>
              <p>
                Accéder à son NAS à distance en toute sécurité, sauvegarde ZFS
                via tunnel chiffré.
              </p>
              <div className="nf-tut-meta">
                <span>Sécurité</span>
                <span>Lire →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <footer className="nf-footer">
        <div className="nf-footer-inner">
          <div>
            <Logo />
            <p className="nf-footer-brand">
              Construire son NAS de zéro, sans approximations. Self-hosted,
              tutoriels reproductibles, hardware testé.
            </p>
          </div>
          <div className="nf-footer-col">
            <h4>Matériel</h4>
            <Link href="/conception-nas">Conception du NAS</Link>
            {materiel.map((p) => (
              <Link
                key={p.meta.slug}
                href={`/partie-materielle/${p.meta.slug}`}
              >
                {p.meta.title}
              </Link>
            ))}
          </div>
          <div className="nf-footer-col">
            <h4>Logiciel</h4>
            {logiciel.map((p) => (
              <Link
                key={p.meta.slug}
                href={`/partie-logicielle/${p.meta.slug}`}
              >
                {p.meta.title}
              </Link>
            ))}
            <Link href="/zfs-et-tunnel-vpn">ZFS et tunnel VPN</Link>
          </div>
          <div className="nf-footer-col">
            <h4>Contact</h4>
            <Link href="/contact">M&apos;écrire</Link>
            <a
              href="https://github.com/nanog1980/Nasforge"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub (repo)
            </a>
            <a
              href="https://github.com/nanog1980"
              target="_blank"
              rel="noopener noreferrer"
            >
              Profil GitHub
            </a>
          </div>
        </div>
        <div className="nf-footer-bottom">
          <span>© 2026 Nasforge · Self-hosted</span>
          <span>Code source ouvert · MIT</span>
        </div>
      </footer>
    </>
  );
}
