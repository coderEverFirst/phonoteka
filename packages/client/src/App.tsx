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
import UserPage from './pages/UserPage/UserPage'
import { LOGIN_PAGE, SIGN_UP_PAGE, USER_CABINET_PAGE } from './variables/linksUrls'


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
        <Route path={LOGIN_PAGE} element={<AuthPage />} />
        <Route path={SIGN_UP_PAGE} element={<AuthPage />} />

        <Route index element={<MainPage />} />

        {/* check linksURLs need to gert unique codes for user */}
        <Route path={USER_CABINET_PAGE} element={<UserPage />} />
      </Routes>
      {turnOnHeaderAndFooter(<Footer />)}
    </div>
  )
}

export default App
