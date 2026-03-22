import { useState } from 'react'
import { GOLD, BLACK, BORDER, MUTED, TEXT, SOFT, CARD } from './data.js'
import { Stars, Avatar } from './components.jsx'

export default function DropCard({ drop, notified, onRate }) {
  const [expanded, setExpanded] = useState(false)
  const [rated, setRated] = useState(false)
  const [hoverStar, setHoverStar] = useState(0)

  return (
    <div
      style={{
        background: CARD,
        border: `1.5px solid ${drop.hot ? GOLD : BORDER}`,
        borderRadius: '18px',
        marginBottom: '14px',
        overflow: 'hidden',
        boxShadow: drop.hot ? '0 0 20px rgba(240,180,41,0.1)' : 'none',
        transition: 'transform 0.15s',
      }}
    >
      <div
        style={{ padding: '16px 18px', cursor: 'pointer' }}
        onClick={() => setExpanded((e) => !e)}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Avatar initials={drop.avatar} />
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '13px',
                  color: TEXT,
                }}
              >
                {drop.host}
              </div>
              <Stars rating={drop.rating} count={drop.ratingCount} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '4px',
            }}
          >
            {drop.hot && (
              <span
                style={{
                  background: GOLD,
                  color: BLACK,
                  fontSize: '9px',
                  fontWeight: 900,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: '1.5px',
                  padding: '2px 8px',
                  borderRadius: '20px',
                }}
              >
                🔥 HOT DROP
              </span>
            )}
            {notified && (
              <span
                style={{
                  background: '#1a2a1a',
                  border: '1px solid #2d5a2d',
                  color: '#6fcf97',
                  fontSize: '9px',
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: '1px',
                  padding: '2px 8px',
                  borderRadius: '20px',
                }}
              >
                PINGED
              </span>
            )}
            <span
              style={{
                fontSize: '10px',
                color: '#444',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {drop.posted}
            </span>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '17px',
            fontWeight: 800,
            color: TEXT,
            marginBottom: '10px',
            lineHeight: 1.2,
          }}
        >
          {drop.title}
        </div>

        {/* Meta pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[
            `📍 ${drop.location}`,
            `📅 ${drop.date}`,
            `🕐 ${drop.time}`,
            drop.category,
          ].map((label) => (
            <span
              key={label}
              style={{
                background: '#1a1a1a',
                border: `1px solid ${BORDER}`,
                color: SOFT,
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '11px',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {expanded && (
        <div
          style={{
            padding: '0 18px 18px',
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          <p
            style={{
              color: '#aaa',
              fontSize: '13px',
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.6,
              margin: '14px 0 16px',
            }}
          >
            {drop.description}
          </p>

          {!rated ? (
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: MUTED,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: '8px',
                }}
              >
                Rate this host
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    onMouseEnter={() => setHoverStar(s)}
                    onMouseLeave={() => setHoverStar(0)}
                    onClick={(e) => {
                      e.stopPropagation()
                      setRated(true)
                      onRate(drop.id, s)
                    }}
                    style={{
                      fontSize: '24px',
                      cursor: 'pointer',
                      color: s <= (hoverStar || 0) ? GOLD : '#2a2a2a',
                      transition: 'color 0.1s',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                fontSize: '12px',
                color: '#6fcf97',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
              }}
            >
              ✓ Thanks for rating!
            </div>
          )}
        </div>
      )}
    </div>
  )
}
