import { getCurrentUser } from "@/lib/current-user";
import { Card } from "@/components/ui";
import { ROLE_LABELS } from "@/lib/roles";

export default async function MembreDashboard() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl tracking-widest text-gold">
          BIENVENUE, {user?.name.toUpperCase()}
        </h1>
        <p className="mt-2 flex flex-wrap gap-2">
          {user?.roles.map((role) => (
            <span
              key={role}
              className="rounded-sm border border-gold/30 px-2.5 py-1 text-xs tracking-wide text-parchment-dim"
            >
              {ROLE_LABELS[role] ?? role}
            </span>
          ))}
        </p>
      </div>
      <Card>
        <p className="text-sm text-parchment-dim">
          Depuis cet espace vous pouvez gérer votre équipement personnel. Les
          raids et expéditions arrivent dans une prochaine mise à jour.
        </p>
      </Card>
    </div>
  );
}
