import { cache } from "react";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import type { RoleSlug } from "@/lib/roles";

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;

  const user = await db.user.findUnique({
    where: { id: session.userId },
    include: { roles: { include: { role: true } } },
  });
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roles: user.roles.map((ur) => ur.role.slug) as RoleSlug[],
  };
});

export async function hasRole(role: RoleSlug) {
  const user = await getCurrentUser();
  return user?.roles.includes(role) ?? false;
}
