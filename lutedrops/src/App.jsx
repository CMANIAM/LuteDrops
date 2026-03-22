import { useState, useRef } from 'react'
import { GOLD, BLACK, BORDER, MUTED, TEXT, CARD, CATEGORIES, SAMPLE_DROPS } from './data.js'
import { CategoryPill, Toast } from './components.jsx'
import DropCard from './DropCard.jsx'
import PostModal from './PostModal.jsx'
import ProfilePage from './ProfilePage.jsx'

export default function App() {
  const [drops, setDrops] = useState(SAMPLE_DROPS)
  const [tab, setTab] = useState('feed')
  const [filterCat, setFilterCat] = useState('All')
  const [search, setSearch] = useState('')
  const [prefs, setPrefs] = useState(['Food 🍕', 'Study 📚'])
  const [showPost, setShowPost] = useState(false)
  const [toast, setToast] = useState(null)
  const [pingCount, setPingCount] = useState(2)
  const toastTimer = useRef(null)

  const showToastMsg = (msg, type = 'success') => {
    setToast({ msg, type })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = (form) => {
    const newDrop = {
      id: Date.now(),
      host: 'Alex Lute',
      avatar: 'AL',
      rating: 4.7,
      ratingCount: 18,
      ...form,
      posted: 'just now',
      hot: false,
    }
    setDrops((prev) => [newDrop, ...prev])
    if (prefs.includes(form.category)) setPingCount((c) => c + 1)
    setShowPost(false)
    showToastMsg('Drop posted! 🎉')
  }

  const handleRate = (id, stars) => {
    setDrops((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d
        const newCount = d.ratingCount + 1
        const newRating = parseFloat(
          ((d.rating * d.ratingCount + stars) / newCount).toFixed(1)
        )
        return { ...d, rating: newRating, ratingCount: newCount }
      })
    )
    showToastMsg('Rating saved!', 'info')
  }

  const filtered = drops.filter((d) => {
    const matchCat = filterCat === 'All' || d.category === filterCat
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.host.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const notifiedIds = drops
    .filter((d) => prefs.includes(d.category))
    .map((d) => d.id)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: BLACK,
        maxWidth: '480px',
        margin: '0 auto',
        paddingBottom: '80px',
        position: 'relative',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700;800&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <Toast toast={toast} />

      {/* Header */}
      <div
        style={{
          background: '#0d0d0d',
          padding: '16px 18px 14px',
          borderBottom: `2px solid ${GOLD}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '28px',
                fontWeight: 800,
                color: GOLD,
                letterSpacing: '-1px',
              }}
            >
              LuteDrops
            </span>
            <span style={{ fontSize: '18px' }}>🎓</span>
          </div>
          <div
            style={{
              fontSize: '9px',
              color: '#3a3a3a',
              fontWeight: 700,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Pacific Lutheran University
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div
            onClick={() => { setTab('notifications'); setPingCount(0) }}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            <span style={{ fontSize: '20px' }}>🔔</span>
            {pingCount > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  background: '#e63946',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 800,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {pingCount}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowPost(true)}
            style={{
              background: GOLD,
              color: BLACK,
              border: 'none',
              borderRadius: '10px',
              padding: '8px 16px',
              fontWeight: 800,
              fontSize: '13px',
              fontFamily: "'DM Sans', sans-serif",
              cursor: 'pointer',
            }}
          >
            + Drop
          </button>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* FEED */}
        {tab === 'feed' && (
          <>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search drops, hosts, locations..."
              style={{
                width: '100%',
                background: CARD,
                border: `1.5px solid ${BORDER}`,
                borderRadius: '12px',
                padding: '10px 14px',
                color: TEXT,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none',
                marginBottom: '14px',
              }}
            />
            <div
              style={{
                display: 'flex',
                gap: '7px',
                overflowX: 'auto',
                marginBottom: '18px',
                paddingBottom: '4px',
              }}
            >
              {['All', ...CATEGORIES].map((cat) => (
                <CategoryPill
                  key={cat}
                  cat={cat}
                  active={filterCat === cat}
                  onClick={() => setFilterCat(cat)}
                />
              ))}
            </div>
            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  color: '#333',
                  padding: '50px 0',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                No drops found 😕
              </div>
            ) : (
              filtered.map((d) => (
                <DropCard
                  key={d.id}
                  drop={d}
                  notified={notifiedIds.includes(d.id)}
                  onRate={handleRate}
                />
              ))
            )}
          </>
        )}

        {/* PREFERENCES */}
        {tab === 'prefs' && (
          <>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '22px',
                fontWeight: 800,
                color: GOLD,
                marginBottom: '6px',
              }}
            >
              Ping Me When...
            </div>
            <p
              style={{
                color: MUTED,
                fontSize: '13px',
                marginBottom: '20px',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Get pinged when someone posts in these categories.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CATEGORIES.map((cat) => {
                const on = prefs.includes(cat)
                return (
                  <div
                    key={cat}
                    onClick={() => {
                      setPrefs((prev) =>
                        prev.includes(cat)
                          ? prev.filter((c) => c !== cat)
                          : [...prev, cat]
                      )
                      showToastMsg('Prefs updated!', 'info')
                    }}
                    style={{
                      background: on ? '#161a11' : CARD,
                      border: `1.5px solid ${on ? GOLD : BORDER}`,
                      borderRadius: '14px',
                      padding: '14px 18px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: '15px',
                        color: on ? TEXT : MUTED,
                      }}
                    >
                      {cat}
                    </span>
                    <div
                      style={{
                        width: '44px',
                        height: '24px',
                        borderRadius: '12px',
                        background: on ? GOLD : '#222',
                        position: 'relative',
                        transition: 'background 0.2s',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '3px',
                          left: on ? '23px' : '3px',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: on ? BLACK : '#444',
                          transition: 'left 0.2s',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* NOTIFICATIONS */}
        {tab === 'notifications' && (
          <>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '22px',
                fontWeight: 800,
                color: GOLD,
                marginBottom: '16px',
              }}
            >
              Your Pings
            </div>
            {[
              {
                id: 1,
                text: 'Marcus T. dropped: "Leftover Pizza — 6 Boxes"',
                cat: 'Food 🍕',
                time: '8 min ago',
              },
              {
                id: 2,
                text: 'Jordan V. dropped: "Study Group Snacks"',
                cat: 'Study 📚',
                time: '5 min ago',
              },
            ].map((n) => (
              <div
                key={n.id}
                style={{
                  background: CARD,
                  border: `1.5px solid ${BORDER}`,
                  borderRadius: '14px',
                  padding: '14px 16px',
                  marginBottom: '10px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: '20px' }}>🔔</span>
                <div>
                  <div
                    style={{
                      color: TEXT,
                      fontSize: '13px',
                      fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {n.text}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      marginTop: '5px',
                    }}
                  >
                    <span
                      style={{
                        background: '#1a1a1a',
                        border: `1px solid ${BORDER}`,
                        color: '#999',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {n.cat}
                    </span>
                    <span
                      style={{
                        color: '#444',
                        fontSize: '10px',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {n.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* PROFILE */}
        {tab === 'profile' && <ProfilePage showToast={showToastMsg} />}
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '480px',
          background: '#0d0d0d',
          borderTop: `2px solid ${GOLD}`,
          display: 'flex',
          justifyContent: 'space-around',
          padding: '10px 0 16px',
          zIndex: 100,
        }}
      >
        {[
          { id: 'feed', icon: '🏠', label: 'Drops' },
          { id: 'prefs', icon: '⚙️', label: 'Pings' },
          { id: 'notifications', icon: '🔔', label: 'Alerts' },
          { id: 'profile', icon: '👤', label: 'Profile' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id)
              if (t.id === 'notifications') setPingCount(0)
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <span style={{ fontSize: '20px' }}>{t.icon}</span>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                fontFamily: "'DM Sans', sans-serif",
                color: tab === t.id ? GOLD : '#444',
                textTransform: 'uppercase',
              }}
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>

      {showPost && (
        <PostModal onClose={() => setShowPost(false)} onSubmit={handleSubmit} />
      )}
    </div>
  )
}
