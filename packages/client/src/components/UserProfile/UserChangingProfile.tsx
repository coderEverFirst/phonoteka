import React from 'react'

import { Avatar } from '@mui/material'

import { USER_PROFILE_PAGE } from '../../variables/linksUrls'
import { ChangeProfileButton } from '../UI/MuiUI/Buttons/ChangeProfileButton.styled'
import { ChangingTextField } from '../UI/MuiUI/TextFields/ChangingTextField.styled'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

import { userData } from '../../variables/testFetchData'

interface IUserChangingProfile {
  handleChangeProfile: (arg0: string | undefined) => void
}

const UserChangingProfile = (props: IUserChangingProfile) => {
  const { handleChangeProfile } = props
  return (
    <div className="profile_user_content">
      <ul className="profile_user_content_left">
        <li className="content_left_info">
          <div className="default_item_image">
            <AccountCircleIcon className="default_image" />
            <AddAPhotoIcon className="default_image_change" />
          </div>
        </li>
        <li className="content_left_info">
          <ChangeProfileButton onClick={() => handleChangeProfile(USER_PROFILE_PAGE)}>
            Save Changes
          </ChangeProfileButton>
        </li>
      </ul>
      <form>
        <ul className="profile_user_content_right">
          <li className="content_right_info changing_info">
            {/* Name: <span>{userData.name}</span> */}
            Name:
            <span>
              <ChangingTextField
                variant="standard"
                size="small"
                margin="none"
                defaultValue={userData.name}
              />
            </span>
          </li>
          <li className="content_right_info changing_info">
            Email:
            <span>
              <ChangingTextField
                variant="standard"
                size="small"
                margin="none"
                defaultValue={userData.email}
              />
            </span>
          </li>
          {/* <li className="content_right_info">
        Profile created at: <span>{userData.createdAt}</span>
      </li> */}
        </ul>
      </form>
    </div>
  )
}

export default UserChangingProfile
