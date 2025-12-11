import { useState, useEffect } from 'react'
import './Counter.css'

/**
 * Counter Component
 * 
 * A feature-rich counter component that allows users to:
 * - Increment the counter value
 * - Decrement the counter value
 * - View the current balance
 * - Reset the counter to zero
 * 
 * The component persists the counter value in localStorage
 * to maintain state across page refreshes.
 */
function Counter() {
  // Initialize counter state from localStorage or default to 0
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('counterValue')
    return savedCount ? parseInt(savedCount, 10) : 0
  })

  // Save counter value to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('counterValue', count.toString())
  }, [count])

  /**
   * Increment the counter by 1
   */
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1)
  }

  /**
   * Decrement the counter by 1
   * Prevents negative values (optional - can be removed if negative values are allowed)
   */
  const handleDecrement = () => {
    setCount(prevCount => Math.max(0, prevCount - 1))
  }

  /**
   * Reset the counter to 0
   */
  const handleReset = () => {
    setCount(0)
  }

  /**
   * Determine the balance status for visual feedback
   * @returns {string} Status class name based on count value
   */
  const getBalanceStatus = () => {
    if (count === 0) return 'neutral'
    if (count > 0) return 'positive'
    return 'negative'
  }

  return (
    <div className="counter-container">
      {/* Balance Display Section */}
      <div className="balance-section">
        <div className="balance-label">Current Balance</div>
        <div className={`balance-value ${getBalanceStatus()}`}>
          {count.toLocaleString()}
        </div>
        <div className="balance-indicator">
          {count === 0 ? '⚖️ Balanced' : count > 0 ? '📈 Positive' : '📉 Negative'}
        </div>
      </div>

      {/* Control Buttons Section */}
      <div className="controls-section">
        <button
          className="btn btn-decrement"
          onClick={handleDecrement}
          aria-label="Decrement counter"
        >
          <span className="btn-icon">−</span>
          <span className="btn-text">Decrement</span>
        </button>

        <button
          className="btn btn-reset"
          onClick={handleReset}
          aria-label="Reset counter to zero"
        >
          <span className="btn-icon">↻</span>
          <span className="btn-text">Reset</span>
        </button>

        <button
          className="btn btn-increment"
          onClick={handleIncrement}
          aria-label="Increment counter"
        >
          <span className="btn-icon">+</span>
          <span className="btn-text">Increment</span>
        </button>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-label">Total Operations</div>
          <div className="stat-value">
            {Math.abs(count)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Counter

