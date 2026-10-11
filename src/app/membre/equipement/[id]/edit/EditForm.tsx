"use client";

import { useActionState } from "react";
import { Field, Select, Button, ErrorText } from "@/components/ui";
import { EQUIPMENT_CATEGORIES } from "@/lib/equipment-categories";

type State = { error?: string };
type Item = { id: string; name: string; category: string; description: string | null };

export function EditForm({
  item,
  action,
}: {
  item: Item;
  action: (id: string, formData: FormData) => Promise<State | undefined>;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, formData) => (await action(item.id, formData)) ?? {},
    {}
  );

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Objet" name="name" type="text" required defaultValue={item.name} />
      <Select label="Catégorie" name="category" required defaultValue={item.category}>
        {EQUIPMENT_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
      <Field
        label="Détails (optionnel)"
        name="description"
        type="text"
        defaultValue={item.description ?? ""}
      />
      <ErrorText>{state.error}</ErrorText>
      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : "ENREGISTRER"}
      </Button>
    </form>
  );
}
