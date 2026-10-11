"use client";

import { useActionState } from "react";
import { acceptInvite } from "./actions";
import { Field, Button, ErrorText } from "@/components/ui";

type State = { error?: string };

export function AcceptForm({ token, email }: { token: string; email: string }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, formData) => (await acceptInvite(token, formData)) ?? {},
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Email" type="email" value={email} disabled readOnly />
      <Field label="Nom" name="name" type="text" required autoComplete="name" />
      <Field
        label="Mot de passe"
        name="password"
        type="password"
        required
        minLength={8}
        autoComplete="new-password"
      />
      <ErrorText>{state.error}</ErrorText>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Création…" : "REJOINDRE SAIL-FEM"}
      </Button>
    </form>
  );
}
