export const ROLES = {
  MEMBER: "member",
  RAID_ORGANIZER: "raid_organizer",
  CHEF_DE_CLAN: "chef_de_clan",
} as const;

export const ROLE_SEED = [
  { slug: ROLES.MEMBER, label: "Membre" },
  { slug: ROLES.RAID_ORGANIZER, label: "Organisateur de raid" },
  { slug: ROLES.CHEF_DE_CLAN, label: "Chef de clan" },
];

export type RoleSlug = (typeof ROLES)[keyof typeof ROLES];
