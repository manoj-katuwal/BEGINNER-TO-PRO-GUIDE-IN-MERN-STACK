import React, { useEffect, useMemo, useState } from 'react'
import './App.css'
import Search from './components/Search'
import MovieList from './components/MovieList'
import Watchlist from './components/Watchlist'
import MovieModal from './components/MovieModal'

const SAMPLE_MOVIES = [
  {
    id: 'm1',
    title: 'The Shawshank Redemption',
    year: '1994',
    poster: 'https://via.placeholder.com/300x450?text=Shawshank+Redemption',
    plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
  },
  {
    id: 'm2',
    title: 'Inception',
    year: '2010',
    poster: 'https://via.placeholder.com/300x450?text=Inception',
    plot: 'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.'
  },
  {
    id: 'm3',
    title: 'Interstellar',
    year: '2014',
    poster: 'https://via.placeholder.com/300x450?text=Interstellar',
    plot: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
  },
  {
    id: 'm4',
    title: 'The Dark Knight',
    year: '2008',
    poster: 'https://via.placeholder.com/300x450?text=The+Dark+Knight',
    plot: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and DA Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.'
  },
  {
    id: 'm5',
    title: 'Parasite',
    year: '2019',
    poster: 'https://via.placeholder.com/300x450?text=Parasite',
    plot: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.'
  }
]

function App() {
  const [query, setQuery] = useState('')
  const [watchlist, setWatchlist] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('watchlist:movies')
    if (raw) {
      try {
        setWatchlist(JSON.parse(raw))
      } catch (e) {
        setWatchlist([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('watchlist:movies', JSON.stringify(watchlist))
  }, [watchlist])

  const watchlistIds = useMemo(() => new Set(watchlist.map((m) => m.id)), [watchlist])

  function handleAdd(movie) {
    if (watchlistIds.has(movie.id)) return
    setWatchlist((s) => [movie, ...s])
  }

  function handleRemove(id) {
    setWatchlist((s) => s.filter((m) => m.id !== id))
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SAMPLE_MOVIES
    return SAMPLE_MOVIES.filter((m) => m.title.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="app">
      <header>
        <h1>Movie Watchlist Explorer</h1>
      </header>

      <main>
        <section className="left">
          <Search query={query} onChange={setQuery} />
          <MovieList
            movies={filtered}
            onAdd={handleAdd}
            onRemove={handleRemove}
            watchlistIds={watchlistIds}
            onSelect={setSelected}
          />
        </section>

        <aside className="right">
          <Watchlist items={watchlist} onRemove={handleRemove} onSelect={setSelected} />
        </aside>
      </main>

      <MovieModal movie={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default App
