import { useState } from 'react'
import { GOLD, BLACK, BORDER, MUTED, TEXT, SOFT, CARD, SAMPLE_DROPS, MY_PROFILE } from './data.js'
import { Stars, Avatar } from './components.jsx'

function StatBox({ label, value }) {
  return (
    <div
      style={{
        background: '#111',
        border: `1.5px solid ${BORDER}`,
        borderRadius: '14px',
        padding: '14px 10px',
        textAlign: 'center',
        flex: 1,
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '24px',
          fontWeight: 800,
          color: GOLD,
          lineHeight: 1,
          marginBottom: '4px',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: 700,
          color: MUTED,
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  )
}

function MiniDropCard({ drop }) {
  return (
    <div
      style={{
        background: '#111',
        border: `1.5px solid ${BORDER}`,
        borderRadius: '14px',
        padding: '13px 15px',
        marginBottom: '10px',
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '14px',
          fontWeight: 800,
          color: TEXT,
          marginBottom: '6px',
        }}
      >
        {drop.title}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        <span
          style={{
            background: '#1a1a1a',
            border: `1px solid ${BORDER}`,
            color: SOFT,
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '10px',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          📍 {drop.location}
        </span>
        <span
          style={{
            background: '#1a1a1a',
            border: `1px solid ${BORDER}`,
            color: SOFT,
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '10px',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {drop.category}
        </span>
        <span
          style={{
            background: '#1a1a1a',
            border: `1px solid ${BORDER}`,
            color: '#444',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '10px',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {drop.posted}
        </span>
      </div>
    </div>
  )
}

export default function ProfilePage({ showToast }) {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState(MY_PROFILE)
  const [editForm, setEditForm] = useState({ ...MY_PROFILE })

  const myDrops = SAMPLE_DROPS.slice(0, 3)

  const handleSave = () => {
    setProfile({ ...editForm })
    setEditing(false)
    showToast('Profile updated!', 'info')
  }

  return (
    <div style={{ paddingBottom: '20px' }}>
      {/* Profile Hero */}
      <div
        style={{
          background: 'linear-gradient(180deg, #1a1500 0%, #0d0d0d 100%)',
          border: `1.5px solid ${BORDER}`,
          borderRadius: '20px',
          padding: '24px 20px',
          marginBottom: '14px',
          position: 'relative',
        }}
      >
        {/* Edit button */}
        <button
          onClick={() => setEditing(true)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#1c1c1c',
            border: `1.5px solid ${BORDER}`,
            borderRadius: '10px',
            padding: '6px 14px',
            color: MUTED,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Edit
        </button>

        {/* Avatar + name */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
          <Avatar initials={profile.avatar} size={64} gold />
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '22px',
                fontWeight: 800,
                color: TEXT,
                lineHeight: 1.1,
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                color: MUTED,
                marginTop: '3px',
              }}
            >
              {profile.major} · {profile.year}
            </div>
            <div style={{ marginTop: '5px' }}>
              <Stars rating={profile.rating} count={profile.ratingCount} size={13} />
            </div>
          </div>
        </div>

        {/* Bio */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            color: '#aaa',
            lineHeight: 1.6,
            marginBottom: '16px',
          }}
        >
          {profile.bio}
        </p>

        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
          {profile.badges.map((badge) => (
            <span
              key={badge}
              style={{
                background: '#1a1500',
                border: `1px solid #3a2f00`,
                color: GOLD,
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        <div
          style={{
            fontSize: '10px',
            color: '#333',
            fontFamily: "'DM Sans', sans-serif",
            marginTop: '8px',
          }}
        >
          Lute since {profile.joinedDate}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <StatBox label="Drops" value={profile.totalDrops} />
        <StatBox label="Rating" value={`${profile.rating}★`} />
        <StatBox label="Reviews" value={profile.ratingCount} />
      </div>

      {/* My Drops */}
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '16px',
          fontWeight: 800,
          color: GOLD,
          marginBottom: '12px',
          letterSpacing: '-0.3px',
        }}
      >
        My Recent Drops
      </div>
      {myDrops.map((d) => (
        <MiniDropCard key={d.id} drop={d} />
      ))}

      {/* Edit Modal */}
      {editing && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            zIndex: 300,
          }}
          onClick={(e) => e.target === e.currentTarget && setEditing(false)}
        >
          <div
            style={{
              background: '#131313',
              borderRadius: '22px 22px 0 0',
              padding: '24px 20px 40px',
              width: '100%',
              maxWidth: '480px',
              borderTop: `3px solid ${GOLD}`,
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '20px',
                fontWeight: 800,
                color: GOLD,
                marginBottom: '20px',
              }}
            >
              Edit Profile ✏️
            </div>

            {[
              { key: 'name', label: 'Display Name' },
              { key: 'major', label: 'Major' },
              { key: 'year', label: 'Year (e.g. Junior)' },
            ].map((f) => (
              <div key={f.key} style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: MUTED,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: '6px',
                  }}
                >
                  {f.label}
                </label>
                <input
                  value={editForm[f.key]}
                  onChange={(e) =>
                    setEditForm((ef) => ({ ...ef, [f.key]: e.target.value }))
                  }
                  style={{
                    width: '100%',
                    background: '#1c1c1c',
                    border: `1.5px solid ${BORDER}`,
                    borderRadius: '10px',
                    padding: '10px 13px',
                    color: TEXT,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: MUTED,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: '6px',
                }}
              >
                Bio
              </label>
              <textarea
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm((ef) => ({ ...ef, bio: e.target.value }))
                }
                rows={3}
                style={{
                  width: '100%',
                  background: '#1c1c1c',
                  border: `1.5px solid ${BORDER}`,
                  borderRadius: '10px',
                  padding: '10px 13px',
                  color: TEXT,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  resize: 'none',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setEditing(false)}
                style={{
                  flex: 1,
                  background: '#1c1c1c',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '13px',
                  color: MUTED,
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  flex: 2,
                  background: GOLD,
                  border: 'none',
                  borderRadius: '12px',
                  padding: '13px',
                  color: BLACK,
                  fontWeight: 800,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
