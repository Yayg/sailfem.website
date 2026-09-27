import Link from "next/link";

const navLinks = [
  { href: "#qui-sommes-nous", label: "Qui sommes-nous" },
  { href: "#entrainements", label: "Entraînements" },
  { href: "#prestations", label: "Prestations" },
  { href: "#rejoindre", label: "Nous rejoindre" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-widest text-parchment">
          SAIL-FEM
        </Link>
        <nav className="hidden gap-8 text-sm tracking-wide text-parchment-dim md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-gold">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#rejoindre"
          className="rounded-sm border border-gold px-4 py-2 text-xs tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          NOUS CONTACTER
        </a>
      </div>
    </header>
  );
}
