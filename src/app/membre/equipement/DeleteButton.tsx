"use client";

import { deleteEquipment } from "./actions";

export function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deleteEquipment}
      onSubmit={(e) => {
        if (!confirm("Supprimer cet objet ?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-xs text-parchment-dim hover:text-crimson-light">
        Supprimer
      </button>
    </form>
  );
}
