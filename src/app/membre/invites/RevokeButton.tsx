"use client";

import { revokeInvite } from "./actions";

export function RevokeButton({ id }: { id: string }) {
  return (
    <form
      action={revokeInvite}
      onSubmit={(e) => {
        if (!confirm("Révoquer cette invitation ?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-xs text-parchment-dim hover:text-crimson-light">
        Révoquer
      </button>
    </form>
  );
}
