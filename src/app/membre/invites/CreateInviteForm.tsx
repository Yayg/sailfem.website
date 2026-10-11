"use client";

import { useActionState, useRef } from "react";
import { createInvite } from "./actions";
import { Field, Select, Button, ErrorText } from "@/components/ui";

type State = { error?: string };
type Role = { slug: string; label: string };

export function CreateInviteForm({ roles }: { roles: Role[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, formData) => {
      const result = (await createInvite(formData)) ?? {};
      if (!result.error) formRef.current?.reset();
      return result;
    },
    {}
  );

  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid gap-4 sm:grid-cols-[2fr_1fr_auto] sm:items-end"
    >
      <Field label="Email de la personne invitée" name="email" type="email" required />
      <Select label="Rôle" name="role" required defaultValue={roles[0]?.slug}>
        {roles.map((r) => (
          <option key={r.slug} value={r.slug}>
            {r.label}
          </option>
        ))}
      </Select>
      <Button type="submit" disabled={pending} className="h-fit">
        {pending ? "Création…" : "INVITER"}
      </Button>
      {state.error && (
        <div className="sm:col-span-3">
          <ErrorText>{state.error}</ErrorText>
        </div>
      )}
    </form>
  );
}
