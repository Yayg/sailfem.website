import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { Card } from "@/components/ui";
import { hasElevatedAccess } from "@/lib/roles";
import { SLOT_LABELS } from "@/lib/equipment-slots";
import { AddEquipmentForm } from "./AddEquipmentForm";
import { DeleteButton } from "./DeleteButton";

function EquipmentList({
  items,
}: {
  items: { id: string; name: string; category: string; description: string | null; slot: string | null }[];
}) {
  const byCategory = new Map<string, typeof items>();
  for (const item of items) {
    const list = byCategory.get(item.category) ?? [];
    list.push(item);
    byCategory.set(item.category, list);
  }

  if (items.length === 0) {
    return <p className="text-sm text-parchment-dim">Aucun objet enregistré pour l&apos;instant.</p>;
  }

  return (
    <div className="space-y-6">
      {[...byCategory.entries()].map(([category, categoryItems]) => (
        <div key={category}>
          <h3 className="font-display text-sm tracking-widest text-gold">
            {category.toUpperCase()}
          </h3>
          <ul className="mt-3 divide-y divide-gold/10 border-y border-gold/10">
            {categoryItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-parchment">
                    {item.name}
                    {item.slot && (
                      <span className="ml-2 rounded-sm border border-gold/30 px-1.5 py-0.5 text-[10px] tracking-wide text-parchment-dim">
                        {SLOT_LABELS[item.slot] ?? item.slot}
                      </span>
                    )}
                  </p>
                  {item.description && (
                    <p className="text-xs text-parchment-dim">{item.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/membre/equipement/${item.id}/edit`}
                    className="text-xs text-gold hover:underline"
                  >
                    Modifier
                  </Link>
                  <DeleteButton id={item.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default async function EquipementPage() {
  const user = await getCurrentUser();
  const isChefDeClan = user ? hasElevatedAccess(user.roles) : false;

  const [myItems, clanItems] = await Promise.all([
    user
      ? db.equipment.findMany({
          where: { ownerId: user.id },
          orderBy: [{ category: "asc" }, { name: "asc" }],
        })
      : [],
    isChefDeClan
      ? db.equipment.findMany({
          where: { ownerId: null },
          orderBy: [{ category: "asc" }, { name: "asc" }],
        })
      : [],
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl tracking-widest text-gold">MON ÉQUIPEMENT</h1>
          <p className="mt-2 text-sm text-parchment-dim">
            La liste de votre équipement personnel, visible par les organisateurs
            de raid pour préparer le matériel manquant.
          </p>
        </div>
        <Link
          href="/membre/equipement/mannequin"
          className="rounded-sm border border-gold/50 px-4 py-2 text-xs tracking-widest text-gold transition-colors hover:bg-gold/10"
        >
          VOIR MON PAQUETAGE
        </Link>
      </div>

      <Card>
        <AddEquipmentForm canAddClanItem={isChefDeClan} />
      </Card>

      <EquipmentList items={myItems} />

      {isChefDeClan && (
        <div>
          <h2 className="font-display text-xl tracking-widest text-gold">
            INVENTAIRE DU CLAN
          </h2>
          <p className="mt-2 mb-4 text-sm text-parchment-dim">
            Matériel appartenant à l&apos;association, disponible à l&apos;emprunt
            pour les objets équipables.
          </p>
          <EquipmentList items={clanItems} />
        </div>
      )}
    </div>
  );
}
