import { useState, useEffect } from 'react'
import Counter from './components/Counter'
import './App.css'

/**
 * Main App Component
 * 
 * This is the root component that manages the overall application state
 * and renders the Counter component.
 */
function App() {
  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">CounterX</h1>
          <p className="app-subtitle">Simple. Elegant. Functional.</p>
        </header>
        <Counter />
      </div>
    </div>
  )
}

export default App

