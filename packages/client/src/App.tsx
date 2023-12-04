import React, { useCallback } from 'react'
import { JSX } from 'react/jsx-runtime'
import { Route, Routes, useLocation } from 'react-router'

// ============ Pages ============
import MainPage from './pages/MainPage/MainPage'

// ============ Components ============
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

// ============ Styles ============
import './App.scss'
import { LOGIN_PAGE, SIGN_UP_PAGE, USER_PROFILE_PAGE } from './variables/linksUrls'

import UserProfilePage from './pages/UserProfilePage/UserProfilePage'
import LoginPage from './pages/AuthPage/LoginPage'
import SignUpPage from './pages/AuthPage/SignUpPage'
import PrivateRoute from './utils/router/privateRoute'

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
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path={USER_PROFILE_PAGE} element={<UserProfilePage />} />
        </Route>
        <Route path={SIGN_UP_PAGE} element={<SignUpPage />} />
        <Route path={LOGIN_PAGE} element={<LoginPage />} />
      </Routes>
      {turnOnHeaderAndFooter(<Footer />)}
    </div>
  )
}

export default App
