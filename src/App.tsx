import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())
  const [dogImageUrl, setDogImageUrl] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchDogImageUrl = async () => {
      try {
        const response = await fetch('/dog-clock/metadata.json?t=' + Date.now()) // Cache busting
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        if (data.imageUrl) setDogImageUrl(data.imageUrl)
      } catch (error) {
        console.error('Failed to fetch dog image metadata: ', error)
      }
    }

    fetchDogImageUrl() // Initial fetch
    const CHECK_INTERVAL_MS = 10 * 60 * 1000 // 10 minutes
    const fetchTimer = setInterval(fetchDogImageUrl, CHECK_INTERVAL_MS)

    return () => clearInterval(fetchTimer)
  }, [])

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })

  const formattedDate = time.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="app">
      <div className="dog-container">
        {dogImageUrl && (
          <img
            src={dogImageUrl}
            alt="dog"
            className="dog-image"
          />
        )}
        <div className="clock">
          <div className="date">{formattedDate}</div>
          <div className="time">{formattedTime}</div>
        </div>
      </div>
    </div>
  )
}

export default App
