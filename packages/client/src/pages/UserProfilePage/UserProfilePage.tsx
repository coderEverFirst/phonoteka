import React, { useCallback } from 'react'

import './UserProfilePage.scss'
import UserProfile from '../../components/UserProfile/UserProfile'
import UserChangingProfile from '../../components/UserProfile/UserChangingProfile'
import { useLocation, useNavigate } from 'react-router'
import { USER_CHANGE_PROFILE_PAGE, USER_PROFILE_PAGE } from '../../variables/linksUrls'

const UserProfilePage = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleChangeProfile = useCallback((path: string | undefined) => {
    if (path) {
      navigate(path)
    }
  }, [])

  return (
    <div className="user_profile_container">
      <div className="user_profile_wrapper">
        <h2 className="profile_title">Your Phonoteka profile</h2>

        {pathname === USER_PROFILE_PAGE && (
          <UserProfile handleChangeProfile={handleChangeProfile} />
        )}
        {pathname === USER_CHANGE_PROFILE_PAGE && (
          <UserChangingProfile handleChangeProfile={handleChangeProfile} />
        )}
      </div>
    </div>
  )
}

export default UserProfilePage
