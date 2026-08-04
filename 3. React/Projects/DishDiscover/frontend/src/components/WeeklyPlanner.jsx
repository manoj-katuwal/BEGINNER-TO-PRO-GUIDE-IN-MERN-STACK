import { useState } from 'react'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function WeeklyPlanner({ savedMeals, onSave, results }) {
  const [selectedDay, setSelectedDay] = useState(DAYS[0])
  const [selectedRecipeId, setSelectedRecipeId] = useState('')

  function handleAssign(e) {
    e.preventDefault()
    const recipe = results.find(r => String(r.id) === String(selectedRecipeId))
    if (recipe) onSave(selectedDay, recipe)
  }

  return (
    <div className="weekly-planner">
      <h2>Weekly Planner</h2>
      <div className="planner-grid">
        {DAYS.map(d => (
          <div key={d} className="day">
            <strong>{d}</strong>
            <div className="slot">{savedMeals[d]?.title ?? <em>empty</em>}</div>
          </div>
        ))}
      </div>

      <form className="assign" onSubmit={handleAssign}>
        <label>
          Day
          <select value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>

        <label>
          Recipe
          <select value={selectedRecipeId} onChange={e => setSelectedRecipeId(e.target.value)}>
            <option value="">— choose —</option>
            {results.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
          </select>
        </label>

        <button type="submit">Assign</button>
      </form>
    </div>
  )
}
