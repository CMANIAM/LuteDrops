import { useState } from 'react'
import { GOLD, BLACK, BORDER, MUTED, TEXT, CATEGORIES } from './data.js'

export default function PostModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    category: CATEGORIES[0],
    location: '',
    date: '',
    time: '',
    description: '',
  })

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    if (
      !form.title ||
      !form.location ||
      !form.date ||
      !form.time ||
      !form.description
    )
      return
    onSubmit(form)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 300,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: '#131313',
          borderRadius: '22px 22px 0 0',
          padding: '24px 20px 40px',
          width: '100%',
          maxWidth: '480px',
          borderTop: `3px solid ${GOLD}`,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '22px',
            fontWeight: 800,
            color: GOLD,
            marginBottom: '20px',
          }}
        >
          New Drop 📦
        </div>

        {[
          {
            key: 'title',
            label: 'What are you giving away?',
            placeholder: 'e.g. Leftover pizza, free textbooks...',
          },
          {
            key: 'location',
            label: 'Where on campus?',
            placeholder: 'e.g. AUC Room 133, Mortvedt Lobby',
          },
          {
            key: 'date',
            label: 'Date',
            placeholder: 'e.g. Today, Tomorrow, Friday May 3rd',
          },
          {
            key: 'time',
            label: 'Available when?',
            placeholder: 'e.g. 2:00 PM – 4:00 PM, All day',
          },
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
              value={form[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
              placeholder={f.placeholder}
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

        <div style={{ marginBottom: '14px' }}>
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
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            style={{
              width: '100%',
              background: '#1c1c1c',
              border: `1.5px solid ${BORDER}`,
              borderRadius: '10px',
              padding: '10px 13px',
              color: TEXT,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              outline: 'none',
            }}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

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
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Give people the details — quantity, condition, how to get it..."
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
            onClick={onClose}
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
            onClick={handleSubmit}
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
            Drop It 🤘
          </button>
        </div>
      </div>
    </div>
  )
}
