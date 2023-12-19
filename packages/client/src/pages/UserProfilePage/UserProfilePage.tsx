import React from 'react'
import { useLocation } from 'react-router'
import UserProfile from '../../components/UserProfile/UserProfile'
import UserProfileChange from '../../components/UserProfile/UserProfileChange'
import './UserProfilePage.scss'

interface IUserProfilePage {
  userEditProfilePath: string
  userProfilePath: string
}

const UserProfilePage = (props: IUserProfilePage) => {
  const { userEditProfilePath, userProfilePath } = props
  const { pathname } = useLocation()

  return (
    <div className="user_profile_container">
      <div className="user_profile_wrapper">
        <h2 className="profile_title">Your Phonoteka profile</h2>
        {pathname === userEditProfilePath ? (
          <UserProfileChange userProfilePath={userProfilePath} />
        ) : (
          <UserProfile userEditProfilePath={userEditProfilePath} />
        )}
      </div>
    </div>
  )
}

export default UserProfilePage
