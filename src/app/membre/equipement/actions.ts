"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion");
  return user;
}

export async function createEquipment(formData: FormData) {
  const user = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name || !category) {
    return { error: "Le nom et la catégorie sont requis." };
  }

  await db.equipment.create({
    data: { userId: user.id, name, category, description: description || null },
  });

  revalidatePath("/membre/equipement");
  return {};
}

export async function updateEquipment(id: string, formData: FormData) {
  const user = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name || !category) {
    return { error: "Le nom et la catégorie sont requis." };
  }

  const item = await db.equipment.findUnique({ where: { id } });
  if (!item || item.userId !== user.id) {
    return { error: "Objet introuvable." };
  }

  await db.equipment.update({
    where: { id },
    data: { name, category, description: description || null },
  });

  revalidatePath("/membre/equipement");
  redirect("/membre/equipement");
}

export async function deleteEquipment(formData: FormData) {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");

  const item = await db.equipment.findUnique({ where: { id } });
  if (!item || item.userId !== user.id) return;

  await db.equipment.delete({ where: { id } });
  revalidatePath("/membre/equipement");
}
