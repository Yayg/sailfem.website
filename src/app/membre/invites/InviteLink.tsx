"use client";

import { useState } from "react";

export function InviteLink({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}/invite/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable, user can still select the text manually
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="text-xs text-gold hover:underline"
      title={typeof window !== "undefined" ? `${window.location.origin}/invite/${token}` : undefined}
    >
      {copied ? "Lien copié !" : "Copier le lien d'invitation"}
    </button>
  );
}
