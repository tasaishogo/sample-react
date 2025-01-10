import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LearningLog } from './LearningLog.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LearningLog />
  </StrictMode>,
)
