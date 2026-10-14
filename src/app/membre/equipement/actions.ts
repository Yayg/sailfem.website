"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { hasElevatedAccess } from "@/lib/roles";
import { EQUIPMENT_SLOTS } from "@/lib/equipment-slots";

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion");
  return user;
}

const SLOT_SLUGS = EQUIPMENT_SLOTS.map((s) => s.slug) as string[];

function parseSlot(raw: FormDataEntryValue | null): string | null {
  const value = String(raw ?? "").trim();
  return SLOT_SLUGS.includes(value) ? value : null;
}

export async function createEquipment(formData: FormData) {
  const user = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const slot = parseSlot(formData.get("slot"));
  const isClanItem = formData.get("isClanItem") === "on";

  if (!name || !category) {
    return { error: "Le nom et la catégorie sont requis." };
  }

  const canAddClanItem = hasElevatedAccess(user.roles);
  const ownerId = isClanItem && canAddClanItem ? null : user.id;

  await db.equipment.create({
    data: { ownerId, name, category, description: description || null, slot },
  });

  revalidatePath("/membre/equipement");
  revalidatePath("/membre/equipement/mannequin");
  return {};
}

export async function updateEquipment(id: string, formData: FormData) {
  const user = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const slot = parseSlot(formData.get("slot"));

  if (!name || !category) {
    return { error: "Le nom et la catégorie sont requis." };
  }

  const item = await db.equipment.findUnique({ where: { id } });
  const elevated = hasElevatedAccess(user.roles);
  const canEdit = item && (item.ownerId === user.id || (item.ownerId === null && elevated));
  if (!canEdit) {
    return { error: "Objet introuvable." };
  }

  await db.equipment.update({
    where: { id },
    data: { name, category, description: description || null, slot },
  });

  revalidatePath("/membre/equipement");
  revalidatePath("/membre/equipement/mannequin");
  redirect("/membre/equipement");
}

export async function deleteEquipment(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");

  const item = await db.equipment.findUnique({ where: { id } });
  const elevated = hasElevatedAccess(user.roles);
  const canDelete = item && (item.ownerId === user.id || (item.ownerId === null && elevated));
  if (!canDelete) return;

  await db.equipment.delete({ where: { id } });
  revalidatePath("/membre/equipement");
  revalidatePath("/membre/equipement/mannequin");
}

export async function equipItem(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");

  const item = await db.equipment.findUnique({ where: { id } });
  if (!item || !item.slot) {
    return { error: "Objet introuvable ou non équipable." };
  }
  if (item.equippedByUserId && item.equippedByUserId !== user.id) {
    return { error: "Cet objet est déjà emprunté par quelqu'un d'autre." };
  }
  if (item.ownerId !== null && item.ownerId !== user.id) {
    return { error: "Vous ne pouvez pas équiper l'objet de quelqu'un d'autre." };
  }

  await db.$transaction([
    // Unequip whatever this user currently has in that slot.
    db.equipment.updateMany({
      where: { equippedByUserId: user.id, slot: item.slot, id: { not: item.id } },
      data: { equippedByUserId: null },
    }),
    db.equipment.update({
      where: { id: item.id },
      data: { equippedByUserId: user.id },
    }),
  ]);

  revalidatePath("/membre/equipement/mannequin");
  return {};
}

export async function unequipItem(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");

  const item = await db.equipment.findUnique({ where: { id } });
  if (!item || item.equippedByUserId !== user.id) return;

  await db.equipment.update({
    where: { id: item.id },
    data: { equippedByUserId: null },
  });

  revalidatePath("/membre/equipement/mannequin");
}
