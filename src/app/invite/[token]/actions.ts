"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";

export async function acceptInvite(token: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || password.length < 8) {
    return { error: "Nom et mot de passe (8 caractères min.) requis." };
  }

  const invite = await db.invite.findUnique({ where: { token } });
  if (!invite || invite.usedAt || invite.expiresAt <= new Date()) {
    return { error: "Cette invitation n'est plus valide." };
  }

  const existingUser = await db.user.findUnique({ where: { email: invite.email } });
  if (existingUser) {
    return { error: "Un compte existe déjà avec cet email." };
  }

  const passwordHash = await hashPassword(password);

  const user = await db.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        name,
        email: invite.email,
        passwordHash,
        roles: { create: { roleId: invite.roleId } },
      },
    });
    await tx.invite.update({ where: { id: invite.id }, data: { usedAt: new Date() } });
    return created;
  });

  await createSession(user.id);
  redirect("/membre");
}
