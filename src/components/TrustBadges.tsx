const badges = [
  {
    title: "Doručení 3–5 dnů",
    note: "Odesíláme ihned",
    icon: (
      <>
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17.5" cy="18" r="1.6" />
      </>
    ),
  },
  {
    title: "Bezpečná platba",
    note: "Šifrované připojení",
    icon: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    title: "14 dní na vrácení",
    note: "Bez udání důvodu",
    icon: <path d="M9 14 4 9l5-5M4 9h9a7 7 0 0 1 0 14h-3" />,
  },
  {
    title: "Česká podpora",
    note: "Po–Pá 9–17 h",
    icon: (
      <>
        <path d="M4 5h16v11H8l-4 3z" />
        <path d="M9 9h6M9 12h4" />
      </>
    ),
  },
];

export default function TrustBadges() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {badges.map((b) => (
        <li
          key={b.title}
          className="flex flex-col items-start gap-2 rounded-2xl border border-line-2 bg-surface/70 p-3.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-glow text-sage-deep">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {b.icon}
            </svg>
          </span>
          <div>
            <p className="text-[0.82rem] font-semibold leading-tight">{b.title}</p>
            <p className="text-[0.72rem] leading-tight text-muted">{b.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
