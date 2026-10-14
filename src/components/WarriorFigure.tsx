export function WarriorFigure({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 520"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* head */}
      <circle cx="150" cy="55" r="28" />
      {/* neck */}
      <path d="M140 80 L140 95 M160 80 L160 95" />
      {/* torso / tunic */}
      <path d="M100 95 L200 95 L212 230 L185 300 L115 300 L88 230 Z" />
      {/* belt line */}
      <path d="M100 265 L200 265" strokeDasharray="4 5" />
      {/* arms */}
      <path d="M100 100 L55 175 L48 225" />
      <path d="M200 100 L245 175 L252 225" />
      {/* legs */}
      <path d="M120 300 L108 455" />
      <path d="M180 300 L192 455" />
      {/* feet */}
      <path d="M90 455 L120 455 L120 470 L85 470 Z" />
      <path d="M180 455 L210 455 L215 470 L180 470 Z" />
      {/* shoulder cloak hint */}
      <path d="M95 97 Q150 120 205 97" opacity="0.5" />
    </svg>
  );
}
