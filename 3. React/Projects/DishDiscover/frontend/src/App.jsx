import { useEffect, useState } from 'react'
import './App.css'
import IngredientSearch from './components/IngredientSearch'
import Filters from './components/Filters'
import WeeklyPlanner from './components/WeeklyPlanner'
import { searchRecipes } from './mockApi'

const STORAGE_KEY = 'dishdiscover-saved'

function App() {
  const [filters, setFilters] = useState({ vegetarian: false, vegan: false, glutenFree: false })
  const [results, setResults] = useState([])
  const [savedMeals, setSavedMeals] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    } catch (e) {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMeals))
  }, [savedMeals])

  async function handleSearch(ingredientText) {
    const ingredients = ingredientText.split(',').map(s => s.trim()).filter(Boolean)
    const res = await searchRecipes(ingredients, filters)
    setResults(res)
  }

  function handleSave(day, recipe) {
    setSavedMeals(prev => {
      const next = { ...prev, [day]: recipe }
      return next
    })
  }

  return (
    <div className="app">
      <header>
        <h1>DishDiscover</h1>
        <p>Search recipes by ingredients, filter dietary needs, and plan your week.</p>
      </header>

      <main>
        <section className="controls">
          <IngredientSearch onSearch={handleSearch} />
          <Filters value={filters} onChange={setFilters} />
        </section>

        <section className="results">
          <h2>Results</h2>
          {results.length === 0 ? (
            <p>No results yet. Try searching with some ingredients.</p>
          ) : (
            <ul>
              {results.map(r => (
                <li key={r.id} className="recipe">
                  <div>
                    <strong>{r.title}</strong>
                    <div className="meta">{r.tags.join(' • ')}</div>
                    <div className="ingredients">{r.ingredients.join(', ')}</div>
                  </div>
                  <div className="actions">
                    <button onClick={() => navigator.clipboard?.writeText(r.title)}>Copy</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="planner">
          <WeeklyPlanner savedMeals={savedMeals} onSave={handleSave} results={results} />
        </section>
      </main>

      <footer>
        <small>DishDiscover — demo prototype</small>
      </footer>
    </div>
  )
}

export default App
