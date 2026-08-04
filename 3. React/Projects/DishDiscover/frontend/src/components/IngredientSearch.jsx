import { useState } from 'react'

export default function IngredientSearch({ onSearch }) {
  const [text, setText] = useState('')

  function submit(e) {
    e?.preventDefault()
    onSearch(text)
  }

  return (
    <form className="ingredient-search" onSubmit={submit}>
      <label>
        Ingredients (comma separated)
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="e.g. chicken, garlic, tomato"
        />
      </label>
      <button type="submit">Search</button>
    </form>
  )
}
