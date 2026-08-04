import React from 'react'

export default function Watchlist({ items, onRemove, onSelect }) {
  return (
    <div className="watchlist">
      <h2>Your Watchlist</h2>
      {items.length === 0 && <div className="empty">No movies yet. Add some!</div>}
      {items.map((m) => (
        <div className="watch-item" key={m.id}>
          <img src={m.poster} alt="poster" />
          <div className="info" onClick={() => onSelect(m)}>
            <strong>{m.title}</strong>
            <div className="year">{m.year}</div>
          </div>
          <button onClick={() => onRemove(m.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
}
