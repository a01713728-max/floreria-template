const base = {
  width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
};

export const Icon = {
  flower: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="2" />
      {[0, 90, 180, 270].map((r) => (
        <path key={r} d="M12 10c-1.8-1.6-1.8-4.6 0-7 1.8 2.4 1.8 5.4 0 7Z" transform={`rotate(${r} 12 12)`} />
      ))}
    </svg>
  ),
  pen: (p) => (
    <svg {...base} {...p}><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1Z" /><path d="M14.5 6.5l3 3" /></svg>
  ),
  truck: (p) => (
    <svg {...base} {...p}><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
  ),
  shield: (p) => (
    <svg {...base} {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></svg>
  ),
  card: (p) => (
    <svg {...base} {...p}><rect x="4" y="5" width="16" height="14" rx="1.5" /><path d="M8 10h8M8 14h5" /></svg>
  ),
  clock: (p) => (
    <svg {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></svg>
  ),
  whatsapp: (p) => (
    <svg {...base} {...p}>
      <path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
      <path d="M9.5 8.8c.2 2 2.7 4.6 5 4.9l1.2-1.2-1.8-1-.8.7c-.9-.3-1.8-1.2-2.1-2.1l.7-.8-1-1.8-1.2 1.3Z" />
    </svg>
  ),
};