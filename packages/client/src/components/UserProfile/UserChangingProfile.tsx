import React, { useState } from 'react'

import { USER_PROFILE_PAGE } from '../../variables/linksUrls'
import { ChangeProfileButton } from '../UI/MuiUI/Buttons.styled/ChangeProfileButton.styled'
import { ChangingTextField } from '../UI/MuiUI/TextFields.styled/ChangingTextField.styled'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

import UploadImage from '../Modals/UploadImage/UploadImage'

import { userData } from '../../variables/testFetchData'

interface IUserChangingProfile {
  handleChangeProfile: (arg0: string | undefined) => void
}

const UserChangingProfile = (props: IUserChangingProfile) => {
  const { handleChangeProfile } = props

  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <div className="profile_user_content">
        <ul className="profile_user_content_left">
          <li className="content_left_info">
            <div className="default_item_image" onClick={handleOpenModal}>
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
      <UploadImage openModal={openModal} handleCloseModal={handleCloseModal} />
    </>
  )
}

export default UserChangingProfile
