import React from 'react'
import './App.css'
import { CookiesProvider } from 'react-cookie'

import Navigation from './components/ReusableComponents/Navigation'

function App () {
  return (
    <CookiesProvider>
      <Navigation />
    </CookiesProvider>
  )
}

export default App
