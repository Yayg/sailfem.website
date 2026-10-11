import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Card } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { SetupForm } from "./SetupForm";

// Must check the live user count on every request, never a build-time snapshot.
export const dynamic = "force-dynamic";

export default async function SetupPage() {
  const existingUsers = await db.user.count();
  if (existingUsers > 0) {
    redirect("/connexion");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Logo size={64} />
          <div>
            <h1 className="font-display text-xl tracking-widest text-parchment">
              PREMIÈRE CONFIGURATION
            </h1>
            <p className="mt-2 text-sm text-parchment-dim">
              Aucun compte n&apos;existe encore. Créez le premier compte
              chef de clan pour initialiser l&apos;espace adhérent.
            </p>
          </div>
        </div>
        <Card>
          <SetupForm />
        </Card>
      </div>
    </main>
  );
}
