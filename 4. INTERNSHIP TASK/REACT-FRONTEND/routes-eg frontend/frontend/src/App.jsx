import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-6 md:px-6 lg:px-10">
        <AppRoutes />
      </main>
    </div>
  )
}

export default App
