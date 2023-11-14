import React from 'react'

import { Avatar } from '@mui/material'

import { userData, rowsData } from '../../variables/testFetchData'

import ProfileChart from '../../components/ProfileChart/ProfileChart'

import userImg from '../../assets/user_test_avatar.jpg'

import './UserProfilePage.scss'

const UserProfilePage = () => {
  return (
    <div className="user_profile_container">
      <div className="user_profile_wrapper">
        <h2 className="profile_title">Your Phonoteka profile</h2>

        <div className="profile_user_content">
          <Avatar
            // sx={{ maxWidth: '300px', maxHeight: '300px' }}
            className="profile_user_content_image"
            src={userImg}
          />
          <ul className="profile_user_content_info">
            <li className="user_info">
              Name: <span>{userData.name}</span>
            </li>
            <li className="user_info">
              E-Mail: <span>{userData.email}</span>
            </li>
            {/* <li className="user_info">
              Profile created at: <span>{userData.createdAt}</span>
            </li> */}
          </ul>
        </div>

        <h3 className="profile_subtitle">Your Phonoteka statistic</h3>

        <div>
          Records in yours library: <span>{rowsData.length}</span>
          <ProfileChart />
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
