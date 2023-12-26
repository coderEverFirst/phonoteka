import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { InputAdornment, Avatar } from '@mui/material'
import { useReactiveVar } from '@apollo/client'
import logoImage from '../../assets/logo.svg'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { userInfoVar } from '../../reactiveVars'

import { SearchTextField } from '../UI/MuiUI/TextFields.styled/SearchTextField.styled'

import { USER_PROFILE_PAGE } from '../../variables/linksUrls'

import './Header.scss'

const Header = () => {
  const { pathname } = useLocation()
  const userData = useReactiveVar(userInfoVar)
  const [, , removeCookie] = useCookies(['token'])

  const scrollUpWindow = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const handleRemoveCookie = () => {
    removeCookie('token')
  }

  const userProfilePath = USER_PROFILE_PAGE.concat(`${userData?.id}`)
  const userEditProfilePath = userProfilePath.concat('/edit')

  return (
    <div className="header_wrapper">
      <div className="header_container">
        <div className="header_logo_content" onClick={scrollUpWindow}>
          <img className="header_logo" src={logoImage} alt="logo" />
          <Link to="/" className="header_name">
            <span>Ph</span>onoteka
          </Link>
        </div>

        <SearchTextField
          id="header_search"
          className="header_search_input"
          label="Search..."
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className="header_input_block">
                <SearchIcon className="header_input_search" />
              </InputAdornment>
            ),
          }}
        />

        <div className="header_function_content">
          {/* ======================== Need to fix display avatar ======================== */}
          {pathname === userProfilePath || pathname === userEditProfilePath ? (
            <Link to="/" className="header_user_profile comeback_arrow">
              <ArrowBackIcon />
            </Link>
          ) : (
            <Link to={userProfilePath} className="header_user_profile">
              <h3 className="header_user_name">{userData.name}</h3>
              <Avatar
                src={userData.imgUrl}
                className="header_user_avatar
            "
              />
            </Link>
          )}

          <Link to="/login" className="header_log_out_link" onClick={handleRemoveCookie}>
            Log out
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
