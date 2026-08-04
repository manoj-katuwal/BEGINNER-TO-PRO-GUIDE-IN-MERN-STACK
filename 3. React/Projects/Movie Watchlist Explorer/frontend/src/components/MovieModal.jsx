import React from 'react'

export default function MovieModal({ movie, onClose }) {
  if (!movie) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>&times;</button>
        <div className="modal-content">
          <img src={movie.poster} alt="poster" />
          <div className="details">
            <h2>{movie.title} <span>({movie.year})</span></h2>
            <p>{movie.plot}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
