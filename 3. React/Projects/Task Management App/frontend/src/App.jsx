import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'tasks_v1'

function useLocalStorageState(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch (e) {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (e) {
      // ignore
    }
  }, [key, state])

  return [state, setState]
}

function App() {
  const [tasks, setTasks] = useLocalStorageState(STORAGE_KEY, [])
  const [text, setText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('all') // all | active | completed

  function addTask(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    const newTask = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    }
    setTasks([newTask, ...tasks])
    setText('')
  }

  function removeTask(id) {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  function toggleComplete(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function startEdit(id) {
    setEditingId(id)
  }

  function saveEdit(id, newText) {
    const trimmed = newText.trim()
    if (!trimmed) {
      removeTask(id)
    } else {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, text: trimmed } : t)))
    }
    setEditingId(null)
  }

  const visible = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
      </header>

      <main>
        <form className="new-task" onSubmit={addTask}>
          <input
            aria-label="New task"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <div className="filters">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        </div>

        <ul className="task-list">
          {visible.length === 0 && <li className="empty">No tasks</li>}
          {visible.map((t) => (
            <li key={t.id} className={t.completed ? 'done' : ''}>
              <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(t.id)} />
              {editingId === t.id ? (
                <InlineEditor initial={t.text} onCancel={() => setEditingId(null)} onSave={(v) => saveEdit(t.id, v)} />
              ) : (
                <span className="task-text" onDoubleClick={() => startEdit(t.id)}>{t.text}</span>
              )}
              <div className="actions">
                <button onClick={() => startEdit(t.id)}>Edit</button>
                <button onClick={() => removeTask(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer>
        <small>{tasks.filter((t) => !t.completed).length} tasks left</small>
      </footer>
    </div>
  )
}

function InlineEditor({ initial, onSave, onCancel }) {
  const [v, setV] = useState(initial)
  return (
    <span className="inline-editor">
      <input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => {
        if (e.key === 'Enter') onSave(v)
        if (e.key === 'Escape') onCancel()
      }} />
      <button onClick={() => onSave(v)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </span>
  )
}

export default App
