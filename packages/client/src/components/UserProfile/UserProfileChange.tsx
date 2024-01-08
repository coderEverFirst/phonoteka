import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { Avatar } from '@mui/material'
import { useReactiveVar, fromError, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { ActionButton } from '../UI/MuiUI/Buttons.styled/ActionButton.styled'
import { ChangingTextField } from '../UI/MuiUI/TextFields.styled/ChangingTextField.styled'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

import UploadImage from '../Modals/UploadImage/UploadImage'
import { userInfoVar } from '../../reactiveVars'
import { profileChangesSchema } from '../../validations/profileChangeSchema'
import { UPDATE_USER_MUTATION } from '../../apollo/mutation/user'

interface IUserProfileChange {
  userProfilePath: string
}

const UserProfileChange = (props: IUserProfileChange) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [userNewImage, setUserNewImage] = useState<string | null>(null)

  const userData = useReactiveVar(userInfoVar)

  const [updateUserMutation] = useMutation(UPDATE_USER_MUTATION)

  const { userProfilePath } = props

  const formik = useFormik({
    initialValues: {
      name: userData.name,
      email: userData.email,
    },
    validateOnBlur: true,
    validationSchema: profileChangesSchema,

    onSubmit: async values => {
      try {
        await updateUserMutation({
          variables: { input: { ...values, imgUrl: userNewImage || userData.imgUrl } },
        })
        handleChangeProfile()
      } catch (serverError) {
        console.error('Sign up error!', fromError(serverError))
      }
    },
  })

  const { handleSubmit, handleChange, setValues, values, errors, touched } = formik

  useEffect(() => {
    setValues({ name: userData.name, email: userData.email })
  }, [userData])

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleChangeProfile = useCallback(() => {
    if (userProfilePath) {
      navigate(userProfilePath)
    }
  }, [userProfilePath])

  return (
    <>
      <div className="profile_user_content">
        <ul className="profile_user_content_left">
          <li>
            <div className="default_item_image" onClick={handleOpenModal}>
              {userNewImage ? (
                <Avatar className="profile_user_content_image" src={userNewImage} />
              ) : (
                <AccountCircleIcon className="default_image" />
              )}

              <AddAPhotoIcon className="default_image_change" />
            </div>
          </li>
        </ul>
        <form onSubmit={handleSubmit}>
          <ul className="profile_user_content_right">
            <li className="content_right_info changing_info">
              Name:
              <ChangingTextField
                variant="standard"
                size="small"
                margin="none"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={touched.name || Boolean(errors.name)}
                helperText={errors.name}
              />
            </li>
            <li className="content_right_info changing_info">
              Email:
              <ChangingTextField
                variant="standard"
                size="small"
                margin="none"
                name="email"
                onChange={handleChange}
                value={values.email}
                error={touched.email || Boolean(errors.email)}
                helperText={errors.email}
              />
            </li>
          </ul>
          <ActionButton type="submit">Save Changes</ActionButton>
        </form>
      </div>
      <UploadImage
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        userNewImage={userNewImage}
        setUserNewImage={setUserNewImage}
      />
    </>
  )
}

export default UserProfileChange
