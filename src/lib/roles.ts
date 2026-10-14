export const ROLES = {
  MEMBER: "member",
  RAID_ORGANIZER: "raid_organizer",
  CHEF_DE_CLAN: "chef_de_clan",
  ADMINISTRATEUR: "administrateur",
} as const;

export const ROLE_SEED = [
  { slug: ROLES.MEMBER, label: "Membre" },
  { slug: ROLES.RAID_ORGANIZER, label: "Organisateur de raid" },
  { slug: ROLES.CHEF_DE_CLAN, label: "Chef de clan" },
  { slug: ROLES.ADMINISTRATEUR, label: "Administrateur" },
];

export type RoleSlug = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<string, string> = Object.fromEntries(
  ROLE_SEED.map((r) => [r.slug, r.label])
);

// Technical super-admin, separate from "chef de clan" (which is more of an
// in-club leadership role). Has every permission a chef de clan has, plus
// anything added later — used to fix mistakes rather than for day-to-day
// club management. Use this helper anywhere a "chef_de_clan-only" check
// exists so admins aren't silently locked out of their own fix-it role.
export function hasElevatedAccess(roles: RoleSlug[] | string[]) {
  return roles.includes(ROLES.CHEF_DE_CLAN) || roles.includes(ROLES.ADMINISTRATEUR);
}
