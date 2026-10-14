import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { Logo } from "@/components/Logo";
import { hasElevatedAccess } from "@/lib/roles";
import { logout } from "./actions";

export default async function MembreLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/connexion");
  }

  const isChefDeClan = hasElevatedAccess(user.roles);

  return (
    <div className="min-h-screen bg-ink text-parchment">
      <header className="border-b border-gold/20 bg-ink-light">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/membre" className="flex items-center gap-3">
            <Logo size={32} />
            <span className="font-display text-sm tracking-widest text-parchment">
              ESPACE ADHÉRENT
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm tracking-wide text-parchment-dim">
            <Link href="/membre" className="transition-colors hover:text-gold">
              Tableau de bord
            </Link>
            <Link href="/membre/equipement" className="transition-colors hover:text-gold">
              Mon équipement
            </Link>
            {isChefDeClan && (
              <Link href="/membre/invites" className="transition-colors hover:text-gold">
                Invitations
              </Link>
            )}
            <span className="hidden text-parchment-dim/60 sm:inline">{user.name}</span>
            <form action={logout}>
              <button type="submit" className="transition-colors hover:text-crimson-light">
                Déconnexion
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
