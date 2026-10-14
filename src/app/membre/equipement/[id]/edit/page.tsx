import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { Card } from "@/components/ui";
import { hasElevatedAccess } from "@/lib/roles";
import { updateEquipment } from "../../actions";
import { EditForm } from "./EditForm";

export default async function EditEquipmentPage({
  params,
}: PageProps<"/membre/equipement/[id]/edit">) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) notFound();

  const elevated = hasElevatedAccess(user.roles);
  const item = await db.equipment.findFirst({
    where: elevated ? { id, OR: [{ ownerId: user.id }, { ownerId: null }] } : { id, ownerId: user.id },
  });

  if (!item) notFound();

  return (
    <div className="max-w-md space-y-6">
      <h1 className="font-display text-2xl tracking-widest text-gold">MODIFIER L&apos;OBJET</h1>
      <Card>
        <EditForm item={item} action={updateEquipment} />
      </Card>
    </div>
  );
}
