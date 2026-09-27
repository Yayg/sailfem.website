import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { KnotDivider } from "@/components/KnotDivider";

const combatStyles = [
  {
    name: "Western",
    description:
      "Le style le plus répandu dans la reconstitution viking. Exigeant en technique, avec des touches validées sur le torse et les jambes.",
  },
  {
    name: "Eastern",
    description:
      "Un combat lourd venu des pays de l'Est, physique et cardio, qui impose un équipement de protection complet.",
  },
  {
    name: "Full Target",
    description:
      "Toutes les zones de touche sont prises en compte. Réservé aux combattants confirmés.",
  },
  {
    name: "Glima",
    description:
      "La lutte nordique ancestrale : deux adversaires, une seule règle — faire tomber l'autre puis rester debout.",
  },
];

const trainings = [
  { day: "Mardi soir", place: "Brunoy", time: "18h30 – 20h30" },
  { day: "Mercredi soir", place: "Bassin de Fontainebleau", time: "18h00 – 20h00" },
  { day: "Dimanche matin", place: "Forêt de Fontainebleau", time: "9h30 – 12h00" },
];

const prestations = [
  "Costumes & artisanat",
  "Armes & combat",
  "Archerie",
  "Campement viking",
  "Cuisine & four à pain",
  "Événements privés",
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-gold/20 px-6 py-28 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--color-gold) 0, var(--color-gold) 1px, transparent 1px, transparent 40px)",
            }}
            aria-hidden="true"
          />
          <p className="text-xs tracking-[0.3em] text-gold">CAPITAINERIE DE PARIS</p>
          <h1 className="mt-4 font-display text-5xl tracking-widest text-parchment sm:text-7xl">
            SAIL-FEM
          </h1>
          <KnotDivider className="mx-auto mt-6 text-gold" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-parchment-dim">
            Association de reconstitution historique Viking, basée à Brunoy.
          </p>
          <p className="mt-2 text-sm tracking-[0.2em] text-gold/80">
            UNITÉ · RIGUEUR · CAMARADERIE
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#rejoindre"
              className="rounded-sm bg-crimson px-6 py-3 text-sm tracking-widest text-parchment transition-colors hover:bg-crimson-light"
            >
              NOUS REJOINDRE
            </a>
            <a
              href="#prestations"
              className="rounded-sm border border-gold/50 px-6 py-3 text-sm tracking-widest text-gold transition-colors hover:bg-gold/10"
            >
              NOS PRESTATIONS
            </a>
          </div>
        </section>

        {/* Qui sommes-nous */}
        <section id="qui-sommes-nous" className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="font-display text-2xl tracking-widest text-gold">
            QUI SOMMES-NOUS
          </h2>
          <div className="mt-6 space-y-4 text-parchment-dim">
            <p>
              Sail-Fem est la capitainerie parisienne de la fédération{" "}
              <a
                href="https://einherjar-elag.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                Einherjar Elag
              </a>
              . Le groupe s&apos;est formé en 2017 autour d&apos;une poignée de
              passionnés, avec très peu de matériel au départ, avant de grandir
              entraînement après entraînement jusqu&apos;à devenir l&apos;équipe
              d&apos;aujourd&apos;hui.
            </p>
            <p>
              Combat, artisanat, couture, cuisine, forge : chacun trouve sa place
              selon ses envies, dans un esprit de camaraderie et d&apos;exigence
              sur l&apos;authenticité de la reconstitution.
            </p>
          </div>
        </section>

        {/* Styles de combat */}
        <section className="border-y border-gold/20 bg-ink-light px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl tracking-widest text-gold">
              STYLES DE COMBAT
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {combatStyles.map((style) => (
                <div
                  key={style.name}
                  className="rounded-sm border border-gold/20 bg-ink px-5 py-6"
                >
                  <h3 className="font-display text-sm tracking-widest text-gold">
                    {style.name.toUpperCase()}
                  </h3>
                  <p className="mt-3 text-sm text-parchment-dim">{style.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Entrainements */}
        <section id="entrainements" className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="font-display text-2xl tracking-widest text-gold">
            ENTRAÎNEMENTS
          </h2>
          <p className="mt-4 text-parchment-dim">
            Ouverts à tous, débutants comme confirmés.
          </p>
          <div className="mt-8 divide-y divide-gold/20 border-y border-gold/20">
            {trainings.map((t) => (
              <div
                key={t.day}
                className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center"
              >
                <span className="font-display text-sm tracking-wide text-parchment">
                  {t.day}
                </span>
                <span className="text-sm text-parchment-dim">{t.place}</span>
                <span className="text-sm text-gold">{t.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Prestations */}
        <section
          id="prestations"
          className="border-y border-gold/20 bg-ink-light px-6 py-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl tracking-widest text-gold">
              NOS PRESTATIONS
            </h2>
            <p className="mt-4 text-parchment-dim">
              Sail-Fem intervient pour des événements publics ou privés :
              animations, démonstrations et immersion viking sur mesure.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {prestations.map((p) => (
                <span
                  key={p}
                  className="rounded-sm border border-gold/30 px-4 py-2 text-xs tracking-wide text-parchment-dim"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Rejoindre */}
        <section id="rejoindre" className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h2 className="font-display text-2xl tracking-widest text-gold">
            NOUS REJOINDRE
          </h2>
          <p className="mt-4 text-parchment-dim">
            L&apos;espace adhérent de Sail-Fem est accessible sur invitation.
            Pour participer à un entraînement ou rejoindre l&apos;aventure,
            contactez-nous directement.
          </p>
          <a
            href="https://www.facebook.com/SailFem/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-sm bg-crimson px-8 py-3 text-sm tracking-widest text-parchment transition-colors hover:bg-crimson-light"
          >
            NOUS CONTACTER
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
