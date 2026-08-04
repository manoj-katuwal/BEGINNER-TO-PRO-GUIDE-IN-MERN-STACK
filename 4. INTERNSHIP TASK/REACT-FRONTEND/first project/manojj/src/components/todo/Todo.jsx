import React, { useState, useEffect } from 'react'

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('todos')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })
  const [text, setText] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    setTodos((prev) => [...prev, { id: Date.now(), text: value, done: false }])
    setText('')
  }

  const toggle = (id) => setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id) => setTodos((prev) => prev.filter((t) => t.id !== id))

  return (
    <div className="todo-app">
      <h1>Todo App</h1>

      <form onSubmit={addTodo} className="todo-form">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add todo..." />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="empty">No todos yet</li>
        ) : (
          todos.map((t) => (
            <li key={t.id} className={`todo-item ${t.done ? 'done' : ''}`}>
              <label>
                <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
                <span>{t.text}</span>
              </label>
              <button className="delete" onClick={() => remove(t.id)}>&times;</button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default Todo