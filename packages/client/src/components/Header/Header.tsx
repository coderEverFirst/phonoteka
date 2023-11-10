import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { InputAdornment } from '@mui/material'

import logoImage from '../../assets/logo.svg'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import userAvatar from '../../assets/user_test_avatar.jpg'

import { SearchTextField } from '../UI/MuiUI/TextFields/SearchTextField.styled'

import { USER_CABINET_PAGE } from '../../variables/linksUrls'

import './Header.scss'

const Header = () => {
  const { pathname } = useLocation()

  // const [searchFocus, isSearchFocus] = useState<boolean>()

  const scrollUpWindow = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  // useEffect(() => {
  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     if (event.ctrlKey && event.key === 'b') {
  //       isSearchFocus(!searchFocus)
  //     }
  //   }

  //   window.addEventListener('keydown', handleKeyPress)

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyPress)
  //   }
  // }, [searchFocus])

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
                {/* <div className="header_input_hotkey">Ctrl+B</div> */}
                <SearchIcon className="header_input_search" />
              </InputAdornment>
            ),
          }}
        />

        <div className="header_function_content">
          {pathname === USER_CABINET_PAGE ? (
            <Link to="/" className="header_user_cabinet comeback_arrow">
              <ArrowBackIcon />
            </Link>
          ) : (
            <Link to={USER_CABINET_PAGE} className="header_user_cabinet">
              <h3 className="header_user_name">UserName Test</h3>
              <img
                src={userAvatar}
                alt="user avatar"
                className="header_user_avatar
            "
              />
            </Link>
          )}

          <Link to="/login" className="header_log_out_link">
            Log out
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
