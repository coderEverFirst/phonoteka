import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { Avatar } from '@mui/material'
import { useReactiveVar } from '@apollo/client'
// import ProfileChart from '../ProfileChart/ProfileChart'
import userImg from '../../assets/user_test_avatar.jpg'
import { ChangeProfileButton } from '../UI/MuiUI/Buttons.styled/ChangeProfileButton.styled'
import { userInfoVar } from '../../reactiveVars'

interface IUserProfile {
  userEditProfilePath: string
}

const UserProfile = (props: IUserProfile) => {
  const navigate = useNavigate()

  const { userEditProfilePath } = props

  const userData = useReactiveVar(userInfoVar)

  const handleChangeProfile = useCallback(() => {
    if (userEditProfilePath) {
      navigate(userEditProfilePath)
    }
  }, [userEditProfilePath])

  return (
    <>
      <div className="profile_user_content">
        <ul className="profile_user_content_left">
          <li className="content_left_info">
            <Avatar className="profile_user_content_image" src={userImg} />
          </li>
          <li className="content_left_info">
            <ChangeProfileButton onClick={handleChangeProfile}>Change Profile</ChangeProfileButton>
          </li>
        </ul>
        <ul className="profile_user_content_right">
          <li className="content_right_info">
            Name: <span>{userData.name}</span>
          </li>
          <li className="content_right_info">
            E-Mail: <span>{userData.email}</span>
          </li>
          <li className="content_right_info">
            Profile created at: <span>{userData.createdAt}</span>
          </li>
          <li className="content_right_info">
            Profile updated at: <span>{userData.updatedAt}</span>
          </li>
        </ul>
      </div>

      {/* <div className="profile_user_stats">
        <h3 className="profile_subtitle">Your Phonoteka statistic</h3>
        <ul className="profile_stats_info">
          <li className="stats_info_item">
            Records in yours library: <span>{rowsData.length}</span>
          </li>
        </ul>
        <div className="profile_chart_content">
          <h4 className="chart_content_title">Your statistics in charts</h4>

          <ProfileChart />
        </div>
      </div> */}
    </>
  )
}

export default UserProfile
