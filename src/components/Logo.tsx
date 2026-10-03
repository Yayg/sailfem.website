import Image from "next/image";
import logoSrc from "../../public/brand/sailfem-logo.jpg";

export function Logo({ size = 44 }: { size?: number }) {
  return (
    <span
      className="inline-block overflow-hidden rounded-full ring-1 ring-gold/40"
      style={{ width: size, height: size }}
    >
      <Image
        src={logoSrc}
        alt="Sail-Fem"
        width={size}
        height={size}
        className="h-full w-full object-cover"
        priority
      />
    </span>
  );
}
