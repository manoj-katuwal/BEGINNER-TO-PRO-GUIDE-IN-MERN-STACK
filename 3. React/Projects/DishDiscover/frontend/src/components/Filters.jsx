export default function Filters({ value, onChange }) {
  function toggle(key) {
    onChange({ ...value, [key]: !value[key] })
  }

  return (
    <div className="filters">
      <h3>Dietary Filters</h3>
      <label>
        <input type="checkbox" checked={value.vegetarian} onChange={() => toggle('vegetarian')} /> Vegetarian
      </label>
      <label>
        <input type="checkbox" checked={value.vegan} onChange={() => toggle('vegan')} /> Vegan
      </label>
      <label>
        <input type="checkbox" checked={value.glutenFree} onChange={() => toggle('glutenFree')} /> Gluten-free
      </label>
    </div>
  )
}
