"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";
import { ROLES } from "@/lib/roles";

export async function createFirstAdmin(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || password.length < 8) {
    return { error: "Nom, email et mot de passe (8 caractères min.) requis." };
  }

  const existingUsers = await db.user.count();
  if (existingUsers > 0) {
    redirect("/connexion");
  }

  const bootstrapRoles = await db.role.findMany({
    where: { slug: { in: [ROLES.CHEF_DE_CLAN, ROLES.ADMINISTRATEUR] } },
  });
  if (bootstrapRoles.length === 0) {
    return { error: "Les rôles n'ont pas été initialisés (seed manquant)." };
  }

  const passwordHash = await hashPassword(password);
  const user = await db.user.create({
    data: {
      name,
      email,
      passwordHash,
      roles: { create: bootstrapRoles.map((role) => ({ roleId: role.id })) },
    },
  });

  await createSession(user.id);
  redirect("/membre");
}
