import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'quickchat-messages-v1'
const USER_KEY = 'quickchat-display-name'
const CHANNEL_NAME = 'quickchat-channel'

function createMessage(text, displayName) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    displayName,
    text,
    createdAt: new Date().toISOString(),
  }
}

function App() {
  const savedName = localStorage.getItem(USER_KEY) || ''
  const [displayName, setDisplayName] = useState(savedName)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const messagesEndRef = useRef(null)

  const channel = useMemo(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      return new BroadcastChannel(CHANNEL_NAME)
    }
    return null
  }, [])

  useEffect(() => {
    localStorage.setItem(USER_KEY, displayName)
  }, [displayName])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const handleIncoming = (event) => {
      const payload = event?.data ?? event?.newValue
      if (!payload) return

      let message
      if (typeof payload === 'string') {
        try {
          const parsed = JSON.parse(payload)
          message = parsed?.message
        } catch {
          return
        }
      } else {
        message = payload.message
      }

      if (!message || !message.id) return
      setMessages((current) => {
        if (current.some((item) => item.id === message.id)) return current
        return [...current, message]
      })
    }

    if (channel) {
      channel.addEventListener('message', handleIncoming)
      return () => channel.removeEventListener('message', handleIncoming)
    }

    const handleStorage = (event) => {
      if (event.key !== `${CHANNEL_NAME}-event`) return
      handleIncoming({ data: event.newValue })
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [channel])

  const sendUpdate = (message) => {
    if (channel) {
      channel.postMessage({ type: 'NEW_MESSAGE', message })
      return
    }

    localStorage.setItem(
      `${CHANNEL_NAME}-event`,
      JSON.stringify({ type: 'NEW_MESSAGE', message }),
    )
  }

  const handleSend = (event) => {
    event.preventDefault()
    const trimmed = draft.trim()
    if (!trimmed || !displayName.trim()) return

    const message = createMessage(trimmed, displayName.trim())
    setMessages((current) => [...current, message])
    sendUpdate(message)
    setDraft('')
  }

  const handleDraftKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend(event)
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">QuickChat</p>
          <h1>Instant messenger for quick conversations</h1>
          <p className="subtitle">
            Open another tab or browser window to see messages appear instantly.
          </p>
        </div>
        <label className="name-field">
          <span>Display name</span>
          <input
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Enter your name"
          />
        </label>
      </header>

      <main className="chat-panel">
        <section className="message-list" aria-label="Chat messages">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>No messages yet. Say hello!</p>
            </div>
          ) : (
            messages.map((message) => (
              <article key={message.id} className="message-item">
                <div className="message-meta">
                  <strong>{message.displayName}</strong>
                  <time>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </time>
                </div>
                <p>{message.text}</p>
              </article>
            ))
          )}
          <div ref={messagesEndRef} />
        </section>

        <form className="composer" onSubmit={handleSend}>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleDraftKeyDown}
            placeholder="Type your message..."
            rows={3}
          />
          <button type="submit" disabled={!displayName.trim() || !draft.trim()}>
            Send message
          </button>
        </form>
      </main>
    </div>
  )
}

export default App
