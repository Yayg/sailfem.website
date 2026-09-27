export function KnotDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 24"
      className={`h-6 w-auto ${className}`}
      aria-hidden="true"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12c4-8 12-8 16 0s12 8 16 0-12-8-16 0 12 8 16 0" />
        <path d="M52 12c4-8 12-8 16 0s12 8 16 0-12-8-16 0 12 8 16 0" />
        <path d="M100 12c4-8 12-8 16 0" />
      </g>
      <circle cx="60" cy="12" r="2.5" fill="currentColor" />
    </svg>
  );
}
