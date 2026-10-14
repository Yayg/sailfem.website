"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { WarriorFigure } from "@/components/WarriorFigure";
import { EQUIPMENT_SLOTS, SLOT_POSITIONS, SLOT_LABELS, type SlotSlug } from "@/lib/equipment-slots";
import { equipItem, unequipItem } from "../actions";

export type MannequinItem = {
  id: string;
  name: string;
  category: string;
  slot: string | null;
  isClanItem: boolean;
};

export function Mannequin({
  equipped,
  myInventory,
  clanInventory,
}: {
  equipped: Record<string, MannequinItem | undefined>;
  myInventory: MannequinItem[];
  clanInventory: MannequinItem[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function doEquip(id: string) {
    setError(null);
    const fd = new FormData();
    fd.set("id", id);
    startTransition(async () => {
      const result = await equipItem(fd);
      if (result?.error) setError(result.error);
      router.refresh();
    });
  }

  function doUnequip(id: string) {
    setError(null);
    const fd = new FormData();
    fd.set("id", id);
    startTransition(async () => {
      await unequipItem(fd);
      router.refresh();
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(260px,360px)_1fr]">
      {/* personal inventory */}
      <InventoryPanel
        title="MON INVENTAIRE"
        items={myInventory}
        onActivate={doEquip}
        disabled={isPending}
        emptyText="Rien de disponible à équiper."
      />

      {/* the figure */}
      <div className="relative mx-auto w-full max-w-xs text-parchment-dim">
        <WarriorFigure className="w-full" />
        {EQUIPMENT_SLOTS.map((s) => {
          const item = equipped[s.slug];
          const pos = SLOT_POSITIONS[s.slug as SlotSlug];
          const isOver = dragOverSlot === s.slug;
          return (
            <button
              key={s.slug}
              type="button"
              disabled={isPending}
              onClick={() => item && doUnequip(item.id)}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverSlot(s.slug);
              }}
              onDragLeave={() => setDragOverSlot((cur) => (cur === s.slug ? null : cur))}
              onDrop={(e) => {
                e.preventDefault();
                setDragOverSlot(null);
                const id = e.dataTransfer.getData("text/plain");
                if (id) doEquip(id);
              }}
              draggable={Boolean(item)}
              onDragStart={(e) => item && e.dataTransfer.setData("text/plain", item.id)}
              title={item ? `${item.name} — cliquer pour retirer` : `${s.label} (vide)`}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[10px] tracking-wide transition-colors ${
                item
                  ? "h-14 w-14 border-gold bg-ink-light text-parchment"
                  : "h-12 w-12 border-dashed border-gold/40 text-parchment-dim/60"
              } ${isOver ? "border-gold bg-gold/20" : ""}`}
              style={{ left: pos.left, top: pos.top }}
            >
              {item ? (
                <span className="px-1 text-center leading-tight">{item.name}</span>
              ) : (
                <span>{s.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* clan inventory */}
      <InventoryPanel
        title="INVENTAIRE DU CLAN"
        items={clanInventory}
        onActivate={doEquip}
        disabled={isPending}
        emptyText="Rien de disponible à emprunter."
      />

      {error && (
        <p className="lg:col-span-3 rounded-sm border border-crimson/40 bg-crimson/10 px-3 py-2 text-sm text-crimson-light">
          {error}
        </p>
      )}
    </div>
  );
}

function InventoryPanel({
  title,
  items,
  onActivate,
  disabled,
  emptyText,
}: {
  title: string;
  items: MannequinItem[];
  onActivate: (id: string) => void;
  disabled: boolean;
  emptyText: string;
}) {
  return (
    <div>
      <h2 className="font-display text-sm tracking-widest text-gold">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-parchment-dim">{emptyText}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", item.id)}
              onClick={() => !disabled && onActivate(item.id)}
              className="cursor-grab rounded-sm border border-gold/20 bg-ink-light px-3 py-2 text-sm text-parchment transition-colors hover:border-gold/50 active:cursor-grabbing"
            >
              <span>{item.name}</span>
              <span className="ml-2 text-[10px] tracking-wide text-parchment-dim">
                {SLOT_LABELS[item.slot ?? ""] ?? item.slot}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
