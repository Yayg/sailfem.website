"use client";

import { useActionState, useRef } from "react";
import { createEquipment } from "./actions";
import { Field, Select, Button, ErrorText } from "@/components/ui";
import { EQUIPMENT_CATEGORIES } from "@/lib/equipment-categories";
import { EQUIPMENT_SLOTS } from "@/lib/equipment-slots";

type State = { error?: string };

export function AddEquipmentForm({ canAddClanItem = false }: { canAddClanItem?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, formData) => {
      const result = (await createEquipment(formData)) ?? {};
      if (!result.error) formRef.current?.reset();
      return result;
    },
    {}
  );

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr_2fr_auto] sm:items-end">
        <Field label="Objet" name="name" type="text" required placeholder="Bouclier rond" />
        <Select label="Catégorie" name="category" required defaultValue="">
          <option value="" disabled>
            Choisir…
          </option>
          {EQUIPMENT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Select label="Emplacement (optionnel)" name="slot" defaultValue="">
          <option value="">Aucun</option>
          {EQUIPMENT_SLOTS.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.label}
            </option>
          ))}
        </Select>
        <Field label="Détails (optionnel)" name="description" type="text" placeholder="Bois de tilleul, cuir" />
        <Button type="submit" disabled={pending} className="h-fit">
          {pending ? "Ajout…" : "AJOUTER"}
        </Button>
      </div>
      {canAddClanItem && (
        <label className="flex items-center gap-2 text-sm text-parchment-dim">
          <input type="checkbox" name="isClanItem" className="accent-gold" />
          Objet appartenant au clan (pas à moi personnellement)
        </label>
      )}
      <ErrorText>{state.error}</ErrorText>
    </form>
  );
}
