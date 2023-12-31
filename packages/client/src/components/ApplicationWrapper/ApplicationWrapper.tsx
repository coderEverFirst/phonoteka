import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { useQuery } from '@apollo/client'
import MainPage from '../../pages/MainPage/MainPage'
import UserProfilePage from '../../pages/UserProfilePage/UserProfilePage'
import { GET_USER_QUERY } from '../../apollo/queries/user'
import { userInfoVar } from '../../reactiveVars'
import { USER_PROFILE_PAGE } from '../../variables/linksUrls'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const ApplicationWrapper = () => {
  const { data: userData, loading: userDataLoading } = useQuery(GET_USER_QUERY)
  useEffect(() => {
    if (!userDataLoading && userData?.getUserById) {
      userInfoVar(userData.getUserById)
    }
  }, [userData])

  const userProfilePath = USER_PROFILE_PAGE.concat(userData?.getUserById?.id)
  const userEditProfilePath = userProfilePath.concat('/edit')

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<MainPage />} />
        <Route
          path={userProfilePath}
          element={
            <UserProfilePage
              userEditProfilePath={userEditProfilePath}
              userProfilePath={userProfilePath}
            />
          }
        >
          <Route path={userEditProfilePath} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default ApplicationWrapper
