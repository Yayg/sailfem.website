import { Card } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export default async function ConnexionPage({
  searchParams,
}: PageProps<"/connexion">) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/membre";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Logo size={64} />
          <h1 className="font-display text-xl tracking-widest text-parchment">
            ESPACE ADHÉRENT
          </h1>
        </div>
        <Card>
          <LoginForm next={next} />
        </Card>
      </div>
    </main>
  );
}
