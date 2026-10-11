import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { Card } from "@/components/ui";
import { AddEquipmentForm } from "./AddEquipmentForm";
import { DeleteButton } from "./DeleteButton";

export default async function EquipementPage() {
  const user = await getCurrentUser();
  const items = user
    ? await db.equipment.findMany({
        where: { userId: user.id },
        orderBy: [{ category: "asc" }, { name: "asc" }],
      })
    : [];

  const byCategory = new Map<string, typeof items>();
  for (const item of items) {
    const list = byCategory.get(item.category) ?? [];
    list.push(item);
    byCategory.set(item.category, list);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl tracking-widest text-gold">MON ÉQUIPEMENT</h1>
        <p className="mt-2 text-sm text-parchment-dim">
          La liste de votre équipement personnel, visible par les organisateurs
          de raid pour préparer le matériel manquant.
        </p>
      </div>

      <Card>
        <AddEquipmentForm />
      </Card>

      {items.length === 0 ? (
        <p className="text-sm text-parchment-dim">Aucun objet enregistré pour l&apos;instant.</p>
      ) : (
        <div className="space-y-6">
          {[...byCategory.entries()].map(([category, categoryItems]) => (
            <div key={category}>
              <h2 className="font-display text-sm tracking-widest text-gold">
                {category.toUpperCase()}
              </h2>
              <ul className="mt-3 divide-y divide-gold/10 border-y border-gold/10">
                {categoryItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="text-parchment">{item.name}</p>
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
      )}
    </div>
  );
}
