import { GOLD, BLACK, BORDER, SOFT, MUTED, TEXT, CARD } from './data.js'

export function Stars({ rating, count, size = 13 }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <span style={{ display: 'inline-flex', gap: '1px' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            style={{
              fontSize: size,
              color:
                i <= full
                  ? GOLD
                  : i === full + 1 && half
                  ? GOLD
                  : '#333',
            }}
          >
            ★
          </span>
        ))}
      </span>
      <span
        style={{
          fontSize: size - 2,
          color: SOFT,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {rating.toFixed(1)}
      </span>
      <span
        style={{
          fontSize: size - 3,
          color: '#444',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        ({count})
      </span>
    </span>
  )
}

export function Avatar({ initials, size = 40, gold = false }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: gold ? GOLD : '#222',
        border: `2px solid ${gold ? GOLD : BORDER}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 800,
        fontSize: size * 0.35,
        color: gold ? BLACK : SOFT,
        flexShrink: 0,
        letterSpacing: '0.5px',
      }}
    >
      {initials}
    </div>
  )
}

export function CategoryPill({ cat, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? GOLD : 'transparent',
        color: active ? BLACK : MUTED,
        border: active ? 'none' : `1.5px solid ${BORDER}`,
        borderRadius: '20px',
        padding: '5px 13px',
        fontSize: '11px',
        fontWeight: 700,
        fontFamily: "'DM Sans', sans-serif",
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        letterSpacing: '0.3px',
        transition: 'all 0.15s',
      }}
    >
      {cat}
    </button>
  )
}

export function Toast({ toast }) {
  if (!toast) return null
  return (
    <div
      style={{
        position: 'fixed',
        top: '76px',
        left: '50%',
        transform: 'translateX(-50%)',
        background:
          toast.type === 'error'
            ? '#c0392b'
            : toast.type === 'info'
            ? '#2980b9'
            : '#27ae60',
        color: '#fff',
        borderRadius: '14px',
        padding: '10px 20px',
        fontSize: '13px',
        fontWeight: 700,
        fontFamily: "'DM Sans', sans-serif",
        zIndex: 999,
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        whiteSpace: 'nowrap',
      }}
    >
      {toast.msg}
    </div>
  )
}
