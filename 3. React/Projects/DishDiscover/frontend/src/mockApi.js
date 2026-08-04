const RECIPES = [
  { id: 1, title: 'Tomato Garlic Pasta', ingredients: ['tomato','garlic','pasta'], tags: ['vegetarian'] },
  { id: 2, title: 'Chicken Stir Fry', ingredients: ['chicken','soy sauce','garlic'], tags: [] },
  { id: 3, title: 'Vegan Salad Bowl', ingredients: ['lettuce','tomato','avocado'], tags: ['vegan','glutenFree'] },
  { id: 4, title: 'Gluten-Free Pancakes', ingredients: ['gluten-free flour','egg','milk'], tags: ['glutenFree'] },
  { id: 5, title: 'Veggie Omelette', ingredients: ['egg','bell pepper','onion'], tags: ['vegetarian'] },
]

export async function searchRecipes(ingredients = [], filters = {}) {
  // naive filter: recipe must contain all provided ingredients
  const lower = ingredients.map(i => i.toLowerCase())
  let results = RECIPES.filter(r => {
    if (lower.length === 0) return true
    const ri = r.ingredients.map(x => x.toLowerCase())
    return lower.every(ing => ri.some(ring => ring.includes(ing)))
  })

  if (filters.vegetarian) results = results.filter(r => r.tags.includes('vegetarian') || r.tags.includes('vegan'))
  if (filters.vegan) results = results.filter(r => r.tags.includes('vegan'))
  if (filters.glutenFree) results = results.filter(r => r.tags.includes('glutenFree'))

  // small delay to simulate API
  await new Promise(r => setTimeout(r, 150))
  return results
}

export default {
  searchRecipes,
}
