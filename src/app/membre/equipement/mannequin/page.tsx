import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { EQUIPMENT_SLOTS } from "@/lib/equipment-slots";
import { Mannequin, type MannequinItem } from "./Mannequin";

export default async function MannequinPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion");

  const slotSlugs = EQUIPMENT_SLOTS.map((s) => s.slug) as string[];

  const [equippedItems, myInventory, clanInventory] = await Promise.all([
    db.equipment.findMany({
      where: { equippedByUserId: user.id, slot: { in: slotSlugs } },
    }),
    db.equipment.findMany({
      // `equippedByUserId: { not: user.id }` alone would silently exclude
      // NULL rows too (SQL's <> never matches NULL) — spell out the OR so
      // unequipped items (the common case) aren't dropped from the list.
      where: {
        ownerId: user.id,
        slot: { in: slotSlugs },
        OR: [{ equippedByUserId: null }, { equippedByUserId: { not: user.id } }],
      },
      orderBy: { name: "asc" },
    }),
    db.equipment.findMany({
      where: { ownerId: null, slot: { in: slotSlugs }, equippedByUserId: null },
      orderBy: { name: "asc" },
    }),
  ]);

  const equipped: Record<string, MannequinItem | undefined> = {};
  for (const item of equippedItems) {
    if (item.slot) {
      equipped[item.slot] = { id: item.id, name: item.name, category: item.category, slot: item.slot, isClanItem: item.ownerId === null };
    }
  }

  const toMannequinItem = (item: (typeof myInventory)[number]): MannequinItem => ({
    id: item.id,
    name: item.name,
    category: item.category,
    slot: item.slot,
    isClanItem: item.ownerId === null,
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl tracking-widest text-gold">MON PAQUETAGE</h1>
          <p className="mt-2 text-sm text-parchment-dim">
            Glissez un objet sur le mannequin pour l&apos;équiper, ou cliquez
            dessus. Cliquez un objet équipé pour le retirer.
          </p>
        </div>
        <Link
          href="/membre/equipement"
          className="rounded-sm border border-gold/50 px-4 py-2 text-xs tracking-widest text-gold transition-colors hover:bg-gold/10"
        >
          GÉRER MES OBJETS
        </Link>
      </div>

      <Mannequin
        equipped={equipped}
        myInventory={myInventory.map(toMannequinItem)}
        clanInventory={clanInventory.map(toMannequinItem)}
      />
    </div>
  );
}
