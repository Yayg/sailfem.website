"use client";

import { useActionState } from "react";
import { createFirstAdmin } from "./actions";
import { Field, Button, ErrorText } from "@/components/ui";

type State = { error?: string };

export function SetupForm() {
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, formData) => (await createFirstAdmin(formData)) ?? {},
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Nom" name="name" type="text" required autoComplete="name" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
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
        {pending ? "Création…" : "CRÉER LE COMPTE"}
      </Button>
    </form>
  );
}
