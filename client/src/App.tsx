import { useState } from 'react'
import { Route, Routes } from 'react-router'

import MainPage from './pages/MainPage/MainPage'
import AuthPage from './pages/AuthPage/AuthPage'

import './App.scss'

const App = () => {
  const [auth, isAuth] = useState<boolean>(true)
  return (
    <div className="App">
      {/* <Header/> */}
      <Routes>
        {/* {auth && <AuthPage path="/auth" />} */}

        <Route index element={<MainPage />} />
        {/* <Route path='/' element={<Add/>}/> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
