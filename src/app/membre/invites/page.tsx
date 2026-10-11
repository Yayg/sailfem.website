import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { ROLES } from "@/lib/roles";
import { Card } from "@/components/ui";
import { CreateInviteForm } from "./CreateInviteForm";
import { InviteLink } from "./InviteLink";
import { RevokeButton } from "./RevokeButton";

export default async function InvitesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion");
  if (!user.roles.includes(ROLES.CHEF_DE_CLAN)) redirect("/membre");

  const [roles, invites] = await Promise.all([
    db.role.findMany({ orderBy: { label: "asc" } }),
    db.invite.findMany({
      orderBy: { createdAt: "desc" },
      include: { role: true },
    }),
  ]);

  const pending = invites.filter((i) => !i.usedAt && i.expiresAt > new Date());
  const expired = invites.filter((i) => !i.usedAt && i.expiresAt <= new Date());
  const used = invites.filter((i) => i.usedAt);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl tracking-widest text-gold">INVITATIONS</h1>
        <p className="mt-2 text-sm text-parchment-dim">
          Les comptes ne peuvent être créés que sur invitation. Générez un
          lien et partagez-le directement avec la personne concernée.
        </p>
      </div>

      <Card>
        <CreateInviteForm roles={roles} />
      </Card>

      <div>
        <h2 className="font-display text-sm tracking-widest text-gold">EN ATTENTE</h2>
        {pending.length === 0 ? (
          <p className="mt-3 text-sm text-parchment-dim">Aucune invitation en attente.</p>
        ) : (
          <ul className="mt-3 divide-y divide-gold/10 border-y border-gold/10">
            {pending.map((invite) => (
              <li key={invite.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-parchment">{invite.email}</p>
                  <p className="text-xs text-parchment-dim">
                    {invite.role.label} · expire le{" "}
                    {invite.expiresAt.toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <InviteLink token={invite.token} />
                  <RevokeButton id={invite.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {expired.length > 0 && (
        <div>
          <h2 className="font-display text-sm tracking-widest text-gold">EXPIRÉES</h2>
          <ul className="mt-3 divide-y divide-gold/10 border-y border-gold/10">
            {expired.map((invite) => (
              <li key={invite.id} className="flex items-center justify-between gap-4 py-3">
                <p className="text-parchment-dim">{invite.email}</p>
                <RevokeButton id={invite.id} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {used.length > 0 && (
        <div>
          <h2 className="font-display text-sm tracking-widest text-gold">UTILISÉES</h2>
          <ul className="mt-3 divide-y divide-gold/10 border-y border-gold/10">
            {used.map((invite) => (
              <li key={invite.id} className="py-3 text-parchment-dim">
                {invite.email} · rejoint le {invite.usedAt?.toLocaleDateString("fr-FR")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
