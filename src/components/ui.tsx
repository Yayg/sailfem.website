import { InputHTMLAttributes, LabelHTMLAttributes, ButtonHTMLAttributes } from "react";

export function Field({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-parchment-dim">{label}</span>
      <input
        {...props}
        className="w-full rounded-sm border border-gold/30 bg-ink px-3 py-2 text-parchment placeholder:text-parchment-dim/50 focus:border-gold focus:outline-none"
      />
    </label>
  );
}

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className="mb-1.5 block text-sm text-parchment-dim" />;
}

export function Select({
  label,
  children,
  ...props
}: { label: string; children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-parchment-dim">{label}</span>
      <select
        {...props}
        className="w-full rounded-sm border border-gold/30 bg-ink px-3 py-2 text-parchment focus:border-gold focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: { variant?: "primary" | "secondary" } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = "rounded-sm px-5 py-2.5 text-sm tracking-widest transition-colors disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-crimson text-parchment hover:bg-crimson-light"
      : "border border-gold/50 text-gold hover:bg-gold/10";
  return <button {...props} className={`${base} ${styles} ${className}`} />;
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-sm border border-gold/20 bg-ink-light p-6 ${className}`}>
      {children}
    </div>
  );
}

export function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="rounded-sm border border-crimson/40 bg-crimson/10 px-3 py-2 text-sm text-crimson-light">{children}</p>;
}
