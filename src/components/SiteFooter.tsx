import { Logo } from "./Logo";
import { CONTACT_URL } from "@/lib/links";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/20 bg-ink-light">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 text-center">
        <Logo size={56} />
        <p className="font-display text-lg tracking-widest text-parchment">SAIL-FEM</p>
        <p className="max-w-md text-sm text-parchment-dim">
          Capitainerie de Paris de la fédération{" "}
          <a
            href="https://einherjar-elag.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            Einherjar Elag
          </a>
          , association de reconstitution historique Viking.
        </p>
        <div className="flex gap-6 text-sm tracking-wide text-parchment-dim">
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            Facebook
          </a>
        </div>
        <p className="text-xs text-parchment-dim/70">
          © {new Date().getFullYear()} Sail-Fem
        </p>
      </div>
    </footer>
  );
}
