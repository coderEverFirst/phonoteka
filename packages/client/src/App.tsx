import React from 'react'
import { Route, Routes } from 'react-router'
import ApplicationWrapper from './components/ApplicationWrapper/ApplicationWrapper'
import { LOGIN_PAGE, SIGN_UP_PAGE } from './variables/linksUrls'
import LoginPage from './pages/AuthPage/LoginPage'
import SignUpPage from './pages/AuthPage/SignUpPage'
import PrivateRoute from './utils/router/privateRoute'
import './App.scss'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="*" element={<ApplicationWrapper />} />
        </Route>
        <Route path={SIGN_UP_PAGE} element={<SignUpPage />} />
        <Route path={LOGIN_PAGE} element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
