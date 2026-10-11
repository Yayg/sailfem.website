"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/membre");

  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Identifiants incorrects." };
  }

  await createSession(user.id);
  redirect(next.startsWith("/") ? next : "/membre");
}
