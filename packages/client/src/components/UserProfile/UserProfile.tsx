import React from 'react'
import { Avatar } from '@mui/material'

// import ProfileChart from '../ProfileChart/ProfileChart'

// import { userData, rowsData } from '../../variables/testFetchData'
import { userData } from '../../variables/testFetchData'
import userImg from '../../assets/user_test_avatar.jpg'
import { USER_CHANGE_PROFILE_PAGE } from '../../variables/linksUrls'
import { ChangeProfileButton } from '../UI/MuiUI/Buttons.styled/ChangeProfileButton.styled'

interface IUserProfile {
  handleChangeProfile: (arg0: string) => void
}

const UserProfile = (props: IUserProfile) => {
  const { handleChangeProfile } = props

  // const navigate = useNavigate()

  // const handleNavigate = useCallback((path: string | undefined) => {
  //   if (path) {
  //     navigate(path)
  //   }
  // }, [])

  // const handleOpenChangeProfile = () => {
  //   handleNavigate(USER_CHANGE_PROFILE_PAGE)
  // }

  return (
    <>
      <div className="profile_user_content">
        <ul className="profile_user_content_left">
          <li className="content_left_info">
            <Avatar className="profile_user_content_image" src={userImg} />
          </li>
          <li className="content_left_info">
            <ChangeProfileButton
              onClick={() => handleChangeProfile(USER_CHANGE_PROFILE_PAGE)}
              // className="test"
            >
              Change Profile
            </ChangeProfileButton>
          </li>
        </ul>
        <ul className="profile_user_content_right">
          <li className="content_right_info">
            Name: <span>{userData.name}</span>
          </li>
          <li className="content_right_info">
            E-Mail: <span>{userData.email}</span>
          </li>
          {/* <li className="content_right_info">
        Profile created at: <span>{userData.createdAt}</span>
      </li> */}
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
