export default function LogoMark({ className = 'h-10 w-10' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Beacia Group Solutions monogram"
    >
      <defs>
        <linearGradient id="beacia-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5c3a1f" />
          <stop offset="55%" stopColor="#8a5a34" />
          <stop offset="100%" stopColor="#d4af5a" />
        </linearGradient>
      </defs>
      <path
        d="M14 60c10-22 30-24 40-10-8-2-16 2-18 10s6 16 16 14c14-3 18-18 8-30-12-14-34-14-46 16z"
        fill="url(#beacia-grad)"
        opacity="0.9"
      />
      <text
        x="58"
        y="78"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="64"
        fontWeight="600"
        fill="url(#beacia-grad)"
      >
        B
      </text>
    </svg>
  )
}
