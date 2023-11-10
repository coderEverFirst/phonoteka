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
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'
import { LOGIN_PAGE, SIGN_UP_PAGE, USER_PROFILE_PAGE } from './variables/linksUrls'

const App = () => {
  const { pathname } = useLocation()

  const turnOnHeaderAndFooter = useCallback(
    (component: JSX.Element) => {
      return pathname !== LOGIN_PAGE && pathname !== SIGN_UP_PAGE && component
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
        <Route path={USER_PROFILE_PAGE} element={<UserProfilePage />} />
      </Routes>
      {turnOnHeaderAndFooter(<Footer />)}
    </div>
  )
}

export default App
