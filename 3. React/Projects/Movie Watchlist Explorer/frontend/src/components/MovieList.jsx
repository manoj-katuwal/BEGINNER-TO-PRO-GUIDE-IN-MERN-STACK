import React from 'react'

export default function MovieList({ movies, onAdd, onRemove, watchlistIds, onSelect }) {
  return (
    <div className="movie-list">
      {movies.length === 0 && <div className="empty">No movies found.</div>}
      {movies.map((m) => (
        <div className="movie-card" key={m.id}>
          <img src={m.poster} alt={`${m.title} poster`} />
          <div className="meta">
            <h3 onClick={() => onSelect(m)}>{m.title}</h3>
            <p>{m.year}</p>
            {watchlistIds.has(m.id) ? (
              <button className="remove" onClick={() => onRemove(m.id)}>
                Remove
              </button>
            ) : (
              <button className="add" onClick={() => onAdd(m)}>
                Add
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
