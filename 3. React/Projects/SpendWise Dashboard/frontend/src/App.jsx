import { useEffect, useMemo, useState } from 'react'
import './App.css'

const categories = [
  'Housing',
  'Food',
  'Transport',
  'Utilities',
  'Shopping',
  'Entertainment',
  'Health',
  'Other',
]

const sampleExpenses = [
  { id: 1, title: 'Groceries', amount: 72.4, category: 'Food', date: '2026-07-18' },
  { id: 2, title: 'Bus pass', amount: 24.0, category: 'Transport', date: '2026-07-18' },
  { id: 3, title: 'Coffee', amount: 5.5, category: 'Food', date: '2026-07-17' },
  { id: 4, title: 'Electric bill', amount: 98.12, category: 'Utilities', date: '2026-07-15' },
  { id: 5, title: 'Gym membership', amount: 35.0, category: 'Health', date: '2026-07-14' },
]

function formatCurrency(value) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
}

function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const stored = localStorage.getItem('spendwise-expenses')
      return stored ? JSON.parse(stored) : sampleExpenses
    } catch {
      return sampleExpenses
    }
  })

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  useEffect(() => {
    localStorage.setItem('spendwise-expenses', JSON.stringify(expenses))
  }, [expenses])

  const handleAddExpense = (event) => {
    event.preventDefault()

    if (!title.trim() || !amount || !date.trim()) {
      return
    }

    const nextExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    }

    setExpenses((current) => [nextExpense, ...current])
    setTitle('')
    setAmount('')
    setCategory(categories[0])
    setDate(new Date().toISOString().slice(0, 10))
  }

  const totalsByCategory = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {})
  }, [expenses])

  const totalSpent = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  )

  const uniqueDays = useMemo(
    () => new Set(expenses.map((expense) => expense.date)).size || 1,
    [expenses],
  )

  const averageDaily = totalSpent / uniqueDays

  const topCategories = useMemo(
    () =>
      categories
        .map((cat) => ({ category: cat, total: totalsByCategory[cat] || 0 }))
        .filter((item) => item.total > 0)
        .sort((a, b) => b.total - a.total),
    [totalsByCategory],
  )

  const recentExpenses = expenses.slice(0, 6)
  const chartMax = Math.max(...Object.values(totalsByCategory), 120)

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">SpendWise Dashboard</p>
          <h1>Track every expense, know your habits</h1>
          <p className="hero-copy">
            Log daily spending, compare categories, and stay ahead of your budget with visual insights.
          </p>
        </div>
        <div className="hero-meta">
          <div>
            <span>Active categories</span>
            <strong>{topCategories.length}</strong>
          </div>
          <div>
            <span>Total expenses</span>
            <strong>{expenses.length}</strong>
          </div>
        </div>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <p>Total spent</p>
          <strong>{formatCurrency(totalSpent)}</strong>
        </article>
        <article className="summary-card">
          <p>Average/day</p>
          <strong>{formatCurrency(averageDaily)}</strong>
        </article>
        <article className="summary-card">
          <p>Top category</p>
          <strong>{topCategories[0]?.category || 'None'}</strong>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="panel panel-form">
          <div className="panel-heading">
            <h2>Add expense</h2>
            <p>Log a new purchase and keep your spending record up to date.</p>
          </div>

          <form className="expense-form" onSubmit={handleAddExpense}>
            <label>
              Title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Dinner at cafe"
              />
            </label>

            <label>
              Amount
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.00"
              />
            </label>

            <label>
              Category
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Date
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>

            <button type="submit" className="primary-button">
              Add expense
            </button>
          </form>
        </article>

        <article className="panel panel-chart">
          <div className="panel-heading">
            <h2>Spending by category</h2>
            <p>See which categories are driving the most cost this month.</p>
          </div>

          <div className="chart-list">
            {topCategories.length ? (
              topCategories.map((item) => (
                <div key={item.category} className="chart-row">
                  <div className="chart-label">
                    <span>{item.category}</span>
                    <strong>{formatCurrency(item.total)}</strong>
                  </div>
                  <div className="chart-bar-shell" aria-hidden="true">
                    <div
                      className="chart-bar"
                      style={{ width: `${(item.total / chartMax) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-state">No spending recorded yet.</p>
            )}
          </div>

          <div className="recent-panel">
            <h3>Recent expenses</h3>
            <ul>
              {recentExpenses.map((expense) => (
                <li key={expense.id}>
                  <div>
                    <strong>{expense.title}</strong>
                    <span>{expense.date}</span>
                  </div>
                  <div>
                    <span>{expense.category}</span>
                    <strong>{formatCurrency(expense.amount)}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </div>
  )
}

export default App
