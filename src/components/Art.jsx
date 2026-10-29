export default function Art({ kind, tone = 0 }) {
  const c = ['#2f3a40', '#46535b', '#7a868c'][tone % 3]
  const shapes = {
    laptops: <><rect x="40" y="20" width="120" height="80" rx="5" fill={c} /><rect x="48" y="28" width="104" height="64" fill="#7da7e8" /><path d="M20 108h160l-10 12H30z" fill="#9aa5ab" /></>,
    macbooks: <><rect x="40" y="20" width="120" height="80" rx="5" fill="#cfd6da" /><rect x="48" y="28" width="104" height="64" fill="#1c2a4a" /><path d="M20 108h160l-10 12H30z" fill="#b6bfc4" /></>,
    desktops: <><rect x="60" y="10" width="50" height="105" rx="4" fill={c} /><rect x="120" y="30" width="60" height="45" fill="#333" /><rect x="124" y="34" width="52" height="37" fill="#7da7e8" /></>,
    printers: <><rect x="40" y="40" width="120" height="55" rx="6" fill={c} /><rect x="62" y="18" width="76" height="26" fill="#e8ecee" stroke="#aab3b8" /><rect x="62" y="85" width="76" height="26" fill="#fff" stroke="#aab3b8" /></>,
  }
  return <svg viewBox="0 0 200 130" role="img" aria-label={kind} className="w-[78%] h-auto max-h-full">{shapes[kind] || <><rect x="55" y="25" width="90" height="80" rx="8" fill={c} /><circle cx="100" cy="65" r="14" fill="#d6185b" /></>}</svg>
}
