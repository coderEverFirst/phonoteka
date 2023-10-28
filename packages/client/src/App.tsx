import React, { useCallback } from 'react'
import { JSX } from 'react/jsx-runtime'
import { Route, Routes, useLocation } from 'react-router'

// ============ Pages ============
import MainPage from './pages/MainPage/MainPage'
import AuthPage from './pages/AuthPage/AuthPage'

// ============ Components ============
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

// ============ Styles ============
import './App.scss'

const App = () => {
  const { pathname } = useLocation()

  const turnOnHeaderAndFooter = useCallback(
    (component: JSX.Element) => {
      return pathname !== '/login' && pathname !== '/sign-up' && component
    },
    [pathname],
  )

  return (
    <div className="App">
      {turnOnHeaderAndFooter(<Header />)}
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/sign-up" element={<AuthPage />} />
        <Route index element={<MainPage />} />
        {/* <Route path='/' element={<Add/>}/> */}
      </Routes>
      {turnOnHeaderAndFooter(<Footer />)}
    </div>
  )
}

export default App
