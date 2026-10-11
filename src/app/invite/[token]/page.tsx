import { db } from "@/lib/db";
import { Card } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { AcceptForm } from "./AcceptForm";

export default async function InvitePage({
  params,
}: PageProps<"/invite/[token]">) {
  const { token } = await params;
  const invite = await db.invite.findUnique({
    where: { token },
    include: { role: true },
  });

  const isValid = invite && !invite.usedAt && invite.expiresAt > new Date();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Logo size={64} />
          <div>
            <h1 className="font-display text-xl tracking-widest text-parchment">
              REJOINDRE SAIL-FEM
            </h1>
            {isValid && (
              <p className="mt-2 text-sm text-parchment-dim">
                Vous avez été invité·e en tant que{" "}
                <span className="text-gold">{invite.role.label}</span>.
              </p>
            )}
          </div>
        </div>
        <Card>
          {isValid ? (
            <AcceptForm token={token} email={invite.email} />
          ) : (
            <p className="text-sm text-parchment-dim">
              Cette invitation est invalide, expirée, ou a déjà été utilisée.
              Contactez un chef de clan pour en recevoir une nouvelle.
            </p>
          )}
        </Card>
      </div>
    </main>
  );
}
