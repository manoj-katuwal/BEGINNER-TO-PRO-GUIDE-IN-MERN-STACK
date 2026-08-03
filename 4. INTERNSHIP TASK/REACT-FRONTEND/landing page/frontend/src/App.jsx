import React from 'react'
import './App.css'
import Layout from './layout/Layout'
import Hero from './pages/hero/Hero'
import Features from './pages/Feature/Features'
import Preference from './pages/preference/Preference'
import Steps from './pages/Step/Steps'
import Mission from './pages/Mission/Mission'
import CTA from './pages/CTA/CTA'


const App = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <Preference />
      <Steps />
      <Mission />
      <CTA />
    </Layout>
  )
}

export default App
