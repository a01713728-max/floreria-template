export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        fg: 'var(--fg)', muted: 'var(--muted)', card: 'var(--card)',
        line: 'var(--line)', accent: 'var(--accent)', panel: 'var(--bg)',
      },
      fontFamily: { display: 'var(--font-display)', body: 'var(--font-body)' },
    },
  },
};
