export const EQUIPMENT_SLOTS = [
  { slug: "head", label: "Tête" },
  { slug: "cloak", label: "Cape" },
  { slug: "torso", label: "Torse" },
  { slug: "hands", label: "Mains" },
  { slug: "weapon", label: "Arme" },
  { slug: "shield", label: "Bouclier" },
  { slug: "belt", label: "Ceinture" },
  { slug: "legs", label: "Jambes" },
  { slug: "feet", label: "Pieds" },
] as const;

export type SlotSlug = (typeof EQUIPMENT_SLOTS)[number]["slug"];

export const SLOT_LABELS: Record<string, string> = Object.fromEntries(
  EQUIPMENT_SLOTS.map((s) => [s.slug, s.label])
);

// Position of each slot marker over the WarriorFigure SVG, as a percentage
// of the figure's bounding box (matches its 300x520 viewBox proportions).
export const SLOT_POSITIONS: Record<SlotSlug, { left: string; top: string }> = {
  head: { left: "50%", top: "9%" },
  cloak: { left: "50%", top: "22%" },
  torso: { left: "50%", top: "36%" },
  hands: { left: "50%", top: "46%" },
  weapon: { left: "84%", top: "42%" },
  shield: { left: "16%", top: "42%" },
  belt: { left: "50%", top: "56%" },
  legs: { left: "50%", top: "73%" },
  feet: { left: "50%", top: "91%" },
};
