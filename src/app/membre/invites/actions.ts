"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { hasElevatedAccess } from "@/lib/roles";

const INVITE_DURATION_DAYS = 14;

async function requireChefDeClan() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion");
  if (!hasElevatedAccess(user.roles)) redirect("/membre");
  return user;
}

export async function createInvite(formData: FormData) {
  const user = await requireChefDeClan();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const roleSlug = String(formData.get("role") ?? "");

  if (!email) {
    return { error: "Email requis." };
  }

  const role = await db.role.findUnique({ where: { slug: roleSlug } });
  if (!role) {
    return { error: "Rôle invalide." };
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "Un compte existe déjà avec cet email." };
  }

  const token = randomBytes(24).toString("base64url");
  const expiresAt = new Date(Date.now() + INVITE_DURATION_DAYS * 24 * 60 * 60 * 1000);

  await db.invite.create({
    data: { email, token, roleId: role.id, createdById: user.id, expiresAt },
  });

  revalidatePath("/membre/invites");
  return {};
}

export async function revokeInvite(formData: FormData) {
  await requireChefDeClan();
  const id = String(formData.get("id") ?? "");
  await db.invite.delete({ where: { id } }).catch(() => {});
  revalidatePath("/membre/invites");
}
