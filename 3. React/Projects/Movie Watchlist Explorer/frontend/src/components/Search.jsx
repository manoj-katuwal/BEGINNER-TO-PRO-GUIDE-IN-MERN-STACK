import React from 'react'

export default function Search({ query, onChange }) {
  return (
    <div className="search">
      <input
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies by title..."
      />
    </div>
  )
}
