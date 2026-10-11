"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { Field, Button, ErrorText } from "@/components/ui";

type State = { error?: string };

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, formData) => (await login(formData)) ?? {},
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field
        label="Mot de passe"
        name="password"
        type="password"
        required
        autoComplete="current-password"
      />
      <ErrorText>{state.error}</ErrorText>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Connexion…" : "SE CONNECTER"}
      </Button>
    </form>
  );
}
